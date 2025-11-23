import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { updateSong, getSongById } from "../../store/slices/songSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaMusic,
  FaImage,
  FaUserAlt,
  FaCompactDisc,
  FaTag,
} from "react-icons/fa";
import { MdTitle } from "react-icons/md";
const UpdateSong = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.song);

  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    category: "",
  });

  const [coverImage, setCoverImage] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  // Load song details on mount
  useEffect(() => {
    const fetchSong = async () => {
      try {
        const song = await dispatch(getSongById(id)).unwrap();
        setFormData({
          title: song.title || "",
          artist: song.artist || "",
          album: song.album || "",
          category: song.category || "",
        });
      } catch (error) {
        toast.error("Failed to fetch song");
      }
    };

    fetchSong();
  }, [dispatch, id]);

  // Handle update submit
  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // append all form fields
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    // append files
    if (coverImage) data.append("coverImage", coverImage);
    if (audioFile) data.append("audio", audioFile);

    try {
      await dispatch(updateSong({ id, formData: data })).unwrap();
      toast.success("Song updated successfully!");
      navigate("/creator-dashboard");
    } catch (err) {
      toast.error(err?.message || "Failed to update song");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0f172a] px-4 py-12">
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#0f2027] backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-full max-w-xl border border-gray-700"
      >
        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-gray-300 hover:text-white transition"
        >
          <FaArrowLeft /> Go Back
        </button>

        <h2 className="text-3xl font-extrabold text-white mb-8 text-center tracking-wide">
          🎵 Update Song
        </h2>

        {loading ? (
          <p className="text-gray-400 text-center">Loading song...</p>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Title */}
            <div className="relative">
              <label className="text-gray-300 font-medium mb-1 block">
                Song Title
              </label>
              <div className="flex items-center gap-3 bg-gray-800 px-4 py-3 rounded-xl shadow-inner focus-within:ring-2 focus-within:ring-cyan-500 transition">
                <MdTitle className="text-cyan-400 text-lg" />
                <input
                  type="text"
                  placeholder="Enter song title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Artist */}
            <div className="relative">
              <label className="text-gray-300 font-medium mb-1 block">
                Artist
              </label>
              <div className="flex items-center gap-3 bg-gray-800 px-4 py-3 rounded-xl shadow-inner focus-within:ring-2 focus-within:ring-purple-500 transition">
                <FaUserAlt className="text-purple-400" />
                <input
                  type="text"
                  placeholder="Enter artist name"
                  value={formData.artist}
                  onChange={(e) =>
                    setFormData({ ...formData, artist: e.target.value })
                  }
                  className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Album */}
            <div className="relative">
              <label className="text-gray-300 font-medium mb-1 block">
                Album
              </label>
              <div className="flex items-center gap-3 bg-gray-800 px-4 py-3 rounded-xl shadow-inner focus-within:ring-2 focus-within:ring-pink-500 transition">
                <FaCompactDisc className="text-pink-400" />
                <input
                  type="text"
                  placeholder="Enter album name"
                  value={formData.album}
                  onChange={(e) =>
                    setFormData({ ...formData, album: e.target.value })
                  }
                  className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Category */}
            <div className="relative">
              <label className="text-gray-300 font-medium mb-1 block">
                Category / Genre
              </label>
              <div className="flex items-center gap-3 bg-gray-800 px-4 py-3 rounded-xl shadow-inner focus-within:ring-2 focus-within:ring-emerald-500 transition">
                <FaTag className="text-emerald-400" />
                <input
                  type="text"
                  placeholder="e.g. Pop, Rock"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Cover Image */}
            <div>
              <label className="text-gray-300 font-medium block mb-2">
                Cover Image
              </label>
              <label className="flex items-center justify-center gap-3 cursor-pointer w-full px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 shadow-md transition border border-gray-600 hover:border-cyan-500">
                <FaImage className="text-cyan-400" />
                <span>Choose Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverImage(e.target.files[0])}
                  className="hidden"
                />
              </label>
              {coverImage && (
                <img
                  src={URL.createObjectURL(coverImage)}
                  alt="preview"
                  className="w-32 h-32 mt-3 rounded-2xl object-cover border-2 border-gray-600 shadow-lg transition-transform hover:scale-105"
                />
              )}
            </div>

            {/* Audio File */}
            <div>
              <label className="text-gray-300 font-medium block mb-2">
                Audio File
              </label>
              <label className="flex items-center justify-center gap-3 cursor-pointer w-full px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 shadow-md transition border border-gray-600 hover:border-green-500">
                <FaMusic className="text-green-400" />
                <span>Choose Audio</span>
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setAudioFile(e.target.files[0])}
                  className="hidden"
                />
              </label>
              {audioFile && (
                <p className="text-gray-300 text-sm mt-2 truncate flex items-center gap-2">
                  <FaMusic className="text-gray-400" /> {audioFile.name}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate("/creator-dashboard")}
                className="px-5 py-2 rounded-xl bg-gray-600 hover:bg-gray-700 text-white font-medium shadow-md transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-teal-400 text-gray-900 shadow-lg hover:shadow-cyan-500/30 transition transform hover:-translate-y-0.5"
              >
                Update Song 🚀
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default UpdateSong;
