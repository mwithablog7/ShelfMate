import React from "react";

function StatsScreen({ completedCount, streak, streakFreezesLeft, resetStats, goBack }) {
  return (
    <div className="stats-screen">
      <h1>Your Stats</h1>
      <p>Total Challenges Completed: <strong>{completedCount}</strong></p>
      <p>Current Streak: <strong>{streak}</strong> days</p>
      <p>Streak Freezes Left: <strong>{streakFreezesLeft}</strong></p>
      <div className="stats-buttons">
        <button onClick={resetStats}>Reset Stats</button>
        <button onClick={goBack}>Back</button>
      </div>
    </div>
  );
}

export default StatsScreen;
