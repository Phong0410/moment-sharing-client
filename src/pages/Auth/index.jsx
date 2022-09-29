import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { login, register, googleLogin } from "../../app/authSlice";

import AuthInput from "../../components/AuthInput";
import Icon from "./Icon";

import useStyles from "./styles";
import { useEffect } from "react";

const initFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (user) navigate("/");
  }, [navigate, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegister) {
      dispatch(register(formData, navigate));
    } else {
      dispatch(login(formData, navigate));
    }
  };

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const switchMode = () => {
    setFormData({
      ...formData,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setIsRegister((prev) => !prev);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = await res?.profileObj;
    const token = await res?.tokenId;

    const user = {
      googleId: result.googleId,
      name: result.name,
      email: result.email,
    };

    try {
      dispatch(googleLogin({ user, token }));
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">
          {isRegister ? "Register" : "Login"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isRegister && (
              <>
                <AuthInput
                  name="firstName"
                  label="First name"
                  value={formData.firstName}
                  handleOnChange={handleOnChange}
                  autoFocus
                  half
                />
                <AuthInput
                  name="lastName"
                  label="Last name"
                  value={formData.lastName}
                  handleOnChange={handleOnChange}
                  half
                />
              </>
            )}
            <AuthInput
              name="email"
              label="Email address"
              value={formData.email}
              handleOnChange={handleOnChange}
              type="email"
            />
            <AuthInput
              name="password"
              label="Password"
              value={formData.password}
              handleOnChange={handleOnChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isRegister && (
              <AuthInput
                name="confirmPassword"
                label="Confirm password"
                value={formData.confirmPassword}
                handleOnChange={handleOnChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isRegister ? "Register" : "Login"}
          </Button>
          <GoogleLogin
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Login with Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isRegister ? "To Login" : "To Register"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
