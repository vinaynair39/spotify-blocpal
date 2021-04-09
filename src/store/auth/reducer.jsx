import { authConstants } from "./constants";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: {},
  spotifyToken: {
    access_token: "",
    expires_in: "",
    token_type: "",
    createdAt: 0,
  },
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
      };
    case authConstants.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        spotifyToken: {
          access_token: "",
          expires_in: "",
          token_type: "",
          createdAt: 0,
        },
      };
    case authConstants.SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case authConstants.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case authConstants.SET_SPOTIFY_TOKEN:
      const spotifyToken = action.payload;
      localStorage.setItem("spotifyToken", JSON.stringify(spotifyToken));
      return {
        ...state,
        spotifyToken,
      };
    case authConstants.SET_UNLOADING:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};
