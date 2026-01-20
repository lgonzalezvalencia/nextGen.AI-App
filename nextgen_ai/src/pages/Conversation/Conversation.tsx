import { useEffect, useState, useRef } from 'react';
import styles from './Conversation.module.scss';
import StopButton from './components/stopButton/StopButton';
import PlayButton from './components/playButton/PlayButton';
import RecordingButton from './components/recordingButton/RecordingButton';
import AudioRecording from './components/audioRecording/AudioRecording';
import type { AudioRecordingRef } from './components/audioRecording/AudioRecording';

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
                <PlayButton />
              </div>
              <div className={styles.buttonWrapper}>
                <RecordingButton onToggle={handleRecordingToggle} />
              </div>
              <div className={styles.buttonWrapper}>
                <StopButton />
              </div>
          </div>
      </div>
    </div>
  );
};

export default Conversation;
