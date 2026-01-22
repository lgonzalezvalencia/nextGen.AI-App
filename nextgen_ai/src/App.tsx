import { useState } from "react";
import "./App.css";
import BurgerMenu from "./components/burgerMenu/BurgerMenu";
import Conversation from "./pages/Conversation/Conversation";
import Home from "./pages/Home/Home";
import { TeamMemberInsights } from "./pages/TeamMemberInsights/TeamMemberInsights";

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'conversation' | 'insights'>('home');

  const handleStartRecording = () => {
    setCurrentView('conversation');
  };

  const handleStopRecording = () => {
    setCurrentView('insights');
  };

  return (
    <>
      <BurgerMenu />
      {currentView === 'home' ? (
        <Home onStartRecording={handleStartRecording} />
      ) : currentView === 'conversation' ? (
        <Conversation onStop={handleStopRecording} />
      ) : (
        <TeamMemberInsights onStartRecording={handleStartRecording} />
      )}
    </>
  );
}

export default App;
