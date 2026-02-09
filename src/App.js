import React, { useState, useEffect } from "react";
import HomeScreen from "./HomeScreen";
import AdventureScreen from "./AdventureScreen";
import StatsScreen from "./StatsScreen";

const SCREENS = {
  HOME: "HOME",
  ADVENTURE: "ADVENTURE",
  STATS: "STATS"
};

function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.HOME);
  const [completedChallenges, setCompletedChallenges] = useState(
    JSON.parse(localStorage.getItem("completedChallenges")) || []
  );

  const [streak, setStreak] = useState(
    parseInt(localStorage.getItem("dailyStreak")) || 0
  );

  useEffect(() => {
    localStorage.setItem("completedChallenges", JSON.stringify(completedChallenges));
    localStorage.setItem("dailyStreak", streak);
  }, [completedChallenges, streak]);

  const markChallengeDone = (challengeId) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges([...completedChallenges, challengeId]);
      setStreak(streak + 1);
    }
  };

  const resetStats = () => {
    setCompletedChallenges([]);
    setStreak(0);
  };

  return (
    <div className="app-container">
      {currentScreen === SCREENS.HOME && (
        <HomeScreen
          goToAdventure={() => setCurrentScreen(SCREENS.ADVENTURE)}
          goToStats={() => setCurrentScreen(SCREENS.STATS)}
        />
      )}
      {currentScreen === SCREENS.ADVENTURE && (
        <AdventureScreen
          markDone={markChallengeDone}
          goBack={() => setCurrentScreen(SCREENS.HOME)}
        />
      )}
      {currentScreen === SCREENS.STATS && (
        <StatsScreen
          completedCount={completedChallenges.length}
          streak={streak}
          resetStats={resetStats}
          goBack={() => setCurrentScreen(SCREENS.HOME)}
        />
      )}
    </div>
  );
}

export default App;
