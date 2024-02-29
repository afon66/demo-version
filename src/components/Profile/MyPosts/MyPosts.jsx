import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import AddPostSubmit from "./addPostSubmit/AddPostSubmit";

const MyPosts = (props) => {
  let postsElements = props.posts.map((p) => (
    <Post message={p.message} likesCount={p.likesCount} />
  ));

  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <AddPostSubmit addPost={props.addPost} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
