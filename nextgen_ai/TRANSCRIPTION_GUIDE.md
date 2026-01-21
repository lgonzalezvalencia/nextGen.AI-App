# Audio Transcription Integration Guide

## Overview
This project now has a complete audio recording and transcription pipeline:
1. Frontend: React app with WaveSurfer.js for audio recording (WebM format)
2. Backend: Express server that receives audio and uses local Whisper for transcription
3. Service Layer: TypeScript service for seamless frontend-backend communication

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Frontend (React + Vite) - Port 5174                       │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  AudioRecording Component                             │  │
│  │  - Records audio as WebM                              │  │
│  │  - Stores in memory as Blob                           │  │
│  └───────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         │ getRecordedBlob()                 │
│                         ▼                                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Transcription Service (src/services/transcription.ts) │ │
│  │  - Sends audio to backend via FormData                │  │
│  │  - Returns transcription text + segments              │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP POST /transcribe
                       │ multipart/form-data
                       ▼
┌─────────────────────────────────────────────────────────────┐
│  Backend (Express + Node.js) - Port 3001                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Express Server (server.js)                           │  │
│  │  - Receives audio file via multer                     │  │
│  │  - Spawns Python process                              │  │
│  │  - Returns JSON response                              │  │
│  └───────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         │ spawn()                            │
│                         ▼                                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Python Script (transcribe.py)                        │  │
│  │  - Loads Whisper model                                │  │
│  │  - Transcribes audio                                  │  │
│  │  - Outputs JSON to stdout                             │  │
│  └───────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         │ uses                               │
│                         ▼                                    │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Whisper (Python Virtual Environment)                 │  │
│  │  - Local AI model (no API calls)                      │  │
│  │  - Runs entirely on your Mac                          │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Setup Completed ✅

- ✅ ffmpeg installed
- ✅ Python virtual environment created (backend/whisper-env/)
- ✅ Whisper installed in virtual environment
- ✅ Backend Express server created
- ✅ Python transcription script created
- ✅ Frontend transcription service created
- ✅ AudioRecording component updated with getRecordedBlob()

## Running the Application

### 1. Start the Backend Server
```bash
cd backend
npm start
# Server runs on http://localhost:3001
```

### 2. Start the Frontend (in a new terminal)
```bash
cd ..
npm run dev
# Vite dev server runs on http://localhost:5174
```

## Using Transcription in Your Code

### Step 1: Import the service
```typescript
import { transcribeAudio } from '../services/transcription';
```

### Step 2: Add state to your component
```typescript
const [transcription, setTranscription] = useState<string>('');
const [isTranscribing, setIsTranscribing] = useState(false);
```

### Step 3: Create a transcribe handler
```typescript
const handleTranscribe = async () => {
  const blob = audioRecordingRef.current?.getRecordedBlob();
  if (!blob) return;
  
  setIsTranscribing(true);
  try {
    const result = await transcribeAudio(blob);
    setTranscription(result.transcription);
    console.log('Full result:', result);
  } catch (error) {
    console.error('Transcription failed:', error);
  } finally {
    setIsTranscribing(false);
  }
};
```

### Step 4: Add a button or auto-trigger
```typescript
// Option A: Manual button
<button onClick={handleTranscribe} disabled={isTranscribing}>
  {isTranscribing ? 'Transcribing...' : 'Transcribe'}
</button>

// Option B: Auto-transcribe after stopping
const handleStop = () => {
  audioRecordingRef.current?.stopRecording();
  setTimeout(() => handleTranscribe(), 100);
};
```

## API Reference

### Backend Endpoints

#### GET /health
Health check endpoint
```bash
curl http://localhost:3001/health
```
Response:
```json
{
  "status": "ok",
  "message": "Backend server is running"
}
```

#### POST /transcribe
Transcribe audio file
```bash
curl -X POST http://localhost:3001/transcribe \
  -F "audio=@recording.webm"
```
Response:
```json
{
  "success": true,
  "transcription": "This is the transcribed text...",
  "segments": [
    {
      "id": 0,
      "start": 0.0,
      "end": 5.5,
      "text": "This is the transcribed text...",
      ...
    }
  ],
  "language": "en"
}
```

### Frontend Service

#### transcribeAudio(blob: Blob): Promise<TranscriptionResult>
Sends audio blob to backend for transcription.

#### checkBackendHealth(): Promise<boolean>
Checks if backend server is running.

### AudioRecording Component Methods

#### getRecordedBlob(): Blob | null
Returns the recorded audio blob (WebM format).

## Whisper Models

You can change the Whisper model in `backend/transcribe.py`:

```python
model = whisper.load_model("base")  # Change this line
```

Available models:
- **tiny**: Fastest, ~39M parameters, ~1GB VRAM, lowest accuracy
- **base**: Fast, ~74M parameters, ~1GB VRAM, good balance (current)
- **small**: ~244M parameters, ~2GB VRAM, better accuracy
- **medium**: ~769M parameters, ~5GB VRAM, high accuracy
- **large**: ~1550M parameters, ~10GB VRAM, best accuracy

## Project Structure

```
nextgen_ai/
├── backend/                          # Backend server (new)
│   ├── .gitignore
│   ├── README.md
│   ├── package.json                  # Express dependencies
│   ├── server.js                     # Express server
│   ├── transcribe.py                 # Python Whisper script
│   ├── whisper-env/                  # Python virtual environment
│   ├── node_modules/                 # Node dependencies
│   └── uploads/                      # Temporary audio files (auto-created)
├── src/
│   ├── services/                     # Frontend services (new)
│   │   ├── transcription.ts          # Transcription API client
│   │   └── transcription-example.tsx # Integration example
│   └── pages/Conversation/
│       └── components/audioRecording/
│           └── AudioRecording.tsx    # Updated with getRecordedBlob()
├── public/
├── package.json                      # Frontend dependencies
└── vite.config.ts
```

## Troubleshooting

### Backend not starting
```bash
cd backend
npm install
node server.js
```

### Python errors
```bash
cd backend
source whisper-env/bin/activate
pip install openai-whisper
```

### ffmpeg not found
```bash
brew install ffmpeg
ffmpeg -version
```

### CORS errors
The backend is configured to accept requests from `http://localhost:5174`. If your Vite server runs on a different port, update `server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:YOUR_PORT',
  ...
}));
```

### Audio not transcribing
1. Check browser console for errors
2. Check backend terminal for Python errors
3. Verify blob is not null: `console.log(audioRecordingRef.current?.getRecordedBlob())`
4. Test backend directly: `curl -X POST http://localhost:3001/transcribe -F "audio=@test.webm"`

## Performance Notes

- First transcription will be slower (Whisper model loading)
- Subsequent transcriptions are faster (model cached in memory)
- WebM files are automatically cleaned up after transcription
- Audio stays in frontend memory until transcription is complete
- Backend runs entirely on your Mac (no API calls, no internet needed)

## Next Steps

You can now:
1. Store transcriptions in a database
2. Display transcriptions in your UI
3. Use transcriptions to trigger other actions
4. Export transcriptions to files
5. Add real-time streaming transcription
6. Integrate with your conversation flow

## Example: Full Integration

See `src/services/transcription-example.tsx` for a complete example of integrating transcription into your Conversation component.
