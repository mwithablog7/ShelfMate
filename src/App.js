import React, { useState } from "react";
import HomeScreen from "./HomeScreen";
import AdventureScreen from "./AdventureScreen";
import StatsScreen from "./StatsScreen";
import "./AppStyles.css";

export default function App() {
  const [screen, setScreen] = useState("home"); // home, adventure, stats
  const [mood, setMood] = useState("");

  const goHome = () => {
    setScreen("home");
    setMood("");
  };

  const startAdventure = (selectedMood) => {
    setMood(selectedMood);
    setScreen("adventure");
  };

  const showStats = () => setScreen("stats");
  const backToAdventure = () => setScreen("adventure");

  if (screen === "adventure")
    return (
      <AdventureScreen mood={mood} goBack={goHome} showStats={showStats} />
    );

  if (screen === "stats") return <StatsScreen goBack={backToAdventure} />;

  return <HomeScreen startAdventure={startAdventure} />;
}
