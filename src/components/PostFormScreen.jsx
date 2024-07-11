import React, { useState } from "react";
import { apiurl } from "../apiSource";
import { Editor } from "@tinymce/tinymce-react";

function PostFormScreen({ currentPost, navToPostList }) {
  const [title, setTitle] = useState(currentPost ? currentPost.title : "");
  const [subtitle, setSubtitle] = useState(
    currentPost ? currentPost.subtitle : ""
  );
  const [body, setBody] = useState(currentPost ? currentPost.body : "");
  const [published, setPublished] = useState(false);
  const [postErrors, setPostErrors] = useState([]);

  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handleSubtitle(e) {
    setSubtitle(e.target.value);
  }
  // function handleBody(e) {
  //   setBody(e.target.value);
  // }

  function handlePublished(e) {
    setPublished(!published);
  }

  async function updatePost(e) {
    e.preventDefault();
    const response = await fetch(apiurl + "posts/" + currentPost.id, {
      method: "PUT",
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

  async function deletePost(postID) {
    const response = await fetch(apiurl + "posts/" + postID, {
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
      navToPostList();
    }
  }

  return (
    <div className="screenPostForm page">
      <ul className="errorList">
        {postErrors.map((err) => {
          return <li key={postErrors.indexOf(err)}>{err.msg}</li>;
        })}
      </ul>

      <form
        className="postForm"
        onSubmit={currentPost ? updatePost : submitPost}
      >
        <label htmlFor="title">
          Title:
          <input
            name="title"
            type="text"
            id="title"
            minLength="1"
            maxLength="100"
            value={title}
            onChange={handleTitle}
          />
        </label>
        <label htmlFor="subtitle">
          Subtitle:
          <input
            name="subtitle"
            type="text"
            id="subtitle"
            minLength="1"
            maxLength="100"
            value={subtitle}
            onChange={handleSubtitle}
          />
        </label>

        <label htmlFor="body">
          Body:
          <Editor
            apiKey="xs92b2ibjkmggdla0j0fg6yoo308ij3et87tj8yzzds7b7ch"
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
              entity_encoding: "raw",
            }}
            name="body"
            type="textarea"
            id="body"
            minLength="1"
            maxLength="12000"
            value={body}
            onEditorChange={(newValue, editor) => setBody(newValue)}
          />
        </label>
        <div className="listToolbar">
          <label className='publishLabel' htmlFor="published">
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
        </div>
      </form>

      {currentPost ? (
        <button onClick={() => deletePost(currentPost._id)}>Delete post</button>
      ) : (
        <button onClick={navToPostList}>Cancel new post</button>
      )}
    </div>
  );
}

export default PostFormScreen;
