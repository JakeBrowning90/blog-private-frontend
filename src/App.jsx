import { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import PostListScreen from "./components/PostListScreen";
import PostDetailScreen from "./components/PostDetailScreen";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [viewLogin, setViewLogin] = useState(false);
  const [viewSignup, setViewSignup] = useState(false);
  const [viewPostList, setViewPostList] = useState(true);
  const [viewPostDetail, setViewPostDetail] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [currentPost, setCurrentPost] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  const navToLogin = () => {
    setViewLogin(true);
    setViewSignup(false);
    setViewPostList(false);
    setViewPostDetail(false);
  };

  const navToSignup = () => {
    setViewLogin(false);
    setViewSignup(true);
    setViewPostList(false);
    setViewPostDetail(false);
  };

  const navToPostList = () => {
    setViewLogin(false);
    setViewSignup(false);
    setViewPostList(true);
    setViewPostDetail(false);
  };

  const navToPostDetail = () => {
    setViewLogin(false);
    setViewSignup(false);
    setViewPostList(false);
    setViewPostDetail(true);
  };

  const logOut = () => {
    setLoggedIn(false);
    setCurrentUser("");
    setEmail("");
    setPassword("");
    localStorage.clear();
  };

  if (!loggedIn) {
    return (
      <>
        <header>
          <div onClick={navToPostList}>Home</div>
          {currentUser ? (
            <nav>
              <div>{currentUser}</div>
              <div onClick={logOut}>Logout</div>
            </nav>
          ) : (
            <nav>
              {/* <div>Visitor</div>
              <div onClick={navToLogin}>Log in</div>
              <div onClick={navToSignup}>Sign up</div> */}
              Writer Access
            </nav>
          )}
        </header>
        <LoginScreen
          email={email}
          password={password}
          handleEmail={handleEmail}
          handlePassword={handlePassword}
          setCurrentUser={setCurrentUser}
          navToPostList={navToPostList}
          setLoggedIn={setLoggedIn}
        />
      </>
    );
  }

  return (
    <>
      <header>
        <div onClick={navToPostList}>Home</div>
        {currentUser ? (
          <nav>
            <div>{currentUser}</div>
            <div onClick={logOut}>Logout</div>
          </nav>
        ) : (
          <nav>
            <div>Visitor</div>
            <div onClick={navToLogin}>Log in</div>
            <div onClick={navToSignup}>Sign up</div>
          </nav>
        )}
      </header>
      {/* {viewLogin && (
        <LoginScreen
          email={email}
          password={password}
          handleEmail={handleEmail}
          handlePassword={handlePassword}
          setCurrentUser={setCurrentUser}
          navToPostList={navToPostList}
        />
      )} */}
      {viewSignup && (
        <SignupScreen
          username={username}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          handleUsername={handleUsername}
          handleEmail={handleEmail}
          handlePassword={handlePassword}
          handleConfirmPassword={handleConfirmPassword}
          navToLogin={navToLogin}
        />
      )}
      {viewPostList && (
        <PostListScreen
          // currentPost={currentPost}
          setCurrentPost={setCurrentPost}
          navToPostDetail={navToPostDetail}
        />
      )}
      {viewPostDetail && (
        <PostDetailScreen
          currentPost={currentPost}
          currentUser={currentUser}
          navToPostDetail={navToPostDetail}
        />
      )}
    </>
  );
}

export default App;
