import { ITrack } from "../App";

type ITrackList = {
    tracks: ITrack[];
    currentTrack: ITrack;
    onTrackSelect: (track: ITrack) => void;
    // duration: number;
};

const TrackList: React.FC<ITrackList> = ({ tracks, currentTrack, onTrackSelect }) => {

    //display duration in mm:ss
    // const formatDuration = (duration: number) => {
    //     const minutes = Math.floor(duration / 60);
    //     const seconds = Math.floor(duration % 60);
    //     return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    // };
    return (
        <div className="flex-1 overflow-y-auto">
            {tracks.map((track: ITrack) => (
                <div
                    key={track.id}
                    className={`flex items-center p-2 hover:bg-gray-700 cursor-pointer ${currentTrack.id === track.id ? 'bg-gray-700' : ''
                        }`}
                    onClick={() => onTrackSelect(track)}
                >
                    <img src={`https://cms.samespace.com/assets/${track.cover}`} alt={track.name} className="w-10 h-10 mr-3" />
                    <div className="flex-1">
                        <div className="text-white">{track.name}</div>
                        <div className="text-gray-400 text-sm">{track.artist}</div>
                    </div>
                    {/* //display duration in mm:ss */}
                    {/* <div className="text-gray-400">{formatDuration(duration)}</div> */}
                    <div className="text-gray-400">12:3</div>
                </div>
            ))}
        </div>
    );
};

export default TrackList;