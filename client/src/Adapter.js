const URL = `/lobbies`
const playerURL = `/players`

class Adapter {
  static getGamePage (id) {
    return fetch(`${URL}/${id}`)
      .then(r => r.json())
  }

  static getLobbies () {
    return fetch(URL)
      .then(r => r.json())
  }

  static getPlayersInLobby (id) {
    return fetch(`/lobbies/${id}/players_in_lobby`)
      .then(r => r.json())
  }

  static submit (newGame) {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newGame)
    }
    return fetch(URL, configObj)
      .then(r => r.json())
  }

  static joinGame (user, id, players) {
    const updatedPlayers = players.slice(1, 4)
    const playersObj = {
      players: [...updatedPlayers, user]
    }
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(playersObj)
    }
    return fetch(`${URL}/${id}`, configObj)
      .then(r => r.json())
  }

  static delete (id) {
    const configObj = { method: "DELETE" }
    return fetch(`${URL}/${id}`, configObj)
  }

  static getUsers () {
    return fetch(playerURL)
      .then(r => r.json())
  }

  static createAccount (newAccount) {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newAccount)
    }
    return fetch(playerURL, configObj)
      .then(r => r.json())
  }

  static addPoints (id, player) {
    const playerObj = {
      points: player.points + 10
    }
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(playerObj)
    }
    return fetch(`${playerURL}/${id}`, configObj)
      .then(r => r.json())
  }
}

export default Adapter
