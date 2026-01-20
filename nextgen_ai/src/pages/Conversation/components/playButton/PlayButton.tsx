import { useState } from 'react';
import styles from './PlayButton.module.scss';

const PlayButton = () => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  return (
    <button
      className={`${styles.playButton} ${isPressed ? styles.pressed : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className={styles.playIcon}></div>
    </button>
  );
};

export default PlayButton;