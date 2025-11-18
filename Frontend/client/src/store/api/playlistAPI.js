import axios from "axios";

const BASE_URL = "http://localhost:5004/api/playlists";
const api = axios.create({ baseURL: BASE_URL, withCredentials: true });

// Create Playlist
export const createPlaylistAPI = (data) => api.post("/create", data);

// Get Playlist by ID
export const getPlaylistByIdAPI = (id) => api.get(`/${id}`);

// Get User Playlists
export const getUserPlaylistsAPI = () => api.get("/");

export const updatePlaylistAPI = (id, data) =>
  api.patch(`/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });


// Delete Playlist
export const deletePlaylistAPI = (id) => api.delete(`/${id}`);

// Add Song to Playlist
export const addSongToPlaylistAPI = (id, songId) =>
  api.patch(`/${id}/add-song`, { songId });

// Remove Song from Playlist
export const removeSongFromPlaylistAPI = (id, songId) =>
  api.patch(`/${id}/remove-song`, { songId });
