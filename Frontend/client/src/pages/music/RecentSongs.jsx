import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecentSongs } from "../../store/slices/songSlice";
import { useNavigate } from "react-router-dom";

const RecentSongs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recentSongs, loading, error } = useSelector((state) => state.song);

  useEffect(() => {
    dispatch(getRecentSongs());
  }, [dispatch]);

  const formatDuration = (duration) => {
    if (!duration) return "00:00";
    let totalSeconds = 0;

    if (typeof duration === "string") {
      const parts = duration.split(":");
      if (parts.length === 2) {
        totalSeconds = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      }
    } else if (typeof duration === "number") {
      totalSeconds = Math.floor(duration); // remove decimals
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <p className="text-center mt-6 text-gray-400">Loading recent songs...</p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-6 text-red-500">
        Failed to load songs: {error}
      </p>
    );
  }

  if (!recentSongs || recentSongs.length === 0) {
    return (
      <p className="text-center mt-6 text-gray-400">
        No recent songs played yet.
      </p>
    );
  }

  return (
    <div className="max-w-5xl pb-20 mx-auto mt-8 px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-300 hover:text-white flex items-center space-x-1 font-medium transition-colors"
      >
        <span className="text-lg">←</span>
        <span>Back</span>
      </button>

      <h2 className="text-2xl font-bold mb-6 text-gray-100">Recently Played</h2>

      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recentSongs.map((song) => (
          <div
            key={song._id}
            onClick={() => navigate(`/music/${song._id}`)}
           className="bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#0f2027]  rounded-xl overflow-hidden shadow-lg border border-gray-800 
                 hover:border-indigo-500 cursor-pointer group"
          >
            {/* Thumbnail container with relative positioning */}
            <div className="relative">
              {/* Cover Image */}
              <img
                src={song.coverImage}
                alt={song.title}
                className="w-full h-48 object-cover group-hover:brightness-90 transition duration-300"
              />

              {/* Duration Badge */}
              <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md shadow-md">
                {formatDuration(song.duration)}
              </span>
            </div>

            {/* Metadata below the thumbnail */}
            <div className="p-3 flex flex-col">
              <h3 className="text-white font-semibold text-lg truncate">
                {song.title}
              </h3>
              <p className="text-gray-300 text-sm truncate">{song.artist}</p>
              <p className="text-gray-400 text-xs truncate">{song.album}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSongs;
