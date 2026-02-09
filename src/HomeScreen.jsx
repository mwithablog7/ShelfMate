import React from "react";

export default function HomeScreen({ startAdventure }) {
  return (
    <div className="container">
      <h1>ShelfMate</h1>
      <p>How are you feeling today?</p>

      <div className="button-group">
        <button className="inspired" onClick={() => startAdventure("inspired")}>
          💡 Inspired
        </button>
        <button className="relaxed" onClick={() => startAdventure("relaxed")}>
          😌 Relaxed
        </button>
        <button
          className="adventurous"
          onClick={() => startAdventure("adventurous")}
        >
          📚 Adventurous
        </button>
        <button className="curious" onClick={() => startAdventure("curious")}>
          🧐 Curious
        </button>
        <button className="cozy" onClick={() => startAdventure("cozy")}>
          ☕ Cozy
        </button>
      </div>
    </div>
  );
}
