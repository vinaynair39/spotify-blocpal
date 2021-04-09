import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Card from "components/Card";
import MusicPlayer from "components/MusicPlayer";
import { selectMusic } from "store/playlist/action";
import {ReactComponent as Home} from 'assets/home.svg';
import { spotify } from "index";
import "./Playlist.scss";

const numOfCards = 12;
const Playlist = () => {
  const { id } = useParams();
  const [playlists, setPlaylists] = useState([]);
  const [sequence, setSequence] = useState({
    minValue: 0,
    maxValue: numOfCards,
  });

  const { currentMusic, isPlaying } = useSelector((state) => state.playlist);
  const spotifyToken = useSelector((state) => state.auth.spotifyToken);

  const dispatch = useDispatch();

  useEffect(() => {
    // set the token to the spotify library
    spotify.setAccessToken(spotifyToken.access_token);
  }, [spotifyToken]);

  async function getMusicFromPlaylist() {
    spotify.getPlaylist(id).then(({ tracks }) => {
      setPlaylists(tracks.items);
    });
  }

  const handleNext = () => {
    setSequence({
      minValue: sequence.maxValue,
      maxValue:
        sequence.maxValue + numOfCards < playlists.length
          ? sequence.maxValue + numOfCards
          : playlists.length - 1,
    });
  };

  const handlePrevious = () => {
    setSequence({
      minValue:
        sequence.minValue - numOfCards > 0 ? sequence.minValue - numOfCards : 0,
      maxValue: sequence.minValue,
    });
  };

  const getMusicUrl = async (item) => {
    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${item.track.name}audio&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    );
    const id = data.items[0].id.videoId;
    const musicUrl = `https://www.youtube.com/watch?v=${id}`;
    dispatch(
      selectMusic({
        imageUrl: item?.track?.album?.images[0]?.url,
        musicName: item?.track?.name,
        musicUrl,
        artistName: item?.track?.artists[0]?.name,
        id: id,
        duration: Math?.ceil(item.track.duration_ms / 1000),
      })
    );
  };

  useEffect(() => {
    getMusicFromPlaylist();
  }, []);

  useEffect(() => {
    // set the token to the spotify library
    spotify.setAccessToken(spotifyToken.access_token);
  }, [spotifyToken]);

  console.log(playlists);

  return (
    <div className="playlist">
      <Link to="/" className="go-home"><Home/></Link>
      <div className="playlist-cards">
        {playlists.slice(sequence.minValue, sequence.maxValue).map((item) => {
          return (
            <Card
              image={item?.track?.album?.images[0]?.url}
              playlist={false}
              key={item?.track?.id}
              name={item?.track?.name}
              id={item?.track?.id}
              onClick={async () => await getMusicUrl(item)}
            />
          );
        })}
      </div>
      {sequence.maxValue < 60 && (
        <button className="button next" onClick={handleNext}>
          More
        </button>
      )}
      {sequence.minValue > 11 && (
        <button className="button prev" onClick={handlePrevious}>
          Previous
        </button>
      )}

      <div className="musicPlayer">
        <MusicPlayer {...currentMusic} isPlaying={isPlaying} />
      </div>
    </div>
  );
};

export default Playlist;
