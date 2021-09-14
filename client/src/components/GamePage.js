/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import Adapter from "../Adapter"

const GamePage = ({ cookies, onAddPoints, onFinishGameClick, onJoinGame }) => {
  const [gamePage, setGamePage] = useState(null)
  const params = useParams()
  const history = useHistory()

  useEffect(() => {
    Adapter.getGamePage(params.id)
      .then(data => setGamePage(data))
  }, [params.id, gamePage])

  const handleJoinClick = () => {
    if (cookies.name) {
      onJoinGame(gamePage.id, gamePage.players)
    } else {
      alert("Please sign in!")
      history.push("/")
    }
  }

  if (!gamePage) return <h2>Loading...</h2>

  const playersInGame = gamePage.players.filter(player => player !== "")

  const displayPlayers = () => (
    gamePage.players.map((player, index) => {
      if (player) {
        return (
          <h3
            key={index}
            className={`player${index + 1}`}
          >{player}</h3>
        )
      } else {
        return (
          <h3
            key={index}
            className={`player${index + 1}`}
          >Missing Player</h3>
        )
      }
    })
  )

  const handleBackToLobby = () => {
    history.push("/lobbies")
  }

  const handleDeleteClick = () => {
    onFinishGameClick(params.id)
    onAddPoints(gamePage.players)
  }

  const handleLogin = () => {
    alert("Please log in then come back!")
    history.push("/")
  }

  return (
    <div className="mainGamePage">
      <div className="gamePage">
        {displayPlayers()}
        <h2 className="title">Room Name: {gamePage.title}</h2>
        <h2 className="rank">Rank: {gamePage.rank}</h2>
        {cookies.name ? <h2 className="user">{cookies.name}</h2> : <button className="user" onClick={handleLogin}>Login</button>}
        <img
          src="http://i.imgur.com/MZKZOle.jpg"
          alt="Catan Board"
          className="board"
        />
      </div>
      {playersInGame.length === 4
        ? <button onClick={handleDeleteClick}>Finish Game</button>
        : <>
        <button onClick={handleBackToLobby}>Back to Lobby</button>
        <button onClick={handleJoinClick}>Join</button>
        </>
      }
    </div>
  )
}

export default GamePage
