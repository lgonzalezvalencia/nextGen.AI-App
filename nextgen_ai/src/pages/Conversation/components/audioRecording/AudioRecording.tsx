import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record';
import styles from './AudioRecording.module.scss';

export interface AudioRecordingRef {
  startRecording: () => Promise<void>;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => void;
}

const AudioRecording = forwardRef<AudioRecordingRef>((props, ref) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const recordPluginRef = useRef<RecordPlugin | null>(null);

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

    wavesurferRef.current = wavesurfer;
    recordPluginRef.current = recordPlugin;

    return () => {
      wavesurfer.destroy();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    startRecording: async () => {
      if (recordPluginRef.current) {
        await recordPluginRef.current.startRecording();
      }
    },
    pauseRecording: () => {
      if (recordPluginRef.current) {
        recordPluginRef.current.pauseRecording();
      }
    },
    resumeRecording: () => {
      if (recordPluginRef.current) {
        recordPluginRef.current.resumeRecording();
      }
    },
    stopRecording: () => {
      if (recordPluginRef.current) {
        recordPluginRef.current.stopRecording();
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
