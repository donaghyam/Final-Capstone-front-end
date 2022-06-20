import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const history = useHistory()
  return (
    <nav>
      {
        localStorage.getItem("auth_token") !== null ?
        <>
        <div id="logoutContainer">
          <button id="logoutButton" onClick={() => {
            localStorage.removeItem("auth_token")
            history.push({ pathname: "/" })
          }}>
            Logout
          </button>
          </div>
          <div id="titleContainer">
              <h1 id="title">
            <div id="hexContainer">
                <div className="hex" id="hex">
                  <div id="hContainer">
                  <p>H</p>
                  </div>
                </div>
            </div>
                <Link to="/" id="titleLink">
                  HOPS AND GRAIN
                </Link>
              </h1>
          </div>
          <div id="navContainer">
          <div className="navbar-item">
                <Link to="/recipes" className="navbar-link">Browse Recipes</Link>
          </div>
          <div className="navbar-item">
                <Link to="/createrecipe" className="navbar-link">Create Recipe</Link>
          </div>
          <div className="navbar-item">
                <Link to="/inventory" className="navbar-link">My inventory</Link>
          </div>
          <div className="navbar-item">
                <Link to="/mybrews" className="navbar-link">My Brews</Link>
          </div>
          </div>
          </>
          :
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
      }
    </nav>
  )
}
