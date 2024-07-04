import React, { useState, useEffect } from "react";
import { apiurl } from "../apiSource";

function PostListScreen({ setCurrentPost, navToPostDetail, navToPostForm }) {
  const [postList, setPostList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [currentPost, setCurrentPost] = useState("");

  const loadPostDetail = post => {
    setCurrentPost(post);
    navToPostDetail();
  };

  const loadPostForm = (post) => {
    setCurrentPost(post);
    navToPostForm();
  };

  useEffect(() => {
    fetch(apiurl + "posts/all", {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Post fetch error");
        }
        return response.json();
      })
      .then((response) => setPostList(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;

  return (
    <div className="screenPostList page">
      Post List
      <button onClick={() => loadPostForm()}>Write New Post</button>
      {postList.length == 0 ? (
        <p>There are no published posts.</p>
      ) : (
        <ul className="postList">
          {postList.map((post) => {
            return (
              <li key={post.id} className="postPreview">
                <h2 onClick={() => loadPostDetail(post)}>{post.title} </h2>

                <h3>{post.subtitle}</h3>
                <p>By {post.user.full_name}</p>
                <p>
                  Originally written: {new Date(post.createdAt).toUTCString()}
                </p>
                <p>Last updated: {new Date(post.updatedAt).toUTCString()}</p>
                {post.is_published ? <p>Published</p> : <p>Unpublished</p>}
                <button onClick={() => loadPostForm(post)}>Manage post</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default PostListScreen;
