import React, { useState } from "react";
import { apiurl } from "../apiSource";

function PostFormScreen({ navToPostList }) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [body, setBody] = useState("");
  const [published, setPublished] = useState(false);
  const [postErrors, setPostErrors] = useState([]);

  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handleSubtitle(e) {
    setSubtitle(e.target.value);
  }
  function handleBody(e) {
    setBody(e.target.value);
  }

  function handlePublished(e) {
    setPublished(!published);
  }

  async function submitPost(e) {
    e.preventDefault();
    const response = await fetch(apiurl + "posts/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        subtitle: subtitle,
        body: body,
        user: localStorage.getItem("id"),
        is_published: published,
      }),
    });
    const postResponse = await response.json();
    if (Array.isArray(postResponse)) {
      setPostErrors(postResponse);
    } else {
      navToPostList();
    }
  }

  return (
    <div className="screenPostForm page">
      <form className="postForm" onSubmit={submitPost}>
        <label htmlFor="">
          Title:
          <input
            name="title"
            type="text"
            id="title"
            value={title}
            onChange={handleTitle}
          />
        </label>
        <label htmlFor="">
          Subtitle:
          <input
            name="subtitle"
            type="text"
            id="subtitle"
            value={subtitle}
            onChange={handleSubtitle}
          />
        </label>

        <label htmlFor="">
          Body:
          <textarea
            name="body"
            type="text"
            id="body"
            value={body}
            onChange={handleBody}
          />
        </label>

        <label htmlFor="">
          Publish:
          <input
            name="published"
            type="checkbox"
            id="published"
            value={published}
            onChange={handlePublished}
          />
        </label>
        <button>Save changes</button>
      </form>

      <button>Delete post</button>
    </div>
  );
}

export default PostFormScreen;
