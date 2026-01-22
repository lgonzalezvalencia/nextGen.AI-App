import styles from "./StartRecordingButton.module.scss";
import MicNoneIcon from "@mui/icons-material/MicNone";

interface StartRecordingButtonProps {
  onClick: () => void;
}

const StartRecordingButton = ({ onClick }: StartRecordingButtonProps) => {
  return (
    <button className={styles.recordButton} onClick={onClick}>
      <MicNoneIcon className={styles.micIcon} sx={{ fontSize: 50 }} />
    </button>
  );
};

export default StartRecordingButton;
