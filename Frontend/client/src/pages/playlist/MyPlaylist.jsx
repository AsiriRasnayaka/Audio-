import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserPlaylists,
  deletePlaylist,
  updatePlaylist,
} from "../../store/slices/playlistSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
const MyPlaylists = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { playlists, loading, error } = useSelector((state) => state.playlist);

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  useEffect(() => {
    dispatch(getUserPlaylists());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      dispatch(deletePlaylist(id))
        .unwrap()
        .then(() => toast.success("Playlist deleted successfully"))
        .catch(() => toast.error("Failed to delete playlist"));
    }
  };

  const handleEdit = (playlist) => {
    setEditingId(playlist._id);
    setEditName(playlist.name);
    setEditDescription(playlist.description || "");
  };

const handleUpdate = async (id) => {
  try {
    await dispatch(
      updatePlaylist({
        id,
        data: { name: editName, description: editDescription },
      })
    ).unwrap();

    toast.success("Playlist updated successfully");
    setEditingId(null);
  } catch (err) {
    toast.error(err || "Failed to update playlist");
  }
};


  if (loading)
    return (
      <p className="text-center mt-6 text-gray-300">Loading playlists...</p>
    );
  if (error) return <p className="text-red-400 text-center mt-6">{error}</p>;

  return (
    <div className="max-w-3xl pb-20  mx-auto mt-8 p-6 bg-[#111827] text-gray-100 rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-3 md:space-y-0">
       {/* Go Back Button */}
             <button
               onClick={() => navigate(-1)}
               className="flex items-center gap-2 mb-4 text-gray-200 hover:text-white transition"
             >
               <FaArrowLeft /> Go Back
             </button>
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-100">My Playlists</h2>

        {/* Buttons */}
        <div className="flex text-sm md:text-base flex-row  w-full md:w-auto gap-3">
          <button
            onClick={() => navigate("/create-playlist")}
            className="flex-1 whitespace-nowrap bg-green-600 hover:bg-green-700 text-white  font-medium px-2 py-2 rounded-lg shadow-md transition-transform transform hover:-translate-y-1"
          >
            + Create Playlist
          </button>
          <button
            onClick={() => navigate("/recent-music")}
            className="flex-1 bg-cyan-400 hover:bg-cyan-600 text-white font-medium px-2 py-2 rounded-lg shadow-md transition-transform transform hover:-translate-y-1"
          >
            Recent Played
          </button>
        </div>
      </div>

      {playlists.length === 0 ? (
        <p className="text-gray-400">You have no playlists yet.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {playlists.map((playlist) => (
            <li
              key={playlist._id}
              className="p-4 border border-gray-700 rounded-lg shadow-sm flex flex-col justify-between bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] hover:shadow-md transition-shadow duration-200"
            >
              {editingId === playlist._id ? (
                <div className="flex flex-col space-y-2">
                  <input
                    type="text"
                    className="w-full border border-gray-600 bg-[#111827] text-gray-100 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  <textarea
                    className="w-full border border-gray-600 bg-[#111827] text-gray-100 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleUpdate(playlist._id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col justify-between h-full">
                  <div className="mb-3">
                    <Link
                      to={`/playlist/${playlist._id}`}
                      className="text-lg font-semibold text-blue-400 hover:underline"
                    >
                      {playlist.name}
                    </Link>
                    <p className="text-sm text-gray-400 mt-1">
                      {playlist.description || "No description"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {playlist.songs?.length || 0} songs
                    </p>
                  </div>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => handleEdit(playlist)}
                      className="bg-yellow-500 flex-1 text-gray-900 px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(playlist._id)}
                      className="bg-red-600 text-white flex-1 px-3 py-1 rounded hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyPlaylists;
