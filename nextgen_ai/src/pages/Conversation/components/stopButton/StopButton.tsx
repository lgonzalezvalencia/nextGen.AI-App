import { useState } from 'react';
import styles from './StopButton.module.scss';

interface StopButtonProps {
  onClick?: () => void;
}

const StopButton = ({ onClick }: StopButtonProps) => {
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
      className={`${styles.stopButton} ${isPressed ? styles.pressed : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleClick}
    >
      <div className={styles.stopIcon}></div>
    </button>
  );
};

export default StopButton;