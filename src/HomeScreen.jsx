import React from "react";

const challenges = [
  "Read 10 pages of a new book",
  "Write a 5-sentence summary of what you read",
  "Read a poem and reflect on it",
  "Discover a new author today",
  "Read a chapter before bed"
];

const pastelColors = ["#D4F0F0", "#F8E1F4", "#E6F4D9", "#FFF2D1", "#DCE1FF"];

function HomeScreen({ goToAdventure, goToStats }) {
  return (
    <div className="home-screen">
      <h1 className="title">🌿 Reading Clouds</h1>
      <div className="cloud-container">
        {challenges.map((challenge, idx) => (
          <div
            key={idx}
            className="cloud"
            style={{ backgroundColor: pastelColors[idx % pastelColors.length] }}
          >
            <span className="popup">{challenge}</span>
          </div>
        ))}
      </div>
      <div className="home-buttons">
        <button onClick={goToAdventure}>Today's Challenge</button>
        <button onClick={goToStats}>Stats</button>
      </div>
    </div>
  );
}

export default HomeScreen;
