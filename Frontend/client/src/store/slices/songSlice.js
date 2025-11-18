import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as songAPI from "../api/songAPI";

// --- Thunks --- //

// Create Song
export const createSong = createAsyncThunk(
  "songs/createSong",
  async ({ formData, onUploadProgress }, { rejectWithValue }) => {
    try {
      const response = await songAPI.createSongAPI(formData, onUploadProgress);
      return response.data.newSong;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch All Songs
export const getSongs = createAsyncThunk(
  "songs/getSongs",
  async (search, { rejectWithValue }) => {
    try {
      const response = await songAPI.getSongsAPI(search);
      return response.data.songs;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get Song by ID
export const getSongById = createAsyncThunk(
  "songs/getSongById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await songAPI.getSongByIdAPI(id);
      return response.data.song;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Play Song
export const playSong = createAsyncThunk(
  "songs/playSong",
  async (id, { rejectWithValue }) => {
    try {
      const response = await songAPI.playSongAPI(id);
      return response.data.song;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get Recent Songs
export const getRecentSongs = createAsyncThunk(
  "songs/getRecentSongs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await songAPI.getRecentSongsAPI();
      return response.data.recentSongs;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getCreatorSongs = createAsyncThunk(
  "songs/getCreatorSongs",
  async (_, { rejectWithValue }) => {
    try {
      const res = await songAPI.getCreatorSongsAPI();
      return res.data.songs;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update Song
export const updateSong = createAsyncThunk(
  "songs/updateSong",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await songAPI.updateSongAPI(id, formData);
      return response.data.updatedSong;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete Song
export const deleteSong = createAsyncThunk(
  "songs/deleteSong",
  async (id, { rejectWithValue }) => {
    try {
      await songAPI.deleteSongAPI(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// --- Slice --- //
const songSlice = createSlice({
  name: "songs",
  initialState: {
    songs: [],
    recentSongs: [],
    creatorSongs: [],
    currentSong: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Song
      .addCase(createSong.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSong.fulfilled, (state, action) => {
        state.loading = false;
        state.songs.push(action.payload);
      })
      .addCase(createSong.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Songs
      .addCase(getSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.songs = action.payload;
      })
      .addCase(getSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Song by ID
      .addCase(getSongById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSongById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentSong = action.payload;
      })
      .addCase(getSongById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(playSong.fulfilled, (state, action) => {
        // Only update playCount to avoid creating new object reference
        if (state.currentSong && state.currentSong._id === action.payload._id) {
          state.currentSong.playCount = action.payload.playCount;
        }

        const index = state.songs.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index !== -1) {
          state.songs[index].playCount = action.payload.playCount;
        }
      })

      // Get Recent Songs
      .addCase(getRecentSongs.fulfilled, (state, action) => {
        state.recentSongs = action.payload;
      })

      .addCase(getCreatorSongs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCreatorSongs.fulfilled, (state, action) => {
        state.loading = false;
        state.creatorSongs = action.payload;
      })
      .addCase(getCreatorSongs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Song
      .addCase(updateSong.fulfilled, (state, action) => {

        const index = state.creatorSongs.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index !== -1) state.creatorSongs[index] = action.payload;
        
        if (state.currentSong?._id === action.payload._id) {
          state.currentSong = action.payload;
        }
      })

      // Delete Song
      .addCase(deleteSong.fulfilled, (state, action) => {
        state.creatorSongs = state.creatorSongs.filter(
          (s) => s._id !== action.payload
        );
        if (state.currentSong?._id === action.payload) {
          state.currentSong = null;
        }
      });
  },
});

export default songSlice.reducer;
