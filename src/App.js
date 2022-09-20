import React from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { gapi } from "gapi-script";
import { CLIENT_ID } from "./utils/apis/gapi";
import { Container } from "@material-ui/core";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import Posts from "./pages/Home/Posts";
import User from "./pages/Home/User";

const start = () => {
  gapi.client.init({
    clientId: CLIENT_ID,
    scope: "",
  });
};

gapi.load("client:auth2", start);

function App() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) return;
    navigate("/auth");
  }, [user, navigate]);
  return (
    <Container maxWidth={false} disableGutters={true} className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Navigate to={"/posts"} replace={true} />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/posts" element={<Posts />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Container>
  );
}

export default App;
