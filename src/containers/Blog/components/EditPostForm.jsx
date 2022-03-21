import React, { useEffect, useState } from "react";
import "./EditPostForm.css";
import CancelIcon from "@mui/icons-material/Cancel";

export const EditPostForm = (props) => {
  const [postTitle, setPosTitle] = useState(props.selectedPost.title);
  const [postDescription, setPostDescription] = useState(
    props.selectedPost.description
  );
/* { handleEditFormHide, 
selectedPost, } */
  const handlePostTitleChange = (e) => {
    setPosTitle(e.target.value);
  };
  const handlePostDescriptionChange = (e) => {
    setPostDescription(e.target.value);
  };

  const savePost = (e) => {
    e.preventDefault();
    const post = {
      id: props.selectedPost.id,
      title: postTitle,
      description: postDescription,
      liked: props.selectedPost.liked,
    };
    props.editBlogPost(post);
    props.handleEditFormHide();
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === `Escape`) {
        props.handleEditFormHide();
      }
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [props]);

  useEffect(() => {
    const handleSubmit = (e) => {
      if (e.key === "Enter" || e.key === "NumpadEnter") {
        e.preventDefault();
        props.handleEditFormHide();
      }
    };
    document.addEventListener("keydown", handleSubmit);
    return () => {
      document.removeEventListener("keydown", handleSubmit);
    };
  }, [props]);

 

  const handleEditFormHide = props.handleEditFormHide;
  return (
    <>
      <form className="editPostForm" onSubmit={savePost}>
        <button onClick={handleEditFormHide} className="hideBtn">
          <CancelIcon />
        </button>
        <h2>Editing post</h2>
        <div>
          <input
            className="editFormInput"
            type="text"
            name="postTitle"
            placeholder="type title"
            value={postTitle}
            onChange={handlePostTitleChange}
            required
          ></input>
        </div>
        <div>
          <textarea
            className="editFormInput"
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
            save post
          </button>
        </div>
      </form>
      <div className="overlay" onClick={handleEditFormHide}></div>
    </>
  );
};
