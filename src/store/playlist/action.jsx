import { playlistConstants } from "./constants";

export const addPlaylist = (playlist) => ({
  type: playlistConstants.ADD_PLAYLIST,
  payload: playlist,
});

export const removePlaylist = (id) => ({
  type: playlistConstants.REMOVE_PLAYLIST,
  payload: id,
});

export const setPlaying = (payload) => ({
  type: playlistConstants.SET_PLAYING,
  payload,
});

export const selectMusic = (payload) => ({
  type: playlistConstants.SELECT_MUSIC,
  payload,
});
export const setPlaylist = (payload) => ({
  type: playlistConstants.SET_PLAYLIST,
  payload,
});

export const setElapsed = (payload) => ({
  type: playlistConstants.SET_ELAPSED,
  payload,
});
