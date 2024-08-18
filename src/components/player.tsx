import { SkipBack, SkipForward, Play, Volume2, Pause } from "lucide-react";
import { ITrack } from "../App";

type IPlayer = {
    currentTrack: ITrack;
    isPlaying: boolean;
    onPlayPause: () => void;
    onNext: () => void;
    onPrevious: () => void;
    onSeek: (time: number) => void;
    duration: number;
    currentTime: number;
};

const Player = ({ currentTrack, isPlaying, onPlayPause, onNext, onPrevious, onSeek, duration, currentTime }: IPlayer) => (
    <div className="flex flex-col items-center p-4 pt-12">
        <div className="w-full items-start">
            <h2 className="text-2xl font-bold mb-2">{currentTrack.name}</h2>
            <h3 className="text-lg text-gray-400 mb-4">{currentTrack.artist}</h3>

        </div>
        <img src={`https://cms.samespace.com/assets/${currentTrack.cover}`} alt={currentTrack.name} className="w-96 h-96 mb-4 rounded-lg shadow-lg" />
        <div className="flex items-center justify-between w-full">
            <div className="w-1/4"></div>
            <div className="flex items-center space-x-4">
                <SkipBack className="text-gray-400 cursor-pointer" onClick={onPrevious} />
                {isPlaying ? (
                    <Pause className="text-white cursor-pointer" size={36} onClick={onPlayPause} />
                ) : (
                    <Play className="text-white cursor-pointer" size={36} onClick={onPlayPause} />
                )}
                <SkipForward className="text-gray-400 cursor-pointer" onClick={onNext} />
            </div>
            <div className="w-1/4 flex justify-end">
                <Volume2 className="text-gray-400 cursor-pointer" />
            </div>
        </div>
        <div className="w-full mt-4">
            <input
                type="range"
                min="0"
                max={duration}
                value={currentTime}
                onChange={(e) => onSeek(parseFloat(e.target.value))}
                className="w-full h-1 bg-gray-700 rounded-full appearance-none cursor-pointer seek-bar"
                style={{
                    background: `linear-gradient(to right, white ${(currentTime / duration) * 100}%, #4B5563 ${(currentTime / duration) * 100}%)`,
                }}
            />
        </div>
        
    </div>
);

export default Player;