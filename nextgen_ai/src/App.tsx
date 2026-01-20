import "./App.css";
import BurgerMenu from "./components/burgerMenu/BurgerMenu";
import Conversation from "./pages/Conversation/Conversation";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <BurgerMenu />
      <Conversation></Conversation>
    </>
  );
}

export default App;
