import { playlistConstants } from "./constants";

const initialState = {
  playlist: [],
  isPlaying: true,
  currentMusic: {
    imageUrl:
      "https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452",
    musicName: "Starboy",
    musicUrl: "https://www.youtube.com/watch?v=Ibpsqddlfdg",
    artistName: "The Weeknd",
    id: "123",
    duration: 231,
    elapsed: 0,
  },
};

export const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case playlistConstants.ADD_PLAYLIST:
      if (
        state.playlist.findIndex((item) => item.id === action.payload.id) >= 0
      )
        return state;

      const playlistAfterAddingNewItem = [...state.playlist, action.payload];
      localStorage.setItem(
        "playlist",
        JSON.stringify(playlistAfterAddingNewItem)
      );
      return {
        ...state,
        playlist: playlistAfterAddingNewItem,
      };
    case playlistConstants.REMOVE_PLAYLIST:
      const playlistAfterRemovingItem = state.playlist.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem(
        "playlist",
        JSON.stringify(playlistAfterRemovingItem)
      );
      return {
        ...state,
        playlist: playlistAfterRemovingItem,
      };
    case playlistConstants.SELECT_MUSIC:
      const currentMusic = action.payload;
      localStorage.setItem("currentMusic", JSON.stringify(currentMusic));
      return {
        ...state,
        isPlaying: true,
        currentMusic: currentMusic,
      };
    case playlistConstants.SET_PLAYING:
      return {
        ...state,
        isPlaying: action.payload,
      };
    case playlistConstants.SET_PLAYLIST:
      return {
        ...state,
        playlist: action.payload,
      };
    case playlistConstants.SET_ELAPSED:
      return {
        ...state,
        currentMusic: {
          ...state.currentMusic,
          elapsed: action.payload,
        },
      };

    default:
      return state;
  }
};
