import { useState } from "react";
import "./App.css";
import BurgerMenu from "./components/burgerMenu/BurgerMenu";
import Conversation from "./pages/Conversation/Conversation";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/Login/Login";
import { TeamMemberInsights } from "./pages/TeamMemberInsights/TeamMemberInsights";

function App() {
  const [currentView, setCurrentView] = useState<
    "login" | "home" | "conversation" | "insights"
  >("login");

  const handleLogin = () => {
    setCurrentView("home");
  };

  const handleStartRecording = () => {
    setCurrentView("conversation");
  };

  const handleStopRecording = () => {
    setCurrentView("insights");
  };

  return (
    <>
      {currentView !== "login" && <BurgerMenu />}
      {currentView === "login" ? (
        <Login onLogin={handleLogin} />
      ) : currentView === "home" ? (
        <HomePage onStartRecording={handleStartRecording} />
      ) : currentView === "conversation" ? (
        <Conversation onStop={handleStopRecording} />
      ) : (
        <TeamMemberInsights onStartRecording={handleStartRecording} />
      )}
    </>
  );
}

export default App;
