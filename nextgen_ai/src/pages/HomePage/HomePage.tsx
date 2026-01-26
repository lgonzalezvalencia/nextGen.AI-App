import styles from "./HomePage.module.scss";
import BurgerMenu from "../../components/burgerMenu/BurgerMenu";
import StartRecordingButton from "../../components/startRecordingButton/StartRecordingButton";

interface HomeProps {
  onStartRecording: () => void;
}

const HomePage = ({ onStartRecording }: HomeProps) => {
  return (
    <div className={styles["menuContainer"]}>
      <div className={styles["burgerMenuWrapper"]}>
        <BurgerMenu />
      </div>
      <h2 className={styles["greeting"]}>Hi Juan Ignacio</h2>
      <div className={styles["readyText"]}>
        <span>Ready for your next 1:1?</span>
        <br />
        <span className={styles["supportText"]}>
          Start a conversation to support your team.
        </span>
      </div>
      <div className={styles["recordingButtonWrapper"]}>
        <StartRecordingButton onClick={onStartRecording} />
      </div>
    </div>
  );
};

export default HomePage;
