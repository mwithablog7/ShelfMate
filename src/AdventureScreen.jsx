import React, { useState, useEffect } from "react";

const challenges = [
  "Read 10 pages of a new book",
  "Write a 5-sentence summary",
  "Read a poem and reflect",
  "Discover a new author",
  "Read a chapter before bed"
];

function AdventureScreen({ markDone, goBack }) {
  const [todayChallenge, setTodayChallenge] = useState("");

  useEffect(() => {
    const day = new Date().getDate();
    setTodayChallenge(challenges[day % challenges.length]);
  }, []);

  return (
    <div className="adventure-screen">
      <h1>Today's Challenge</h1>
      <p className="challenge-text">{todayChallenge}</p>
      <div className="adventure-buttons">
        <button onClick={() => markDone(todayChallenge)}>Done ✅</button>
        <button onClick={goBack}>Back</button>
      </div>
    </div>
  );
}

export default AdventureScreen;
