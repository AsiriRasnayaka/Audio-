import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist } from "../../store/slices/playlistSlice.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePlaylist = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.playlist);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Playlist name is required.");
      return;
    }
    try {
      await dispatch(createPlaylist({ name, description })).unwrap();
      toast.success("Playlist created!");
      setName("");
      setDescription("");
    } catch (err) {
      toast.error(err || "Failed to create playlist.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#0f2027] text-gray-100 rounded-xl shadow-xl border border-gray-700">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-gray-300 hover:text-white flex items-center space-x-1 font-medium transition-colors"
      >
        <span className="text-lg">←</span>
        <span>Back</span>
      </button>

      <h2 className="text-2xl font-bold mb-6 text-gray-100">
        Create New Playlist
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Playlist Name */}
        <div>
          <label className="block text-gray-300 font-medium mb-1">
            Playlist Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-600 bg-[#1f2937] text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
            placeholder="Enter playlist name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Playlist Description */}
        <div>
          <label className="block text-gray-300 font-medium mb-1">
            Description (optional)
          </label>
          <textarea
            className="w-full border border-gray-600 bg-[#1f2937] text-gray-100 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm"
            placeholder="Add a short description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-gradient-to-r from-cyan-500 to-teal-400 text-gray-900 py-2 rounded-lg 
    shadow-md transition-transform duration-300 ease-in-out transform 
    hover:scale-105 hover:from-cyan-400 hover:to-teal-300 
    hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Playlist"}
        </button>
      </form>

      {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
    </div>
  );
};

export default CreatePlaylist;
