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

  const [streak, setStreak] = useState(parseInt(localStorage.getItem("dailyStreak")) || 0);

  const [lastCompletedDate, setLastCompletedDate] = useState(
    localStorage.getItem("lastCompletedDate") || null
  );

  const [streakFreezesLeft, setStreakFreezesLeft] = useState(
    parseInt(localStorage.getItem("streakFreezesLeft")) || 2
  );

  useEffect(() => {
    localStorage.setItem("completedChallenges", JSON.stringify(completedChallenges));
    localStorage.setItem("dailyStreak", streak);
    localStorage.setItem("lastCompletedDate", lastCompletedDate);
    localStorage.setItem("streakFreezesLeft", streakFreezesLeft);
  }, [completedChallenges, streak, lastCompletedDate, streakFreezesLeft]);

  const markChallengeDone = (challengeId) => {
    const today = new Date().toDateString();

    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges([...completedChallenges, challengeId]);

      if (!lastCompletedDate) {
        setStreak(1);
      } else {
        const lastDate = new Date(lastCompletedDate);
        const diffDays = Math.floor(
          (new Date(today) - lastDate) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 1) {
          setStreak(streak + 1);
        } else if (diffDays > 1) {
          if (streakFreezesLeft > 0) {
            setStreakFreezesLeft(streakFreezesLeft - 1);
          } else {
            setStreak(1);
          }
        }
      }
      setLastCompletedDate(today);
    }
  };

  const resetStats = () => {
    if (window.confirm("Are you sure you want to reset your stats?")) {
      setCompletedChallenges([]);
      setStreak(0);
      setLastCompletedDate(null);
      setStreakFreezesLeft(2);
    }
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
          streakFreezesLeft={streakFreezesLeft}
          resetStats={resetStats}
          goBack={() => setCurrentScreen(SCREENS.HOME)}
        />
      )}
    </div>
  );
}

export default App;
