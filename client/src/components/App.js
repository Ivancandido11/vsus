import React, { useEffect, useState } from "react"
import { Route, Switch, useHistory } from "react-router-dom"
import Nav from "./Nav"
import LobbyList from "./LobbyList"
import Leaderboards from "./Leaderboards"
import GamePage from "./GamePage"
import Home from "./Home"
import Adapter from "../Adapter"
import CreateAccount from "./CreateAccount"
import { useCookies } from "react-cookie"
import "../App.css"

function App () {
  const [lobbies, setLobbies] = useState([])
  const [allUsers, setAllUsers] = useState([])
  const [cookies, setCookies] = useCookies(["user"])
  const [sort, setSort] = useState("")
  const history = useHistory()
  const loggedOut = {
    id: 0,
    name: "",
    password: "",
    points: 0
  }

  useEffect(() => {
    Adapter.getLobbies()
      .then(data => setLobbies(data))
    Adapter.getUsers()
      .then(data => setAllUsers(data))
    if (!cookies.user) {
      setCookies("user", loggedOut, { path: "/" })
    }
    // eslint-disable-next-line
  }, [])

  const handleCreateGameFormSubmit = (newGame) => {
    Adapter.submit(newGame)
      .then(data => {
        handleJoinGame(data.id, data.players)
        setLobbies([...lobbies, data])
        // history.push(`/gamepage/${data.id}`)
        // history.go(0)
      })
  }

  const handleJoinGame = (id, players) => {
    if (cookies.user.name) {
      Adapter.joinGame(cookies.user.name, id, players)
        .then(data => {
          const updatedLobbies = lobbies.map(lobby => {
            if (lobby.id === data.id) return data
            else return lobby
          })
          setLobbies(updatedLobbies)
          history.push(`/gamepage/${data.id}`)
        })
    } else {
      alert("Please sign in!")
      history.push("/")
    }
  }

  const finishGame = (id) => {
    Adapter.delete(id)
      .then(() => {
        const updatedLobbies = lobbies.filter(lobby => lobby.id !== parseInt(id))
        setLobbies(updatedLobbies)
        history.push("/lobbies")
      })
  }

  const handleCreateAccountSubmit = (newAccount) => {
    console.log(newAccount)
    Adapter.createAccount(newAccount)
      .then(data => {
        console.log(data)
        setAllUsers([...allUsers, data])
        setCookies("user", data, { path: "/" })
        history.push("/")
      })
  }

  const handleSignIn = (username, password) => {
    const currentUser = allUsers.filter(loggedInUser => loggedInUser.name.toLowerCase() === username.toLowerCase())
    if (currentUser.length > 0 && currentUser[0].password === password) {
      setCookies("user", currentUser[0], { path: "/" })
    } else if (currentUser.length > 0 && currentUser[0].password !== password) {
      alert("Password is case-sensitive. Wrong password!")
    } else {
      alert("Please create an account!")
      history.push("/createaccount")
    }
  }

  const handleSortClick = (sort) => setSort(sort)

  const handleViewGameClick = (id) => history.push(`/gamepage/${id}`)

  const handleSignOut = () => {
    setCookies("user", loggedOut, { path: "/" })
  }

  const lobbiesToDisplay = (displayableLobbies) => {
    if (sort === "title") {
      return displayableLobbies.sort((a, b) => a[sort].localeCompare(b[sort]))
    } else if (sort === "") {
      return displayableLobbies
    } else if (sort === "rank") {
      return displayableLobbies.sort((a, b) => a[sort] - b[sort])
    } else {
      return displayableLobbies.sort((a, b) => a[sort].filter(player => player !== "").length - b[sort].filter(player => player !== "").length)
    }
  }

  const addPoints = (players) => {
    if (cookies.user.name) {
      const playerIn = players.filter(player => player === cookies.user.name)
      if (playerIn[0] === cookies.user.name) {
        Adapter.addPoints(cookies.user.id, cookies.user)
          .then(data => {
            const updatedUsers = allUsers.map(user => {
              if (data.id === user.id) {
                setCookies("user", data, { path: "/" })
                return data
              } else return user
            })
            setAllUsers(updatedUsers)
          })
      } else {
        alert("Game Finished!")
      }
    } else {
      alert("Please Sign In!")
      history.push("/")
    }
  }

  if (!cookies.user) {
    return <h2>Loading...</h2>
  }

  return (
    <div className="App">
      <header className="app-logo">
        <img
          alt="catan logo"
          className="logo"
          src="https://logo.clearbit.com/catan.com"
        />
      </header>
      <Nav />
      <Switch>
        <Route path="/lobbies">
          <LobbyList
              cookies={cookies.user}
              lobbies={lobbiesToDisplay(lobbies)}
              onFormSubmit={handleCreateGameFormSubmit}
              onJoinGame={handleJoinGame}
              onSortClick={handleSortClick}
              onViewGameClick={handleViewGameClick}
          />
        </Route>
        <Route path="/leaderboards">
          <Leaderboards users={allUsers}/>
        </Route>
        <Route path="/gamepage/:id">
          <GamePage
              cookies={cookies.user}
              onAddPoints={addPoints}
              onFinishGameClick={finishGame}
              onJoinGame={handleJoinGame}
          />
        </Route>
        <Route path="/createaccount">
          <CreateAccount
              onCreateSubmit={handleCreateAccountSubmit}
              users={allUsers}
          />
        </Route>
        <Route exact path="/">
          <Home
              cookies={cookies.user}
              onSignInSubmit={handleSignIn}
              onSignOut={handleSignOut}
          />
        </Route>
      </Switch>
    </div>
  )
}

export default App
