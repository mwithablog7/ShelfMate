import React, { useEffect, useState } from "react";

export default function AdventureScreen({ mood, goBack, showStats }) {
  const [dailyChallenge, setDailyChallenge] = useState("");
  const [streak, setStreak] = useState(0);

  const challenges = {
    inspired: [
      "Write a 3-sentence summary of the last chapter you read.",
      "Find a quote that inspires you and save it.",
      "Recommend a book to a friend.",
    ],
    relaxed: [
      "Read one random paragraph aloud.",
      "Sketch a character you love in 2 minutes.",
      "Read a poem and savor each line.",
    ],
    adventurous: [
      "Start a book you’ve never tried before.",
      "Pick a random page and read 5 sentences.",
      "Explore a new genre you usually skip.",
    ],
    curious: [
      "Research an author you’ve never read before.",
      "Read a non-fiction chapter today.",
      "Discover a new literary genre.",
    ],
    cozy: [
      "Read by a window with a warm drink.",
      "Write a short reflection about your favorite character.",
      "Pick a comfort book and read a chapter.",
    ],
  };

  // Load daily challenge
  useEffect(() => {
    const today = new Date().toDateString();
    const saved = JSON.parse(localStorage.getItem("dailyChallenge") || "{}");

    if (saved.date === today && saved.mood === mood) {
      setDailyChallenge(saved.challenge);
    } else {
      const random =
        challenges[mood][Math.floor(Math.random() * challenges[mood].length)];
      setDailyChallenge(random);
      localStorage.setItem(
        "dailyChallenge",
        JSON.stringify({ date: today, mood, challenge: random })
      );
    }

    // Daily streak logic
    const lastDate = localStorage.getItem("lastDoneDate");
    if (lastDate === today) {
      const currentStreak = parseInt(localStorage.getItem("streak") || "0");
      setStreak(currentStreak);
    } else {
      const prevStreak = parseInt(localStorage.getItem("streak") || "0");
      const newStreak = prevStreak + 1;
      setStreak(newStreak);
      localStorage.setItem("streak", newStreak);
      localStorage.setItem("lastDoneDate", today);
    }
  }, [mood]);

  const markDone = () => {
    let done = JSON.parse(localStorage.getItem("completed") || "[]");
    done.push(dailyChallenge);
    localStorage.setItem("completed", JSON.stringify(done));

    // small pop animation
    const card = document.querySelector(".challenge-card");
    if (card) {
      card.style.transition = "all 0.3s ease";
      card.style.transform = "scale(1.05)";
      setTimeout(() => (card.style.transform = "scale(1)"), 300);
    }

    alert("Challenge completed! 🎉");
  };

  const resetProgress = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your progress? This cannot be undone!"
    );
    if (!confirmReset) return;

    localStorage.removeItem("completed");
    localStorage.removeItem("dailyChallenge");
    setDailyChallenge("");
    alert("Progress reset! Start fresh tomorrow 🌟");
  };

  return (
    <div className="container">
      <h2>Your reading challenge for today:</h2>
      <div className="challenge-card">{dailyChallenge}</div>
      <p style={{ fontWeight: 600, marginTop: "10px" }}>
        🔥 Current Streak: {streak} days
      </p>

      <div className="button-group">
        <button onClick={goBack}>⬅ Back</button>
        <button onClick={markDone}>✅ Done</button>
        <button onClick={showStats}>📊 View Stats</button>
        <button onClick={resetProgress}>🔄 Reset Progress</button>
      </div>
    </div>
  );
}
