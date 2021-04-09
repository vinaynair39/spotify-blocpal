import React, { useRef, useState } from "react";
import ReactPlayer from "react-player";

import { ReactComponent as Pause } from "assets/pause.svg";
import { ReactComponent as Play } from "assets/play.svg";
import { ReactComponent as Previous } from "assets/previous.svg";
import { ReactComponent as Next } from "assets/next.svg";
import { ReactComponent as Audio } from "assets/audio.svg";

import "./MusicPlayer.scss";


const MusicPlayer = ({ imageUrl, artistName, musicName, musicUrl, duration, isPlaying }) => {
  const [state, setState] = useState({
    playing: isPlaying,
    played: 0 ,
    seeking: false,
    loop: false,
    volume: 0.9,
    duration:0 ,
  });


  const inputRef = useRef(null);

  const handleDuration = (time) => {
    setState({ ...state, duration: time });
  };

  const handlePlay = () => {
    setState({ ...state, playing: true });
  };
  const handlePause = () => {
    setState({ ...state, playing: false });
  };

  const handleSeekChange = (e) => {
    console.log(parseFloat(e.target.value))
    setState({ ...state, played: parseFloat(e.target.value) });
  };
  const handleSeekVolumeChange = (e) => {
    setState({ ...state, volume: parseFloat(e.target.value) });
  };
  const handleSeekMouseUp = (e) => {
    setState({ ...state, seeking: false });
  };
  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };
  const handleVolumeMinus = () => {
    setState({ ...state, volume: state.volume > 0 ? state.volume - 0.1 : 0 });
  };

  const handleVolumePlus = () => {
    setState({ ...state, volume: state.volume < 10 ? state.volume + 0.1 : 10 });
  };

  const handleProgress = (current) => {
    if (!state.seeking) {
      setState({ ...state, played: current.played });
    }
  };

  return (
    <>
      <div className="musicPlayer">
        <ReactPlayer
          ref={inputRef}
          playing={state.playing}
          onPause={handlePause}
          onPlay={handlePlay}
          onProgress={handleProgress}
          loop={false}
          onDuration={handleDuration}
          url={musicUrl}
          width="0"
          height="0"
          volume={state.volume}
        />
      </div>
      <div className={"MusicPlayer-wide"}>
        <div className="image">
          <img src={imageUrl} alt="" />
          <div className="names">
            <h6>{musicName}</h6>
            <span className="artist">{artistName}</span>
          </div>
        </div>

        <div className="controls">
          <div className="buttons">
            <button className="controls-click" onClick={handleVolumeMinus}>
              <Previous />
            </button>
            {state.playing ? (
              <button className="pause-click" onClick={handlePause}>
                <Pause />
              </button>
            ) : (
              <button className="play-click" onClick={handlePlay}>
                <Play />
              </button>
            )}
            <button className="controls-click" onClick={handleVolumePlus}>
              <Next />
            </button>
          </div>
          <div className={"elapsed"}>
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={state.played}
              onMouseDown={handleSeekMouseDown}
              onTouchStart={handleSeekMouseDown}
              onTouchEnd={handleSeekMouseUp}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
            />
          </div>
        </div>
        <div className="volumeChange">
          <Audio />
          <div className={"audio"}>
            <input
              type="range"
              min={0}
              max={1}
              step="any"
              value={state.volume}
              onMouseDown={handleSeekMouseDown}
              onTouchStart={handleSeekMouseDown}
              onTouchEnd={handleSeekMouseUp}
              onChange={handleSeekVolumeChange}
              onMouseUp={handleSeekMouseUp}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
