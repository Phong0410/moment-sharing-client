import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { clearPostsByUser, getPosts } from "../../../app/postsSlice";
import Post from "../../../components/Post";

import useStyles from "./styles";

const Posts = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);

  useEffect(() => {
    dispatch(clearPostsByUser());
    dispatch(getPosts());
  }, []);

  return (
    <div>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress />
        </div>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </div>
  );
};

export default Posts;
