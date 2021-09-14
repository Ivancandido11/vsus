/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react"
import Adapter from "../Adapter"

const Game = (props) => {
  const [playersInGame, setPlayersInGame] = useState([])
  
  useEffect(() =>{
    Adapter.getPlayersInLobby(props.id)
      .then(players => setPlayersInGame(players))
      // eslint-disable-next-line
  }, [])

  const handleJoinClick = () => {
    props.onJoinGame(props.id, props.players)
  }

  const fullGame = () => {
    if (playersInGame.length < 4) {
      return (
        <>
          <button onClick={handleJoinClick}>Join</button>
          <button onClick={() => props.onViewGameClick(props.id)}>View</button>
        </>
      )
    } else {
      return <button onClick={() => props.onViewGameClick(props.id)}>View</button>
    }
  }

  return (
    <tr className="lobbies">
      <td>{playersInGame.length}</td>
      <td>{props.title}</td>
      <td>{props.rank}</td>
      <td>{fullGame()}</td>
    </tr>
  )
}

export default Game
