import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import MusicPlayer from "components/MusicPlayer";
import { spotify } from "index";
import Column from "components/Column";
import { addPlaylist } from "store/playlist/action";
import { removePlaylist } from "store/playlist/action";
import { logoutUser } from "store/auth/action";
import "./Home.scss";

const Home = () => {
  const { currentMusic = {}, isPlaying = false, playlist = [] } = useSelector(
    (state) => state.playlist
  );

  const [state, setState] = useState({
    items: { "column-1": playlist, "column-2": [] },
  });
  const spotifyToken = useSelector((state) => state.auth.spotifyToken);

  const dispatch = useDispatch();

  useEffect(() => {
    // set the token to the spotify library
    spotify.setAccessToken(spotifyToken.access_token);
  }, [spotifyToken]);

  useEffect(() => {
    getPlaylists();
  }, []);

  async function getPlaylists() {
    spotify.getFeaturedPlaylists().then(({ playlists }) => {
      const filteredPlaylists = playlists.items.filter((playlistFromSpotify) =>{ 
        return playlist.findIndex((playlistFromRedux) => playlistFromRedux.id === playlistFromSpotify.id) === -1
      })
      setState({ items: { ...state.items, "column-2": filteredPlaylists } });
    });
  }

  const handleLogout = () => dispatch(logoutUser())

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  function onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      if (destination.index === source.index) {
        return;
      }

      const items = reorder(
        state.items[source.droppableId],
        source.index,
        destination.index
      );

      const updateState = {
        items: {
          ...state.items,
          [source.droppableId]: items,
        },
      };

      setState(updateState);
    } else {
      const startColumn = [...state.items[source.droppableId]];
      const finishColumn = [...state.items[destination.droppableId]];
      const [removed] = startColumn.splice(source.index, 1);
      if (destination.droppableId === "column-1")
        dispatch(addPlaylist(removed));
      else dispatch(removePlaylist(removed.id));
      finishColumn.splice(destination.index, 0, removed);

      const updateState = {
        items: {
          ...state.items,
          [source.droppableId]: startColumn,
          [destination.droppableId]: finishColumn,
        },
      };
      setState(updateState);
    }
  }

  return (
    <div className="home">
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          <Column items={state.items["column-1"]} droppableId="column-1" title={"Your Favourite Playlists"} />
          <Column items={state.items["column-2"]} droppableId="column-2" title={"From Spotify"}/>
        </div>
      </DragDropContext>

      <div className="musicPlayer">
        <MusicPlayer {...currentMusic} isPlaying={isPlaying} />
      </div>
    </div>
  );
};

export default Home;
