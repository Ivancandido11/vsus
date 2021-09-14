import React from "react"
import { NavLink } from "react-router-dom"
import "../App.css"

const Nav = () => {
  return (
    <div className="nav">
      <NavLink
          to="/"
          exact
          className="nav-menu"
          activeStyle={{ background: "#F5F5F5" }}
      > Home
      </NavLink>
      <NavLink
          to="/lobbies"
          exact
          className="nav-menu"
          activeStyle={{ background: "#F5F5F5" }}
      > Lobbies
      </NavLink>
      <NavLink
          to="/leaderboards"
          exact
          className="nav-menu"
          activeStyle={{ background: "#F5F5F5" }}
      > Leaderboards
      </NavLink>
    </div>
  )
}

export default Nav
