import { useState } from 'react';
import styles from './RecordingButton.module.scss';

interface RecordingButtonProps {
  onToggle?: (isRecording: boolean) => void;
}

const RecordingButton = ({ onToggle }: RecordingButtonProps) => {
  const [isRecording, setIsRecording] = useState(false);

  const handleClick = () => {
    const newState = !isRecording;
    setIsRecording(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <button
      className={`${styles.recordingButton} ${isRecording ? styles.recording : styles.paused}`}
      onClick={handleClick}
    >
      {isRecording ? (
        <div className={styles.recordingIndicator}></div>
      ) : (
        <div className={styles.pauseIcon}>
          <div className={styles.pauseBar}></div>
          <div className={styles.pauseBar}></div>
        </div>
      )}
    </button>
  );
};

export default RecordingButton;