import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { getSongs } from "../../store/slices/songSlice";
import { useNavigate } from "react-router-dom";
const SearchResult = ({ query }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { songs, loading, error } = useSelector((state) => state.song);

  useEffect(() => {
    if (query && query.trim() !== "") {
      dispatch(getSongs(query));
    }
  }, [query, dispatch]);

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-6">Searching songs...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-400 py-6">{error}</div>;
  }

  if (!songs || songs.length === 0) {
    return (
      <div className="text-center text-gray-400 py-6">
        No songs found. Try another search.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {songs.map((song) => (
        <motion.div
          key={song._id}
          onClick={() => navigate(`/music/${song._id}`)}
          whileHover={{ scale: 1.03 }}
         className="bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#0f2027]  rounded-xl overflow-hidden shadow-lg border border-gray-800 
                 hover:border-indigo-500 cursor-pointer group"
        >
          <img
            src={song.coverImage}
            alt={song.title}
            className="w-full h-48 object-cover group-hover:brightness-90 transition duration-300"
          />
          <div className="p-3 flex flex-col space-y-1">
            <h3 className="text-white font-semibold text-lg truncate">
              {song.title}
            </h3>
            <p className="text-gray-300 text-sm truncate">{song.artist}</p>
            <p className="text-gray-400 text-xs truncate">
              {song.album || "No Album"}
            </p>
            <span className="text-xs text-indigo-400 px-2 py-1 rounded-full bg-indigo-900/40 w-fit">
              {song.category}
            </span>
            <audio
              controls
              className="mt-2 w-full rounded bg-gray-800"
              src={song.fileUrl}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SearchResult;
