/* eslint-disable react/prop-types */
import React from "react"
import "../App.css"

const Leaderboards = ({ users }) => {
  const usersByPoints = users.sort((a, b) => b.points - a.points)
  const rankings = usersByPoints.slice(0, 10)
  return (
    <div className="main">
      <h1>Leaderboards</h1>
      <ol className="leaderboardOl">
        {rankings.map(user => <li key={user.id}>{user.name} <p>Points: {user.points}</p></li>)}
      </ol>
    </div>
  )
}

export default Leaderboards
