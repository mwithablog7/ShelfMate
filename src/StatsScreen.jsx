import React from "react";

function StatsScreen({ completedCount, streak, resetStats, goBack }) {
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your stats?")) {
      resetStats();
    }
  };

  return (
    <div className="stats-screen">
      <h1>Your Stats</h1>
      <p>Total Challenges Completed: <strong>{completedCount}</strong></p>
      <p>Current Streak: <strong>{streak}</strong> days</p>
      <div className="stats-buttons">
        <button onClick={handleReset}>Reset Stats</button>
        <button onClick={goBack}>Back</button>
      </div>
    </div>
  );
}

export default StatsScreen;
