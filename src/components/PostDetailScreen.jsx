import React, { useState, useEffect } from "react";
import { apiurl } from "../apiSource";

function PostDetailScreen({ currentPost, currentUser, navToPostDetail }) {
  const [commentsList, setCommentsList] = useState([]);
  const [commentErrors, setCommentErrors] = useState([]);
  const [commentBody, setCommentBody] = useState("");

  function handleCommentBody(e) {
    setCommentBody(e.target.value);
  }

  async function submitComment(e) {
    e.preventDefault();
    const response = await fetch(apiurl + "comments/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        body: commentBody,
        user: localStorage.getItem("id"),
        post: currentPost.id,
      }),
    });
    const commentResponse = await response.json();
    if (Array.isArray(commentResponse)) {
      setCommentErrors(commentResponse);
    } else {
      commentResponse.user.username = currentUser;
      setCommentsList([...commentsList, commentResponse]);
      setCommentBody("");
    }
  }

  async function deleteComment(commentID) {
    const response = await fetch(apiurl + "comments/" + commentID, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    });
    const deleteResponse = await response.json();
    if (deleteResponse.status == 403) {
      console.log("Delete action forbidden");
    } else {
      setCommentsList(
        commentsList.filter((comment) => comment._id !== commentID)
      );
    }
  }

  useEffect(() => {
    fetch(apiurl + `posts/${currentPost.id}/comments`, {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Comments fetch error");
        }
        return response.json();
      })
      .then((response) => setCommentsList(response))
      .catch((error) => setError(error));
  }, []);

  return (
    <div className="screenPostDetail page">
      <h2>{currentPost.title} </h2>
      <h3>{currentPost.subtitle}</h3>
      <p>By {currentPost.user.full_name}</p>
      <p>Originally written: {new Date(currentPost.createdAt).toUTCString()}</p>
      <p>Last updated: {new Date(currentPost.updatedAt).toUTCString()}</p>
      <p>{currentPost.body}</p>

      <p>Discussion:</p>

      {currentUser ? (
        <form onSubmit={submitComment}>
          <label htmlFor="commentBody">
            Comment:
            <textarea
              name="commentBody"
              id="commentBody"
              type="text"
              minLength="1"
              maxLength="500"
              rows="6"
              placeholder="Max 500 characters"
              value={commentBody}
              onChange={handleCommentBody}
              required
            ></textarea>
          </label>
          <button>Submit</button>
        </form>
      ) : (
        <div>Sign in to post a comment.</div>
      )}

      <ul>
        {commentsList.map((comment) => {
          return (
            <li key={comment._id} className="commentLI">
              <p>{comment.user.username}</p>
              <p>{new Date(comment.timestamp).toUTCString()}</p>
              <p>{comment.body}</p>
              {currentUser && localStorage.getItem("id") == comment.user.id && (
                <button onClick={() => deleteComment(comment._id)}>
                  Delete
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PostDetailScreen;
