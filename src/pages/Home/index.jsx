import { Container } from "@material-ui/core";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { create as createPost } from "../../app/postsSlice";
import NavBar from "../../components/NavBar";

import useStyles from "./styles";

const Home = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <>
      <NavBar />
      <Container maxWidth="xs" disableGutters className={classes.mainContainer}>
        <Outlet />
      </Container>
    </>
  );
};

export default Home;
