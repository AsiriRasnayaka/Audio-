import axios from "axios";

const BASE_URL = "http://localhost:5004/api/songs";
const api = axios.create({ baseURL: BASE_URL, withCredentials: true });

// Create a new song
export const createSongAPI = (formData, onUploadProgress) => {
  return api.post("/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress, // <-- track progress here
  });
};

// Fetch all songs (with optional search)
export const getSongsAPI = (search = "") => {
  return api.get("/get", { params: { search } });
};

// Get recent songs
export const getRecentSongsAPI = () => {
  return api.get("/recent");
};

// Get song by ID
export const getSongByIdAPI = (id) => {
  return api.get(`/${id}`);
};

// Play song
export const playSongAPI = (id) => {
  return api.post(`/play/${id}`);
};


export const getCreatorSongsAPI = () => {
  return api.get("/creator/songs");
};
// Update song
export const updateSongAPI = (id, formData) => {
  return api.put(`/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Delete song
export const deleteSongAPI = (id) => {
  return api.delete(`/${id}`);
};
