# Backend Setup Instructions

## Prerequisites
- Python 3.8+ (already installed: Python 3.14.0)
- Node.js 18+ (already installed)
- ffmpeg (for audio processing)

## Setup Steps

### 1. Install ffmpeg
```bash
brew install ffmpeg
```

### 2. Set up Python Virtual Environment
```bash
cd backend
python3 -m venv whisper-env
source whisper-env/bin/activate  # macOS/Linux
```

### 3. Install Python Dependencies
```bash
pip install openai-whisper
```

### 4. Install Node.js Dependencies
```bash
npm install
```

### 5. Make Python script executable (optional)
```bash
chmod +x transcribe.py
```

## Running the Backend

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The backend server will run on `http://localhost:3001`

## Testing the API

### Health Check
```bash
curl http://localhost:3001/health
```

### Transcribe Audio
```bash
curl -X POST http://localhost:3001/transcribe \
  -F "audio=@path/to/your/audio.webm"
```

## Project Structure
```
backend/
├── package.json          # Node.js dependencies
├── server.js            # Express server
├── transcribe.py        # Whisper transcription script
├── whisper-env/         # Python virtual environment (created during setup)
├── uploads/             # Temporary audio files (auto-created, auto-cleaned)
└── README.md           # This file
```

## API Endpoints

### POST /transcribe
Transcribes an audio file using Whisper

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: `audio` file (webm format)

**Response:**
```json
{
  "success": true,
  "transcription": "This is the transcribed text...",
  "segments": [...]
}
```

## Whisper Models
The default model is "base". You can change it in `transcribe.py`:
- `tiny`: Fastest, lowest accuracy
- `base`: Good balance (default)
- `small`: Better accuracy
- `medium`: High accuracy, slower
- `large`: Best accuracy, slowest

## Notes
- Audio files are automatically cleaned up after transcription
- The server uses CORS to allow requests from the Vite dev server (port 5174)
- Maximum file size: 50MB
- Files are stored temporarily in `backend/uploads/` during processing
