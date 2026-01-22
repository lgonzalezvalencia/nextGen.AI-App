import { useEffect, useRef, forwardRef, useImperativeHandle, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record';
import styles from './AudioRecording.module.scss';

export interface AudioRecordingRef {
  startRecording: () => Promise<void>;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => void;
  playRecording: () => void;
  getRecordedBlob: () => Blob | null;
  convertBlobToWav: () => Promise<Blob | null>;
}

// Helper function to convert AudioBuffer to WAV format
function audioBufferToWav(audioBuffer: AudioBuffer): Blob {
  const numberOfChannels = 1; // Force mono
  const sampleRate = audioBuffer.sampleRate;
  const format = 1; // PCM
  const bitDepth = 16;
  
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numberOfChannels * bytesPerSample;
  
  // Get audio data from first channel
  const samples = audioBuffer.getChannelData(0);
  const dataLength = samples.length * bytesPerSample;
  const buffer = new ArrayBuffer(44 + dataLength);
  const view = new DataView(buffer);
  
  // Write WAV header
  const writeString = (offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };
  
  writeString(0, 'RIFF');
  view.setUint32(4, 36 + dataLength, true);
  writeString(8, 'WAVE');
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // fmt chunk size
  view.setUint16(20, format, true); // PCM
  view.setUint16(22, numberOfChannels, true); // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true); // Byte rate
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);
  writeString(36, 'data');
  view.setUint32(40, dataLength, true);
  
  // Write PCM samples
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    // Clamp to [-1, 1] and convert to 16-bit PCM
    const sample = Math.max(-1, Math.min(1, samples[i]));
    const int16Value = sample < 0 ? sample * 32768 : sample * 32767;
    view.setInt16(offset, int16Value, true);
    offset += 2;
  }
  
  return new Blob([buffer], { type: 'audio/wav' });
}

const AudioRecording = forwardRef<AudioRecordingRef>((_props, ref) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const recordPluginRef = useRef<RecordPlugin | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [isRecordingStarted, setIsRecordingStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!waveformRef.current) return;

    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#ffffff',
      progressColor: '#ffffff',
      height: 72,
      barWidth: 3,
      barGap: 2,
      barRadius: 2,
      cursorWidth: 0,
      normalize: false,
      barHeight: 0.8,
      autoScroll: true,
      autoCenter: true,
    });

    const recordPlugin = wavesurfer.registerPlugin(
      RecordPlugin.create({
        scrollingWaveform: true,
        renderRecordedAudio: true,
        continuousWaveform: true,
        audioBitsPerSecond: 128000,
        mimeType: 'audio/webm;codecs=opus',
      })
    );

    // Listen for recording events to store the blob
    recordPlugin.on('record-end', (blob: Blob) => {
      console.log('Recording ended, blob size:', blob.size);
      setRecordedBlob(blob);
    });

    recordPlugin.on('record-pause', (blob: Blob) => {
      console.log('Recording paused, blob size:', blob.size);
      setRecordedBlob(blob);
    });

    wavesurferRef.current = wavesurfer;
    recordPluginRef.current = recordPlugin;

    return () => {
      wavesurfer.destroy();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    startRecording: async () => {
      if (recordPluginRef.current) {
        if (!isRecordingStarted) {
          // First time starting
          console.log('Starting new recording');
          await recordPluginRef.current.startRecording();
          setIsRecordingStarted(true);
          setIsPaused(false);
        } else if (isPaused) {
          // Resume existing recording
          console.log('Resuming recording');
          recordPluginRef.current.resumeRecording();
          setIsPaused(false);
        }
      }
    },
    pauseRecording: () => {
      if (recordPluginRef.current && isRecordingStarted) {
        console.log('Pausing recording');
        recordPluginRef.current.pauseRecording();
        setIsPaused(true);
      }
    },
    resumeRecording: () => {
      if (recordPluginRef.current) {
        recordPluginRef.current.resumeRecording();
      }
    },
    stopRecording: () => {
      if (recordPluginRef.current && isRecordingStarted) {
        console.log('Stopping recording');
        recordPluginRef.current.stopRecording();
        setIsRecordingStarted(false);
        setIsPaused(false);
      }
    },
    playRecording: () => {
      console.log('Play button clicked, recordedBlob:', recordedBlob);
      if (recordedBlob && wavesurferRef.current && waveformRef.current) {
        const url = URL.createObjectURL(recordedBlob);
        console.log('Loading audio from blob URL:', url);
        
        // Destroy current wavesurfer and recreate for playback
        wavesurferRef.current.destroy();
        
        const playbackWavesurfer = WaveSurfer.create({
          container: waveformRef.current,
          waveColor: '#ffffff',
          progressColor: '#ffffff',
          height: 72,
          barWidth: 3,
          barGap: 2,
          barRadius: 2,
          cursorWidth: 0,
          normalize: false,
          barHeight: 0.8,
          minPxPerSec: 100,
          autoScroll: true,
          autoCenter: true,
        });
        
        wavesurferRef.current = playbackWavesurfer;
        
        playbackWavesurfer.load(url);
        playbackWavesurfer.once('ready', () => {
          console.log('Audio ready, starting playback');
          playbackWavesurfer.play();
        });
      } else {
        console.log('Cannot play: recordedBlob or wavesurfer missing');
      }
    },
    getRecordedBlob: () => {
      return recordedBlob;
    },
    convertBlobToWav: async () => {
      if (!recordedBlob) return null;
      
      try {
        // Decode the audio blob to WAV format using Web Audio API
        const audioContext = new AudioContext({ sampleRate: 16000 });
        const arrayBuffer = await recordedBlob.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        console.log('Audio buffer details:', {
          duration: audioBuffer.duration,
          sampleRate: audioBuffer.sampleRate,
          numberOfChannels: audioBuffer.numberOfChannels,
          length: audioBuffer.length
        });
        
        // Convert to WAV format
        const wavBlob = audioBufferToWav(audioBuffer);
        console.log('WAV conversion complete, size:', wavBlob.size);
        return wavBlob;
      } catch (error) {
        console.error('Error converting to WAV:', error);
        return null;
      }
    },
  }));

  return (
    <div className={styles.audioRecording}>
      <div ref={waveformRef} className={styles.waveform}></div>
    </div>
  );
});

AudioRecording.displayName = 'AudioRecording';

export default AudioRecording;
