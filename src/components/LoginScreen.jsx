import React, { useState } from "react";
import { apiurl } from "../apiSource";

function LoginScreen({
  email,
  password,
  handleEmail,
  handlePassword,
  setCurrentUser,
  navToPostList,
  setLoggedIn,
}) {
  const [invalidLogin, setInvalidLogin] = useState(false);
  // TODO - Add fetch for login
  async function submitLogin(e) {
    e.preventDefault();
    const response = await fetch(apiurl + "users/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });
    if (response.status != 200) {
      setInvalidLogin(true);
    } else {
      const loginResponse = await response.json();
      if (loginResponse.isAuthor !== true) {
        setInvalidLogin(true);
      } else {
        localStorage.setItem("username", loginResponse.username);
        localStorage.setItem("id", loginResponse.id);
        localStorage.setItem("token", `Bearer ${loginResponse.token}`);
        setCurrentUser(loginResponse.username);
        setInvalidLogin(false);
        setLoggedIn(true);
        navToPostList();
      }
    }
  }
  return (
    <div className="screenLogin page">
      Log In
      {invalidLogin && <p>Incorrect email / password. Please try again.</p>}
      <form className="userForm" onSubmit={submitLogin}>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            type="text"
            id="email"
            value={email}
            onChange={handleEmail}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default LoginScreen;
