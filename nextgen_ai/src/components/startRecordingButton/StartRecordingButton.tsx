import styles from "./StartRecordingButton.module.scss";
import MicNoneIcon from "@mui/icons-material/MicNone";

const StartRecordingButton = () => {
  return (
    <button className={styles.recordButton}>
      <MicNoneIcon className={styles.micIcon} sx={{ fontSize: 50 }} />
    </button>
  );
};

export default StartRecordingButton;
