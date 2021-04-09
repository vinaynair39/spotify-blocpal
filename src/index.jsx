import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import reportWebVitals from "./reportWebVitals";
import SpotifyWebApi from "spotify-web-api-js";
import "./styles/index.scss";
import AppRouter from "router/AppRouter";
import { validObject } from "utils/validObject";
import { setSpotifyToken } from "store/auth/action";
import { loginUser } from "store/auth/action";
import { setPlaylist } from "store/playlist/action";
import { selectMusic } from "store/playlist/action";
import { logoutUser } from "store/auth/action";

export const spotify = new SpotifyWebApi();


if(store.getState().playlist?.playlist?.length === 0){
  store.dispatch(setPlaylist(JSON.parse(localStorage.getItem('playlist')) ?? []))
}

const lastPlayedMusic = JSON.parse(localStorage.getItem('currentMusic')) ?? {}
console.log(lastPlayedMusic)
if(validObject(lastPlayedMusic)) store.dispatch(selectMusic(lastPlayedMusic))


async function checkAuthState() {
  try {
    if (!validObject(store.getState().auth?.spotifyToken?.access_token)) {
      const spotifyToken = JSON.parse(localStorage.getItem("spotifyToken"));
      if (Date.now() > spotifyToken.createdAt + 3500000) {
        localStorage.removeItem("spotifyToken");
      } else {
        if (validObject(spotifyToken)) {
          store.dispatch(loginUser());
          store.dispatch(setSpotifyToken(spotifyToken));
        }
      }
    } else {
      if (Date.now() > store.getState().auth.spotifyToken.createdAt + 3500000) {
        store.dispatch(logoutUser());
        store.dispatch(setSpotifyToken({}));
      }
    }
  } catch (err) {}
}

checkAuthState();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
