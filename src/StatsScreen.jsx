import React, { useEffect, useState } from "react";

export default function StatsScreen({ goBack }) {
  const [completed, setCompleted] = useState([]);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const done = JSON.parse(localStorage.getItem("completed") || "[]");
    setCompleted(done);

    const newBadges = [];
    if (done.length >= 1) newBadges.push("📖 Novice Reader");
    if (done.length >= 3) newBadges.push("📚 Bookworm");
    if (done.length >= 5) newBadges.push("🏆 Reading Master");
    setBadges(newBadges);
  }, []);

  return (
    <div className="container">
      <h1>Your Stats 📊</h1>
      <p>Challenges completed: {completed.length}</p>

      {completed.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {completed.map((challenge, index) => (
            <li key={index} className="challenge-card">
              ✅ {challenge}
            </li>
          ))}
        </ul>
      )}

      {badges.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Badges Earned 🏅</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {badges.map((badge, index) => (
              <li key={index} className="challenge-card">
                {badge}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={goBack}>⬅ Back</button>
    </div>
  );
}
