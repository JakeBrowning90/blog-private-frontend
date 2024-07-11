import React, { useState, useEffect } from "react";
import { apiurl } from "../apiSource";

function PostListScreen({ setCurrentPost, navToPostDetail, navToPostForm }) {
  const [postList, setPostList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadPostDetail = (post) => {
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
                <p>By {post.user.username}</p>
                <p>First posted: {new Date(post.createdAt).toUTCString()}</p>
                <p>Last update: {new Date(post.updatedAt).toUTCString()}</p>
                <div className="listToolbar">
                  {post.is_published ? (
                    <p className="status published">Published</p>
                  ) : (
                    <p className="status unpublished">Unpublished</p>
                  )}
                  <button className='manageButton' onClick={() => loadPostForm(post)}>
                    Manage post
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default PostListScreen;
