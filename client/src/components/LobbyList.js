/* eslint-disable react/prop-types */
import React, { useState } from "react"
import Game from "./Game"
import CreateGameForm from "./CreateGameForm"
import "../App.css"

const LobbyList = ({ cookies, lobbies, onFormSubmit, onJoinGame, onSortClick, onViewGameClick }) => {
  const [showForm, setShowForm] = useState(false)

  const handleCreateGameClick = () => {
    setShowForm(showForm => !showForm)
  }

  const handleSortClick = (e) => {
    onSortClick(e.target.name)
  }

  return (
    <div className="main">
      <h2>
        {cookies.name !== "" ? `${cookies.name}: ${cookies.points} points earned` : null}
      </h2>
      <button onClick={handleCreateGameClick}>Create Game</button>
      {showForm
        ? <CreateGameForm
          cookies={cookies}
          onFormSubmit={onFormSubmit}
      />
        : null}
      <div className="divTable">
        <table className="lobbyTable">
          <tbody>
            <tr>
              <th>
                <h3>Players  <button
                    name="players"
                    onClick={handleSortClick}
                  >Sort</button></h3>
              </th>
              <th>
                <h3>Title  <button
                    name="title"
                    onClick={handleSortClick}
                  >Sort</button></h3>
              </th>
              <th>
                <h3>Rank  <button
                    name="rank"
                    onClick={handleSortClick}
                  >Sort</button></h3>
              </th>
              <th>
                <h3>Action</h3>
              </th>
            </tr>
            {lobbies.map(lobby =>
              <Game
                id={lobby.id}
                key={lobby.id}
                onJoinGame={onJoinGame}
                onViewGameClick={onViewGameClick}
                rank={lobby.rank}
                title={lobby.title}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LobbyList
