import React, { useEffect, useState } from "react";
import "./AddPostForm.css";
import CancelIcon from "@mui/icons-material/Cancel";

export const AddPostForm = ({ addNewBlogPost, handleAddFormHide }) => {
  const [postTitle, setPosTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");

  const handlePostTitleChange = (e) => {
    setPosTitle(e.target.value);
  };
  const handlePostDescriptionChange = (e) => {
    setPostDescription(e.target.value);
  };

  const createPost = (e) => {
    e.preventDefault();
    const post = {
      title: postTitle,
      description: postDescription,
      liked: false,
    };
    addNewBlogPost(post);
    handleAddFormHide();
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === `Escape`) {
        handleAddFormHide();
      }
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      console.log("unmount esc listener");
    };
  }, [handleAddFormHide]);

  function enterSubmit(e) {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      createPost();
    }
    return;
  }

  return (
    <>
      <form className="addPostForm" onSubmit={createPost} onKeyUp={enterSubmit}>
        <button onClick={handleAddFormHide} className="hideBtn">
          <CancelIcon />
        </button>
        <h2>Creating Post</h2>
        <div>
          <input
            className="addFormInput"
            type="text"
            name="postTitle"
            placeholder="type title"
            value={this.state.postTitle}
            onChange={handlePostTitleChange}
            required
          ></input>
        </div>
        <div>
          <textarea
            className="addFormInput"
            name="postDecription"
            id=""
            cols="30"
            rows="10"
            placeholder="type text"
            value={postDescription}
            onChange={handlePostDescriptionChange}
            required
          />
        </div>
        <div>
          <button className="blackBtn" type="submit">
            add post
          </button>
        </div>
      </form>
      <div className="overlay" onClick={handleAddFormHide}></div>
    </>
  );
};
