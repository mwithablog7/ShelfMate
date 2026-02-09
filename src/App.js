
import React, { useState, useEffect } from "react";
import HomeScreen from "./HomeScreen";
import AdventureScreen from "./AdventureScreen";
import StatsScreen from "./StatsScreen";

export default function App() {
  const [screen, setScreen] = useState("home");
  const [completed, setCompleted] = useState(
    JSON.parse(localStorage.getItem("completed")) || []
  );

  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(completed));
  }, [completed]);

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset your progress?")) {
      setCompleted([]);
    }
  };

  const addCompletion = (challengeId) => {
    const today = new Date().toISOString().slice(0, 10);
    setCompleted([...completed, { challengeId, date: today }]);
  };

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <HomeScreen setScreen={setScreen} />;
      case "adventure":
        return (
          <AdventureScreen
            setScreen={setScreen}
            addCompletion={addCompletion}
          />
        );
      case "stats":
        return (
          <StatsScreen
            setScreen={setScreen}
            completed={completed}
            resetProgress={resetProgress}
          />
        );
      default:
        return <HomeScreen setScreen={setScreen} />;
    }
  };

  return <div>{renderScreen()}</div>;
}






home screen 



import React from "react";

export default function HomeScreen({ setScreen }) {
  const moods = [
    { emoji: "📖", label: "Reading" },
    { emoji: "☕", label: "Coffee Time" },
    { emoji: "🎵", label: "Music Vibes" },
    { emoji: "🌿", label: "Relaxed" },
    { emoji: "💡", label: "Inspired" },
  ];

  return (
    <div className="container">
      <h1>Welcome to ShelfMate</h1>
      <div className="mood-grid">
        {moods.map((m, i) => (
          <div key={i} className="mood" title={m.label}>
            {m.emoji}
            <p>{m.label}</p>
          </div>
        ))}
      </div>
      <button className="btn" onClick={() => setScreen("adventure")}>
        Start Challenge
      </button>
      <button className="btn" onClick={() => setScreen("stats")}>
        View Stats
      </button>
    </div>
  );
}

