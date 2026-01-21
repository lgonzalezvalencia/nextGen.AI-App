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
        mimeType: 'audio/webm',
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
          scrollParent: true,
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
  }));

  return (
    <div className={styles.audioRecording}>
      <div ref={waveformRef} className={styles.waveform}></div>
    </div>
  );
});

AudioRecording.displayName = 'AudioRecording';

export default AudioRecording;
