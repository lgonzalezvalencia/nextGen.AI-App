import { useState } from 'react';
import styles from './PlayButton.module.scss';

interface PlayButtonProps {
  onClick?: () => void;
}

const PlayButton = ({ onClick }: PlayButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`${styles.playButton} ${isPressed ? styles.pressed : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
    >
      <div className={styles.playIcon}></div>
    </button>
  );
};

export default PlayButton;