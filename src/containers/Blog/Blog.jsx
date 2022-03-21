import axios from "axios";
import React from "react";
import "./Blog.css";
import { AddPostForm } from "./components/AddPostForm";
import { BlogCard } from "./components/BlogCard";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { EditPostForm } from "./components/EditPostForm";
import { postsUrl } from "../../shared/projectData";

let source = axios.CancelToken.source();
export class Blog extends React.Component {
  state = {
    showAddForm: false,
    showEditForm: false,
    blogArr: [],
    isPending: false,
    selectedPost: {},
  };

  fetchPosts = () => {
    source = axios.CancelToken.source();
    axios
      .get(postsUrl, { cancelToken: source.token })
      .then((response) => {
        console.log(response.data);
        this.setState({
          blogArr: response.data,
          isPending: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  componentDidMount() {
    this.fetchPosts();
  }
  componentWillUnmount() {
    if (source) {
      source.cancel(`отменил`);
    }
  }

  likePost = (blogPost) => {
    const temp = { ...blogPost };
    temp.liked = !temp.liked;
    axios
      .put(`${postsUrl}${blogPost.id}`, temp)
      .then((response) => {
        this.fetchPosts();
        console.log("пост изменился=>", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deletePost = (blogPost) => {
    if (window.confirm(`удалить ${blogPost.title}?`)) {
      this.setState({
        isPending: true,
      });
      axios
        .delete(`${postsUrl}${blogPost.id}`)
        .then((response) => {
          this.fetchPosts();
          console.log("пост удалён =>", response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  addNewBlogPost = (blogPost) => {
    this.setState({
      isPending: true,
    });
    axios
      .post(postsUrl, blogPost)
      .then((response) => {
        console.log(`Пост создан=>`, response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  editBlogPost = (updatedBlogpost) => {
    this.setState({
      isPending: true,
    });
    axios
      .put(`${postsUrl}${updatedBlogpost.id}`, updatedBlogpost)
      .then((response) => {
        console.log(`Пост изменен=>`, response.data);
        this.fetchPosts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleAddFormShow = () => {
    this.setState({
      showAddForm: true,
    });
  };

  handleAddFormHide = () => {
    this.setState({
      showAddForm: false,
    });
  };
  handleEditFormShow = () => {
    this.setState({
      showEditForm: true,
    });
  };
  handleEditFormHide = () => {
    this.setState({
      showEditForm: false,
    });
  };

  handleSelectedPost = (blogPost) => {
    this.setState({
      selectedPost: blogPost,
    });
  };

  render() {
    const blogPosts = this.state.blogArr.map((item, pos) => {
      return (
        <BlogCard
          key={item.id}
          title={item.title}
          description={item.description}
          liked={item.liked}
          likePost={() => this.likePost(item)}
          deletePost={() => this.deletePost(item)}
          handleEditFormShow={this.handleEditFormShow}
          handleSelectedPost={() => this.handleSelectedPost(item)}
        />
      );
    });

    if (this.state.blogArr.length === 0) return <h1>Loading data...</h1>;

    const postsOpacity = this.state.isPending ? 0.5 : 1;
    return (
      <div className="blogPage">
        {this.state.showAddForm ? (
          <AddPostForm
            blogArr={this.state.blogArr}
            addNewBlogPost={this.addNewBlogPost}
            handleAddFormHide={this.handleAddFormHide}
          />
        ) : null}
        {this.state.showEditForm ? (
          <EditPostForm
            handleEditFormHide={this.handleEditFormHide}
            selectedPost={this.state.selectedPost}
            editBlogPost={this.editBlogPost}
          />
        ) : null}

        <>
          <h1>BLOG</h1>
          <div className="addNewPost">
            <button className="blackBtn" onClick={this.handleAddFormShow}>
              Создать пост
            </button>
          </div>

          <div className="posts" style={{ opacity: postsOpacity }}>
            {blogPosts}
          </div>
          {this.state.isPending && (
            <Box sx={{ display: "flex" }} className="preloader">
              <CircularProgress />
            </Box>
          )}
        </>
      </div>
    );
  }
}
