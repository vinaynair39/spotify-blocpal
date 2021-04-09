import MusicPlayer from 'components/MusicPlayer';
import { useSelector } from 'react-redux';

function App() {
  const {isPlaying, currentMusic} = useSelector((state) =>  state.playlist)
  return (
    <div className="App">
      <MusicPlayer isPlaying={isPlaying} {...currentMusic} />
    </div>
  );
}

export default App;
