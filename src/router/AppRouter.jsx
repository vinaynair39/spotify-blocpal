import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { getTokenFromUrl } from "utils/spotifyAuth";
import { setSpotifyToken } from "store/auth/action";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Login from "Pages/Login";
import { loginUser } from "store/auth/action";
import Home from "Pages/Home";
import Playlist from "Pages/Playlist";


const AppRouter = () => {
  const dispatch = useDispatch();

  if (!!window.location?.hash) {
    //storing the spotify token into the store
    const token = getTokenFromUrl(window.location.hash);
    dispatch(loginUser());
    dispatch(
      setSpotifyToken({
        ...token,
        createdAt: Date.now(),
      })
    );
  }


  
  return (
    <Router>
      <Switch>
        <PublicRoute path="/login" exact component={Login} />
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/playlist" exact component={Playlist} />

        <PrivateRoute path="/playlist/:id" exact component={Playlist} />
      </Switch>
    </Router>
  );
};
export default AppRouter;
