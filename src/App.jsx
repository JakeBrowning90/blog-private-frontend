import { useState } from "react";
import LoginScreen from "./components/LoginScreen";
import SignupScreen from "./components/SignupScreen";
import PostListScreen from "./components/PostListScreen";
import PostDetailScreen from "./components/PostDetailScreen";
import PostFormScreen from "./components/PostFormScreen";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [viewLogin, setViewLogin] = useState(true);
  const [viewSignup, setViewSignup] = useState(false);
  const [viewPostList, setViewPostList] = useState(false);
  const [viewPostDetail, setViewPostDetail] = useState(false);
  const [viewPostForm, setViewPostForm] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [currentPost, setCurrentPost] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  const navToLogin = () => {
    setViewLogin(true);
    setViewSignup(false);
    setViewPostList(false);
    setViewPostDetail(false);
    setViewPostForm(false);
  };

  const navToSignup = () => {
    setViewLogin(false);
    setViewSignup(true);
    setViewPostList(false);
    setViewPostDetail(false);
    setViewPostForm(false);
  };

  const navToPostList = () => {
    setViewLogin(false);
    setViewSignup(false);
    setViewPostList(true);
    setViewPostDetail(false);
    setViewPostForm(false);
  };

  const navToPostDetail = () => {
    setViewLogin(false);
    setViewSignup(false);
    setViewPostList(false);
    setViewPostDetail(true);
    setViewPostForm(false);
  };
  const navToPostForm = () => {
    setViewLogin(false);
    setViewSignup(false);
    setViewPostList(false);
    setViewPostDetail(false);
    setViewPostForm(true);
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
      {viewPostList && (
        <PostListScreen
          setCurrentPost={setCurrentPost}
          navToPostDetail={navToPostDetail}
          navToPostForm={navToPostForm}
        />
      )}
      {viewPostDetail && (
        <PostDetailScreen
          currentPost={currentPost}
          currentUser={currentUser}
          navToPostDetail={navToPostDetail}
        />
      )}
      {viewPostForm && (
        <PostFormScreen
          currentPost={currentPost}
          navToPostList={navToPostList}
        />
      )}
    </>
  );
}

export default App;
