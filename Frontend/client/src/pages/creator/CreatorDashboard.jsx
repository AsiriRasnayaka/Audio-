import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCreatorSongs, deleteSong } from "../../store/slices/songSlice";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaMusic, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";

const CreatorDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { creatorSongs, loading, error } = useSelector((state) => state.song);

  useEffect(() => {
    dispatch(getCreatorSongs());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this song?")) {
      try {
        await dispatch(deleteSong(id)).unwrap();
        toast.success("Song deleted successfully!");
      } catch (err) {
        toast.error(err);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-6xl mx-auto"
    >
      {/* Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-gray-200 hover:text-white transition"
      >
        <FaArrowLeft /> Go Back
      </button>

      <h1 className="text-3xl font-bold text-gray-100 mb-6">
        🎵 Creator Dashboard
      </h1>

      {loading && <p className="text-gray-400">Loading your songs...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && creatorSongs?.length === 0 && (
        <p className="text-gray-400">You haven't uploaded any songs yet.</p>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
        {creatorSongs?.map((song) => (
          <motion.div
            key={song._id}
            whileHover={{ scale: 1.02 }}
            className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#0f2027] border border-gray-700 rounded-lg p-4 shadow-md"
          >
            <div className="flex items-center gap-4 w-full md:w-auto">
              {song.coverImage ? (
                <img
                  src={song.coverImage}
                  alt={song.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center bg-gray-800 rounded-lg">
                  <FaMusic className="text-gray-400 text-2xl" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                {/* Title - single line truncate */}
                <h3 className="text-lg font-semibold text-white truncate">
                  {song.title}
                </h3>

                {/* Metadata - allow 2 lines max, then truncate */}
                <p className="text-gray-400 text-sm line-clamp-2">
                  {song.artist} • {song.album || "No Album"} •{" "}
                  {song.category || "Uncategorized"}
                </p>

                {/* Plays count - single line */}
                <p className="text-gray-500 text-xs truncate">
                  Plays: {song.playCount}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 mt-3 md:mt-0 w-full md:w-auto">
              <button
                onClick={() => navigate(`/update-song/${song._id}`)}
                className="p-2 w-full md:w-auto flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                <FaEdit className="mr-2 md:mr-0" />
                <span className="block md:hidden">Edit</span>
              </button>
              <button
                onClick={() => handleDelete(song._id)}
                className="p-2 w-full md:w-auto flex items-center justify-center rounded-lg bg-red-600 hover:bg-red-700 text-white"
              >
                <FaTrash className="mr-2 md:mr-0" />
                <span className="block md:hidden">Delete</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CreatorDashboard;
