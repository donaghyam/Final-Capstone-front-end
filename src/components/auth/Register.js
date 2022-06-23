import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { registerUser } from "./AuthManager"
import './Auth.css'
import { Header, SubHeader } from "../styles/Text.style"
import { ContentContainer, MainContent, RecipeCard } from "../styles/Containers.style"
// TODO: This should get you started on registering a new user. 
// Add new fields depending on your server side registration
export const Register = () => {
  const username = useRef()
  const password = useRef()
  const history = useHistory()

  const handleRegister = (e) => {
    e.preventDefault()

    const newUser = {
      "username": username.current.value,
      "password": password.current.value
    }

    registerUser(newUser).then(res => {
      if ("token" in res) {
        localStorage.setItem("auth_token", res.token)
        history.push("/")
      }
    })
  }

return (
  <main>
    <div id="titleContainer">
            <h1 id="title">
            <div id="hexContainer">
                <div className="hex" id="hex">
                  <div id="hContainer">
                  <p>H</p>
                  </div>
                </div>
            </div>
                <Link to="/login" id="titleLink">
                  HOPS AND GRAIN
                </Link>
              </h1>
          </div>
          <div id="navBorder"></div>
          <div id="navContainer">
          <div className="navbar-item">
                <div id="defaultNav"></div>
          </div>
      </div>
    <ContentContainer>
      <MainContent>
        <div id="registerContainer">
        <form onSubmit={handleRegister}>
          <Header>Register an account</Header>
          <fieldset id="loginFieldset">
            <label htmlFor="inputUsername">Username</label>
            <input ref={username} type="text" name="username" placeholder="Username" required />
          </fieldset>
          <fieldset id="loginFieldset">
            <label htmlFor="inputPassword"> Password </label>
            <input ref={password} type="password" name="password" placeholder="Password" required />
          </fieldset>
          <fieldset id="loginFieldset">
            <div id="registerButtonContainer">
            <button type="submit" id="registerButton">Register</button>
            </div>
          </fieldset>
        <div id="loginLinkContainer">
          <div id="registeredText">
            <p>Already registered?</p>
          </div>
        </div>
          <div id="loginLink">
            <Link id="loginLink" to="/login">Login</Link>
          </div>
        </form>
        </div>
      </MainContent>
  </ContentContainer>
  </main>
)
}
