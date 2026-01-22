/**
 * Audio Transcription Service
 * Handles sending audio recordings to the backend for Whisper transcription
 */

const BACKEND_URL = 'http://localhost:3001';

export interface TranscriptionSegment {
  id: number;
  seek: number;
  start: number;
  end: number;
  text: string;
  tokens: number[];
  temperature: number;
  avg_logprob: number;
  compression_ratio: number;
  no_speech_prob: number;
}

export interface TranscriptionResult {
  success: boolean;
  transcription: string;
  segments: TranscriptionSegment[];
  language?: string;
}

export interface TranscriptionError {
  error: string;
  details?: string;
}

/**
 * Send audio blob to backend for transcription
 * @param audioBlob - The recorded audio as a Blob
 * @returns Promise with transcription result
 */
export async function transcribeAudio(
  audioBlob: Blob
): Promise<TranscriptionResult> {
  try {
    // Create FormData to send the audio file
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');

    // Send to backend
    const response = await fetch(`${BACKEND_URL}/transcribe`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData: TranscriptionError = await response.json();
      throw new Error(errorData.error || 'Transcription failed');
    }

    const result: TranscriptionResult = await response.json();
    return result;
  } catch (error) {
    console.error('Transcription error:', error);
    throw error;
  }
}

/**
 * Check if backend server is available
 * @returns Promise<boolean> - true if server is reachable
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${BACKEND_URL}/health`);
    const data = await response.json();
    return data.status === 'ok';
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
}
