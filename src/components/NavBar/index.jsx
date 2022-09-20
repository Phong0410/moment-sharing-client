import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Paper, Typography, Icon } from "@material-ui/core";
import { Collections, ExitToApp } from "@material-ui/icons";

import { logout } from "../../app/authSlice";
import useStyles from "./styles";

const NavBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    navigate("/auth");
    dispatch(logout());
  };

  if (user)
    return (
      <Container
        maxWidth={false}
        disableGutters={true}
        className={classes.navContainer}
      >
        <Paper elevation={3} square={true} className={classes.navPaper}>
          <Link to="/" className={classes.link}>
            <Typography variant="h1" className={classes.appName}>
              Moment
            </Typography>
            <Collections color="secondary" />
          </Link>

          <Link
            to={`/users/${user._id || user.googleId}`}
            className={classes.userContainer}
          >
            <Icon className={classes.userIcon}>{user?.name.charAt(0)}</Icon>
            <Typography>{user?.name}</Typography>
          </Link>

          <div className={classes.logoutContainer}>
            <Button
              color="secondary"
              variant="contained"
              onClick={handleLogout}
              className={classes.logoutBtn}
            >
              Logout
            </Button>
            <Button onClick={handleLogout} className={classes.logoutIcon}>
              <ExitToApp color="secondary" />
            </Button>
          </div>
        </Paper>
      </Container>
    );
};

export default NavBar;
