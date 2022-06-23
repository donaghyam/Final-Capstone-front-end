import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { ContentContainer, MainContent } from "../styles/Containers.style"
import "./Auth.css"
import { loginUser } from "./AuthManager"


export const Login = () => {
  const username = useRef()
  const password = useRef()
  const invalidDialog = useRef()
  const history = useHistory()

  const handleLogin = (e) => {
    e.preventDefault()
    const user = {
      username: username.current.value,
      password: password.current.value
    }

    loginUser(user)
      .then(res => {
        if ("valid" in res && res.valid && "token" in res) {
          localStorage.setItem("auth_token", res.token)
          history.push("/")
        }
        else {
          invalidDialog.current.showModal()
        }
      })
  }

  return (
    <main >
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
      <dialog ref={invalidDialog}>
        <div>Username or password was not valid.</div>
        <button onClick={e => invalidDialog.current.close()}>Close</button>
      </dialog>
      <section>
        <form onSubmit={handleLogin}>
          <fieldset id="loginFieldset">
            <label htmlFor="inputUsername"> Username</label>
            <input ref={username} type="username" id="username" placeholder="Username address" required autoFocus />
          </fieldset>
          <fieldset id="loginFieldset">
            <label htmlFor="inputPassword"> Password </label>
            <input ref={password} type="password" id="password" placeholder="Password" required />
          </fieldset>
          <fieldset id="loginFieldset">
          <div id="registerButtonContainer">
            <button type="submit">Sign In</button>
          </div>
          </fieldset>
        </form>
      </section>
      <section>
      <div id="loginLinkContainer">
          <div id="registeredText">
        <Link to="/register">Not a member yet?</Link>
        </div>
        </div>
      </section>
      </MainContent>
      </ContentContainer>
    </main>
  )
}
