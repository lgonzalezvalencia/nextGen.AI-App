import styles from './Home.module.scss';
import BurgerMenu from "../../components/burgerMenu/BurgerMenu";
import StartRecordingButton from "../../components/startRecordingButton/StartRecordingButton";

interface HomeProps {
  onStartRecording: () => void;
}

const Home = ({ onStartRecording }: HomeProps) => {
  return (
    <div className={styles.homePage}>
      <BurgerMenu />
      <h2 className={styles.userGreeting}>Hi Juan Ignacio</h2>
      <h2 className={styles.welcomeMessage}>Ready for your next 1:1?</h2>
      <h2 className={styles.welcomeInstruction}>
        Start a conversation to
        <br />
        support your team.
      </h2>
      <h1>Welcome to NextGen AI</h1>
      <p>Your gateway to the future of artificial intelligence.</p>
      <StartRecordingButton onClick={onStartRecording} />
    </div>
  );
};

export default Home;
