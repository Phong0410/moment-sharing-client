import React from "react";
import moment from "moment";
import { Paper, Typography, Icon } from "@material-ui/core";
import { ThumbUpAlt, ThumbUpAltOutlined, Delete } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost, likePost } from "../../app/postsSlice";

import useStyles from "./styles";
import { useCallback } from "react";

const Post = ({ post, deletable }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userId = useSelector(
    (state) => state.auth?.user.googleId || state.auth?.user._id
  );

  const handleLike = useCallback(
    () => dispatch(likePost({ id: post._id })),
    []
  );

  const handleDelete = useCallback(
    () => dispatch(deletePost({ id: post._id })),
    []
  );

  return (
    <Paper elevation={3} className={classes.container}>
      <div className={classes.user}>
        <Link to={`/users/${post.creator}`} className={classes.userLink}>
          <Icon className={classes.icon}>{post.name.charAt(0)}</Icon>
          <Typography>{post.name}</Typography>
        </Link>
        <Typography className={classes.createAt}>
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.message}>
        <Typography>{post.message}</Typography>
      </div>
      <div className={classes.image}>
        <img src={post.image} alt={post.createAt} />
      </div>
      <div className={classes.actions}>
        {post.likes.includes(userId) ? (
          <ThumbUpAlt onClick={handleLike} className={classes.likeIcon} />
        ) : (
          <ThumbUpAltOutlined
            onClick={handleLike}
            className={classes.likeIcon}
          />
        )}
        <Typography>{`Like${post.likes.length > 1 ? "s" : ""} ${
          post.likes.length
        }`}</Typography>
        {deletable && (
          <Delete onClick={handleDelete} className={classes.deleteIcon} />
        )}
      </div>
    </Paper>
  );
};

export default React.memo(Post);
