import React from "react";
import { motion } from "framer-motion";
import { FaMusic } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SongCard = ({ song }) => {
  const navigate = useNavigate();

  // Helper to convert seconds to mm:ss
  const formatDuration = (duration) => {
    if (!duration) return "00:00";
    let totalSeconds = 0;

    if (typeof duration === "string") {
      const parts = duration.split(":");
      if (parts.length === 2) {
        totalSeconds = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
      }
    } else if (typeof duration === "number") {
      totalSeconds = Math.floor(duration); // get rid of decimals
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -5 }}
      transition={{ duration: 0.3 }}
      onClick={() => navigate(`/music/${song._id}`)}
      className="bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#0f2027]  rounded-xl overflow-hidden shadow-lg border border-gray-800 
                 hover:border-indigo-500 cursor-pointer group"
    >
      {/* Thumbnail / Cover */}
      <div className="relative w-full h-40 bg-gray-700 overflow-hidden">
        {song.coverImage ? (
          <img
            src={song.coverImage}
            alt={song.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <FaMusic className="text-gray-400 text-4xl" />
          </div>
        )}

        {/* Duration badge */}
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
          {formatDuration(song.duration)}
        </span>
      </div>

      {/* Song Info */}
      <div className="p-3 flex flex-col gap-1">
        <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2">
          {song.title}
        </h3>
        <p className="text-gray-400 text-xs truncate">{song.artist}</p>
        {song.album && (
          <p className="text-gray-500 text-xs truncate">{song.album}</p>
        )}
      </div>
    </motion.div>
  );
};

export default SongCard;
