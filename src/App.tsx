import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import Player from './components/player';
import TrackList from './components/track_list';
import ReactAudioPlayer from 'react-audio-player';
import { Search } from 'lucide-react';

export type ITrack = {
  id: number;
  name: string;
  artist: string;
  accent: string;
  cover: string;
  url: string;
  top_track: boolean;
};

const App = () => {
  const [tracks, setTracks] = useState<{
    forYou: ITrack[];
    topTracks: ITrack[];
    [key: string]: ITrack[];
  }>({
    forYou: [
      {
        id: 1,
        name: 'Track 1',
        artist: 'Artist 1',
        accent: '#331E00',
        cover: 'Cover 1',
        url: 'URL 1',
        top_track: true
      }
    ],
    topTracks: []
  });

  const [currentTrack, setCurrentTrack] = useState<ITrack>(tracks.forYou[0]);
  const [activeList, setActiveList] = useState('forYou');
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState(currentTrack.accent);
  const [searchQuery, setSearchQuery] = useState('');
  const audioRef = useRef<ReactAudioPlayer>(null);

  useEffect(() => {
    if (audioRef.current) {
      const audioElement = audioRef.current.audioEl.current;
      if (audioElement && isPlaying) {
        audioElement.play();
      } else if (audioElement) {
        audioElement.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    setBackgroundColor(currentTrack.accent);
  }, [currentTrack]);

  useEffect(() => {
    fetch('https://cms.samespace.com/items/songs')
      .then(response => response.json())
      .then(data => {
        const forYou = data.data.map((track: ITrack) => ({
          id: track.id,
          name: track.name,
          artist: track.artist,
          accent: track.accent,
          cover: track.cover,
          url: track.url,
          top_track: track.top_track
        }));
        const topTracks = forYou.filter((track: ITrack) => track.top_track);
        setTracks({
          forYou,
          topTracks
        });
        setCurrentTrack(forYou[0]);
      });
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentList = tracks[activeList];
    const currentIndex = currentList.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % currentList.length;
    setCurrentTrack(currentList[nextIndex]);
    setCurrentTime(0);
  };

  const handlePrevious = () => {
    const currentList = tracks[activeList];
    const currentIndex = currentList.findIndex(track => track.id === currentTrack.id);
    const previousIndex = (currentIndex - 1 + currentList.length) % currentList.length;
    setCurrentTrack(currentList[previousIndex]);
    setCurrentTime(0);
  };

  const handleSeek = (time: number) => {
    if (audioRef.current && audioRef.current.audioEl.current) {
      audioRef.current.audioEl.current.currentTime = time;
    }
    setCurrentTime(time);
  };

  const handleTrackSelect = (track: SetStateAction<ITrack>) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const handleListen = (currentTime: number) => {
    setCurrentTime(currentTime);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredTracks = tracks[activeList].filter((track) =>
    track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="flex h-screen text-white transition-all duration-1000 ease-in-out"
      style={{
        background: `linear-gradient(to right, ${backgroundColor}, #000000)`
      }}
    >
      <div className="w-2/3 p-6 overflow-hidden flex flex-col">
        <div className="flex items-center mb-6">
          <button
            className={`text-2xl font-bold mr-6 ${activeList === 'forYou' ? 'text-white' : 'text-gray-500'}`}
            onClick={() => setActiveList('forYou')}
          >
            For You
          </button>
          <button
            className={`text-2xl font-bold ${activeList === 'topTracks' ? 'text-white' : 'text-gray-500'}`}
            onClick={() => setActiveList('topTracks')}
          >
            Top Tracks
          </button>
        </div>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Song, Artist"
            className="w-full bg-gray-800 rounded-full py-2 px-4 pl-10 text-white"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <TrackList
          tracks={filteredTracks}
          currentTrack={currentTrack}
          onTrackSelect={handleTrackSelect}
        />
      </div>
      <div className="w-1/3 p-6 flex flex-col justify-between">
        <Player
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSeek={handleSeek}
          duration={duration}
          currentTime={currentTime}
        />
        <ReactAudioPlayer
          src={currentTrack.url}
          ref={audioRef as React.RefObject<ReactAudioPlayer>}
          onLoadedMetadata={(e) => {
            const audioElement = e.target as HTMLMediaElement;
            if (audioElement) {
              setDuration(audioElement.duration);
            }
          }}
          onEnded={handleNext}
          listenInterval={1000}
          onListen={handleListen}
        />
      </div>
    </div>
  );
};

export default App;