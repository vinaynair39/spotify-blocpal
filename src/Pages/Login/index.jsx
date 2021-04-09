import React from "react";
import destiny from "assets/ai.gif";
import { loginUrl } from "utils/spotifyAuth";

import "./Login.scss";

const Login = () => {
  return (
    <div className="login">
      <img src={destiny} alt="ai" className="gif" />
      <h1 className="title">Spotify for Blocpal</h1>
      <a className="login-button" href={loginUrl}>LOGIN WITH SPOTIFY</a>
    </div>
  );
};
export default Login;
