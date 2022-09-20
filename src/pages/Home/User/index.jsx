import React, { useEffect } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { clearPostsByUser, getPostsByUser } from "../../../app/postsSlice";
import Form from "../../../components/Form";
import Post from "../../../components/Post";

import useStyles from "./styles";

const User = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { id } = useParams();
  const userId = useSelector(
    (state) => state.auth?.user._id || state.auth?.user.googleId
  );
  const postsByUser = useSelector((state) => state.posts.postsByUser);
  const loading = useSelector((state) => state.posts.loading);

  useEffect(() => {
    dispatch(clearPostsByUser());
    dispatch(getPostsByUser({ id }));
  }, [id]);

  const deletable = useMemo(() => id === userId, [id, userId]);

  return (
    <div>
      <div style={{ marginBottom: "8px" }}>{userId === id && <Form />}</div>
      <div>
        {loading ? (
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        ) : (
          postsByUser.map((post) => (
            <Post key={post._id} post={post} deletable={deletable} />
          ))
        )}
      </div>
    </div>
  );
};

export default User;
