import React from 'react';
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

const Player: React.FC<IPlayer> = ({ 
    currentTrack, 
    isPlaying, 
    onPlayPause, 
    onNext, 
    onPrevious, 
    onSeek, 
    duration, 
    currentTime 
}) => (
    <div className="flex flex-col items-center p-2 md:p-4 md:pt-12">
        <div className="w-full items-start mb-2 md:mb-4">
            <h2 className="text-lg md:text-2xl font-bold mb-1 md:mb-2 truncate">{currentTrack.name}</h2>
            <h3 className="text-sm md:text-lg text-gray-400 truncate">{currentTrack.artist}</h3>
        </div>
        <img 
            src={`https://cms.samespace.com/assets/${currentTrack.cover}`} 
            alt={currentTrack.name} 
            className="w-48 h-48 md:w-96 md:h-96 mb-4 rounded-lg shadow-lg object-cover" 
        />
        <div className="flex items-center justify-between w-full mb-2 md:mb-4">
            <div className="w-1/4"></div>
            <div className="flex items-center space-x-2 md:space-x-4">
                <SkipBack className="text-gray-400 cursor-pointer w-5 h-5 md:w-6 md:h-6" onClick={onPrevious} />
                {isPlaying ? (
                    <Pause className="text-white cursor-pointer w-8 h-8 md:w-10 md:h-10" onClick={onPlayPause} />
                ) : (
                    <Play className="text-white cursor-pointer w-8 h-8 md:w-10 md:h-10" onClick={onPlayPause} />
                )}
                <SkipForward className="text-gray-400 cursor-pointer w-5 h-5 md:w-6 md:h-6" onClick={onNext} />
            </div>
            <div className="w-1/4 flex justify-end">
                <Volume2 className="text-gray-400 cursor-pointer w-5 h-5 md:w-6 md:h-6" />
            </div>
        </div>
        <div className="w-full">
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