import { useEffect, useState, useRef } from 'react';
import styles from './Conversation.module.scss';
import StopButton from './components/stopButton/StopButton';
import PlayButton from './components/playButton/PlayButton';
import RecordingButton from './components/recordingButton/RecordingButton';
import AudioRecording from './components/audioRecording/AudioRecording';
import type { AudioRecordingRef } from './components/audioRecording/AudioRecording';
import { transcribeAudio } from '../../services/transcription';

interface Message {
  speaker: string;
  role: string;
  message: string;
}

const Conversation = () => {
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRecordingRef = useRef<AudioRecordingRef>(null);

  useEffect(() => {
    fetch('/data/conversation.json')
      .then(response => response.json())
      .then(data => {
        setAllMessages(data.conversation);
      });
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedMessages]);

  const handleContainerClick = () => {
    if (currentIndex < allMessages.length) {
      setDisplayedMessages([...displayedMessages, allMessages[currentIndex]]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleRecordingToggle = async (recording: boolean) => {
    if (recording) {
      // Start recording
      await audioRecordingRef.current?.startRecording();
    } else {
      // Pause recording
      audioRecordingRef.current?.pauseRecording();
    }
  };

  const handlePlay = () => {
    // Play the recorded audio
    audioRecordingRef.current?.playRecording();
  };

  const handleStop = async () => {
    // Stop recording
    audioRecordingRef.current?.stopRecording();
    
    // Wait a bit for the blob to be ready, then convert to WAV and transcribe
    setTimeout(async () => {
      try {
        const wavBlob = await audioRecordingRef.current?.convertBlobToWav();
        
        if (wavBlob) {
          console.log('🎙️ Audio converted to WAV, starting transcription...');
          console.log('WAV blob size:', wavBlob.size, 'bytes');
          
          const result = await transcribeAudio(wavBlob);
          console.log('✅ TRANSCRIPTION COMPLETE:');
          console.log('─────────────────────────────────');
          console.log(result.transcription);
          console.log('─────────────────────────────────');
          console.log('Full result object:', result);
        } else {
          console.log('⚠️ No audio blob available to transcribe');
        }
      } catch (error) {
        console.error('❌ Transcription failed:', error);
      }
    }, 200);
  };

  return (
    <div className={styles.conversationPage}>
      <div className={styles.fadeOverlay}></div>
      <div 
        ref={containerRef}
        className={styles.conversationContainer}
        onClick={handleContainerClick}
      >
        {displayedMessages.map((msg, index) => (
          <div
            key={index}
            className={msg.role === 'Manager' ? styles.managerBubble : styles.employeeBubble}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <div className={styles.actionsPanel}>
          <AudioRecording ref={audioRecordingRef} />
          <div className={styles.buttonsContainer}>
              <div className={styles.buttonWrapper}>
                <PlayButton onClick={handlePlay} />
              </div>
              <div className={styles.buttonWrapper}>
                <RecordingButton onToggle={handleRecordingToggle} />
              </div>
              <div className={styles.buttonWrapper}>
                <StopButton onClick={handleStop} />
              </div>
          </div>
      </div>
    </div>
  );
};

export default Conversation;
