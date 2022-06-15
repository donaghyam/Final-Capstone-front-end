import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const history = useHistory()
  return (
    <nav>
      <Link to="/">Home</Link>
      {
        localStorage.getItem("auth_token") !== null ?
          <button onClick={() => {
            localStorage.removeItem("auth_token")
            history.push({ pathname: "/" })
          }}>
            Logout
          </button>
          :
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <div className="navbar-item">
                  <Link to="/recipes" className="navbar-item">Recipes</Link>
            </div>
            <div className="navbar-item">
                  <Link to="/createrecipe" className="navbar-item">Create Recipe</Link>
            </div>
            <div className="navbar-item">
                  <Link to="/inventory" className="navbar-item">My inventory</Link>
            </div>
            <div className="navbar-item">
                  <Link to="/mybrews" className="navbar-item">My Brews</Link>
            </div>
          </>
      }
    </nav>
  )
}
