import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSong } from "../../store/slices/songSlice";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const categories = [
  "Pop",
  "Rock",
  "Hip-Hop",
  "Jazz",
  "Classical",
  "Electronic",
  "Other",
];

const UploadMusic = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.song);

  const [form, setForm] = useState({
    title: "",
    artist: "",
    album: "",
    category: "",
    audio: null,
    coverImage: null,
  });

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, artist, audio, coverImage } = form;

    if (!title || !artist || !audio || !coverImage) {
      toast.error("Please fill all required fields and upload files!");
      return;
    }

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));

    try {
      // Dispatch the thunk and unwrap the result
      await dispatch(
        createSong({
          formData: data,
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          },
        })
      ).unwrap();

      // Success toast
      toast.success("Song uploaded successfully!");

      setForm({
        title: "",
        artist: "",
        album: "",
        category: "",
        audio: null,
        coverImage: null,
      });
      setProgress(0);
    } catch (error) {
      console.error("Failed to upload song:", error);
      toast.error(error || "Failed to upload song.");
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#111827] flex pb-20 items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg w-full  bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] p-8 rounded-3xl shadow-2xl border border-gray-700"
      >
        {/* Go Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4 text-gray-200 hover:text-white transition"
        >
          <FaArrowLeft /> Go Back
        </button>
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Upload New Song
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Title*
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter song title"
              required
              className="w-full rounded-lg border border-gray-600 bg-[#1f2937] p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Artist */}
          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Artist*
            </label>
            <input
              type="text"
              name="artist"
              value={form.artist}
              onChange={handleChange}
              placeholder="Enter artist name"
              required
              className="w-full rounded-lg border border-gray-600 bg-[#1f2937] p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Album */}
          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Album (optional)
            </label>
            <input
              type="text"
              name="album"
              value={form.album}
              onChange={handleChange}
              placeholder="Enter album name"
              className="w-full rounded-lg border border-gray-600 bg-[#1f2937] p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Category*
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-600 bg-[#1f2937] p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Audio File */}
          <div>
            <label className="block text-gray-200 font-semibold mb-2">
              🎵 Audio File*
            </label>
            <input
              type="file"
              name="audio"
              accept="audio/*"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-green-600 file:text-white hover:file:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {form.audio && (
              <audio
                controls
                src={URL.createObjectURL(form.audio)}
                className="w-full mt-3 rounded-lg border border-gray-700 bg-gray-900"
              />
            )}
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-gray-200 font-semibold mb-2">
              🖼 Cover Image*
            </label>
            <input
              type="file"
              name="coverImage"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full px-3 py-2 text-sm text-gray-300 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {form.coverImage && (
              <img
                src={URL.createObjectURL(form.coverImage)}
                alt="cover preview"
                className="mt-3 w-full h-48 object-cover rounded-lg border border-gray-700 shadow-md"
              />
            )}
          </div>

          {/* Progress Bar */}
          {loading && (
            <div className="w-full mt-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-indigo-400">
                  Uploading...
                </span>
                <span className="text-sm font-medium text-indigo-400">
                  {progress}%
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden shadow-inner">
                <div
                  className="h-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium bg-gradient-to-r from-cyan-500 to-teal-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 shadow-md ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Uploading..." : "Upload Song"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default UploadMusic;
