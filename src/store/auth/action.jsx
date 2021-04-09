import { authConstants } from "./constants";

export const loginUser = () =>
  ({
    type: authConstants.LOGIN,
  });
  
  export const logoutUser = () =>
  ({
    type: authConstants.LOGOUT,
  });

export const setLoading = () =>
  ({
    type: authConstants.SET_LOADING,
  });

export const setUnloading = () =>
  ({
    type: authConstants.SET_UNLOADING,
  });

export const setUser = (user) =>
  ({
    type: authConstants.SET_USER,
    payload: user,
  });

export const setSpotifyToken = (payload) =>
  ({
    type: authConstants.SET_SPOTIFY_TOKEN,
    payload,
  });
