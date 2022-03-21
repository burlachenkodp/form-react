import React from "react";
import "./AddPostForm.css";
import CancelIcon from "@mui/icons-material/Cancel";

export class AddPostForm extends React.Component {
  state = {
    postTitle: "",
    postDescription: "",
  };
  handlePostTitleChange = (e) => {
    this.setState({
      postTitle: e.target.value,
    });
  };
  handlePostDescriptionChange = (e) => {
    this.setState({
      postDescription: e.target.value,
    });
  };

  createPost = (e) => {
    e.preventDefault();
    const post = {
      title: this.state.postTitle,
      description: this.state.postDescription,
      liked: false,
    };
    this.props.addNewBlogPost(post);
    this.props.handleAddFormHide();
  };

  handleSubmit = (e) => {
    if (
      e.key === `Enter` &&
      this.state.postTitle &&
      this.state.postDescription
    ) {
      this.createPost(e);
    }

    return console.log("type smth");
  };

  handleEscape = (e) => {
    if (e.key === `Escape`) {
      this.props.handleAddFormHide();
    }
  };

  componentDidMount() {
    console.log("нарисовалась форма");
    window.addEventListener(`keyup`, this.handleSubmit);
    window.addEventListener(`keyup`, this.handleEscape);
  }

  componentWillUnmount() {
    console.log("удалилась форма");
    window.removeEventListener(`keyup`, this.handleSubmit);
    window.removeEventListener(`keyup`, this.handleEscape);
  }
  render() {
    const handleAddFormHide = this.props.handleAddFormHide;
    return (
      <>
        <form className="addPostForm" onSubmit={this.createPost}>
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
              onChange={this.handlePostTitleChange}
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
              value={this.state.postDescription}
              onChange={this.handlePostDescriptionChange}
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
  }
}
