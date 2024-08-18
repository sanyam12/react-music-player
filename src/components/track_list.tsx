import React from 'react';
import { ITrack } from "../App";

type ITrackList = {
    tracks: ITrack[];
    currentTrack: ITrack;
    onTrackSelect: (track: ITrack) => void;
};

const TrackList: React.FC<ITrackList> = ({ tracks, currentTrack, onTrackSelect }) => {
    return (
        <div className="flex-1 overflow-y-auto">
            {tracks.map((track: ITrack) => (
                <div
                    key={track.id}
                    className={`flex items-center p-2 md:p-3 hover:bg-gray-700 cursor-pointer ${
                        currentTrack.id === track.id ? 'bg-gray-700' : ''
                    }`}
                    onClick={() => onTrackSelect(track)}
                >
                    <img 
                        src={`https://cms.samespace.com/assets/${track.cover}`} 
                        alt={track.name} 
                        className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-3" 
                    />
                    <div className="flex-1 min-w-0">
                        <div className="text-sm md:text-base text-white truncate">{track.name}</div>
                        <div className="text-xs md:text-sm text-gray-400 truncate">{track.artist}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TrackList;