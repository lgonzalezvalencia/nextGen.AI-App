import { useEffect, useState } from 'react';
import styles from './RecordingButton.module.scss';

interface RecordingButtonProps {
  onToggle?: (isPausing: boolean) => void;
  isRecording?: boolean;
}

const RecordingButton = ({ onToggle, isRecording: externalIsRecording }: RecordingButtonProps) => {
  const [isRecording, setIsRecording] = useState(false);

  // Sync with external state
  useEffect(() => {
    if (externalIsRecording !== undefined) {
      setIsRecording(externalIsRecording);
    }
  }, [externalIsRecording]);

  const handleClick = () => {
    const willBePausing = isRecording;
    setIsRecording(!isRecording);
    if (onToggle) {
      onToggle(willBePausing);
    }
  };

  return (
    <button
      className={`${styles.recordingButton} ${isRecording ? styles.recording : styles.paused}`}
      onClick={handleClick}
    >
      {isRecording ? (
        <div className={styles.pauseIcon}>
          <div className={styles.pauseBar}></div>
          <div className={styles.pauseBar}></div>
        </div>
      ) : (
        <div className={styles.recordingIndicator}></div>
      )}
    </button>
  );
};

export default RecordingButton;