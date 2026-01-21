#!/usr/bin/env python3
"""
Whisper transcription script
Transcribes audio files and outputs JSON with text and segments
"""

import whisper
import sys
import json
import warnings
import ssl

# Fix SSL certificate verification for macOS
ssl._create_default_https_context = ssl._create_unverified_context

# Suppress warnings for cleaner output
warnings.filterwarnings("ignore")

def transcribe_audio(audio_path):
    """
    Transcribe audio file using Whisper
    
    Args:
        audio_path: Path to the audio file
        
    Returns:
        dict: Transcription result with text and segments
    """
    try:
        import os
        file_size = os.path.getsize(audio_path)
        print(f"Processing: {audio_path} ({file_size} bytes)", file=sys.stderr)
        
        # Load Whisper model (base is a good balance of speed and accuracy)
        # Options: tiny, base, small, medium, large
        model = whisper.load_model("base")
        
        # Transcribe the audio with fp16=False for better compatibility
        print("Transcribing...", file=sys.stderr)
        result = model.transcribe(audio_path, fp16=False, language="en")
        
        print(f"Result: '{result['text']}' ({len(result['segments'])} segments)", file=sys.stderr)
        
        return {
            "text": result["text"].strip(),
            "segments": result["segments"],
            "language": result.get("language", "unknown")
        }
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        return {
            "error": str(e),
            "text": "",
            "segments": []
        }

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({
            "error": "No audio file path provided",
            "text": "",
            "segments": []
        }))
        sys.exit(1)
    
    audio_path = sys.argv[1]
    result = transcribe_audio(audio_path)
    
    # Output as JSON for Node.js to parse
    print(json.dumps(result))
