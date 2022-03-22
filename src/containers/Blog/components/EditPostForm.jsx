import React, { useEffect, useState } from "react";
import "./EditPostForm.css";
import CancelIcon from "@mui/icons-material/Cancel";

export const EditPostForm = ({
  handleEditFormHide,
  selectedPost,
  editBlogPost,
}) => {
  const [postTitle, setPosTitle] = useState(selectedPost.title);
  const [postDescription, setPostDescription] = useState(
    selectedPost.description
  );

  const handlePostTitleChange = (e) => {
    setPosTitle(e.target.value);
  };
  const handlePostDescriptionChange = (e) => {
    setPostDescription(e.target.value);
  };

  const savePost = (e) => {
/*     e.preventDefault();
________________________________________________

ПЕРЕСМОТРИ ПОЧЕМУ ЗДЕСЬ СТОИТ ЭТА ФУНКЦИЯ!!!!!!
_________________________________________________


 */    const post = {
      id: selectedPost.id,
      title: postTitle,
      description: postDescription,
      liked: selectedPost.liked,
    };
    editBlogPost(post);
    handleEditFormHide();
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === `Escape`) {
        handleEditFormHide();
      }
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      console.log("unmount esc listener");
    };
  }, [handleEditFormHide]);

  function enterSubmit(e) {
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      savePost();
    }
    return;
  }

  return (
    <>
      <form className="editPostForm" onSubmit={savePost} onKeyUp={enterSubmit}>
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
