import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Configure CORS
app.use(cors({
  origin: 'http://localhost:5174', // Vite dev server
  methods: ['POST', 'GET'],
  credentials: true
}));

app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = join(__dirname, 'uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error, uploadDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'audio-' + uniqueSuffix + '.webm');
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend server is running' });
});

// Transcription endpoint
app.post('/transcribe', upload.single('audio'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No audio file provided' });
  }

  const audioPath = req.file.path;
  console.log('Received audio file:', audioPath);

  try {
    // Path to Python script
    const scriptPath = join(__dirname, 'transcribe.py');
    const venvPython = join(__dirname, 'whisper-env', 'bin', 'python3');

    // Check if virtual environment exists, use it if available
    let pythonCommand = 'python3';
    try {
      await fs.access(venvPython);
      pythonCommand = venvPython;
      console.log('Using virtual environment Python');
    } catch {
      console.log('Using system Python');
    }

    // Spawn Python process
    const pythonProcess = spawn(pythonCommand, [scriptPath, audioPath]);

    let outputData = '';
    let errorData = '';

    pythonProcess.stdout.on('data', (data) => {
      outputData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorData += data.toString();
      console.error('Python stderr:', data.toString());
    });

    pythonProcess.on('close', async (code) => {
      // Clean up uploaded file
      try {
        await fs.unlink(audioPath);
        console.log('Cleaned up audio file:', audioPath);
      } catch (err) {
        console.error('Error cleaning up file:', err);
      }

      if (code !== 0) {
        console.error('Python process exited with code:', code);
        console.error('Error output:', errorData);
        return res.status(500).json({ 
          error: 'Transcription failed', 
          details: errorData 
        });
      }

      try {
        const result = JSON.parse(outputData);
        res.json({
          success: true,
          transcription: result.text,
          segments: result.segments
        });
      } catch (parseError) {
        console.error('Error parsing Python output:', parseError);
        console.error('Output was:', outputData);
        res.status(500).json({ 
          error: 'Failed to parse transcription result',
          details: outputData
        });
      }
    });

    pythonProcess.on('error', (error) => {
      console.error('Failed to start Python process:', error);
      res.status(500).json({ 
        error: 'Failed to start transcription process',
        details: error.message
      });
    });

  } catch (error) {
    console.error('Server error:', error);
    
    // Clean up file on error
    try {
      await fs.unlink(audioPath);
    } catch (cleanupError) {
      console.error('Error cleaning up file after error:', cleanupError);
    }

    res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Ready to receive transcription requests`);
});
