import BurgerMenu from "../../components/burgerMenu/BurgerMenu";
import StartRecordingButton from "../../components/startRecordingButton/StartRecordingButton";

const Home = () => {
  return (
    <div>
      <BurgerMenu />
      <h1>Welcome to NextGen AI</h1>
      <p>Your gateway to the future of artificial intelligence.</p>
      <StartRecordingButton />
    </div>
  );
};

export default Home;
