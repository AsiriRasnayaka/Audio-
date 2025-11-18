import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as playlistAPI from "../api/playlistAPI";

// --- Thunks --- //

// Create Playlist
export const createPlaylist = createAsyncThunk(
  "playlists/createPlaylist",
  async (data, { rejectWithValue }) => {
    try {
      const res = await playlistAPI.createPlaylistAPI(data);
      return res.data.playlist;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get Playlist by ID
export const getPlaylistById = createAsyncThunk(
  "playlists/getPlaylistById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await playlistAPI.getPlaylistByIdAPI(id);
      return res.data.playlist;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get User Playlists
export const getUserPlaylists = createAsyncThunk(
  "playlists/getUserPlaylists",
  async (_, { rejectWithValue }) => {
    try {
      const res = await playlistAPI.getUserPlaylistsAPI();
      return res.data.playlists;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update Playlist
export const updatePlaylist = createAsyncThunk(
  "playlists/updatePlaylist",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await playlistAPI.updatePlaylistAPI(id, data);
      return res.data.updatedPlaylist;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete Playlist
export const deletePlaylist = createAsyncThunk(
  "playlists/deletePlaylist",
  async (id, { rejectWithValue }) => {
    try {
      await playlistAPI.deletePlaylistAPI(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Add Song to Playlist
export const addSongToPlaylist = createAsyncThunk(
  "playlists/addSongToPlaylist",
  async ({ playlistId, songId }, { rejectWithValue }) => {
    try {
      const res = await playlistAPI.addSongToPlaylistAPI(playlistId, songId);
      return res.data.playlist;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Remove Song from Playlist
export const removeSongFromPlaylist = createAsyncThunk(
  "playlists/removeSongFromPlaylist",
  async ({ playlistId, songId }, { rejectWithValue }) => {
    try {
      const res = await playlistAPI.removeSongFromPlaylistAPI(playlistId, songId);
      return res.data.playlist;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// --- Slice --- //
const playlistSlice = createSlice({
  name: "playlists",
  initialState: {
    playlists: [],
    currentPlaylist: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Playlist
      .addCase(createPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists.push(action.payload);
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Playlist by ID
      .addCase(getPlaylistById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlaylistById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPlaylist = action.payload;
      })
      .addCase(getPlaylistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get User Playlists
      .addCase(getUserPlaylists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPlaylists.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = action.payload;
      })
      .addCase(getUserPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Playlist
      .addCase(updatePlaylist.fulfilled, (state, action) => {
        const index = state.playlists.findIndex(p => p._id === action.payload._id);

        if (index !== -1) state.playlists[index] = action.payload;

        if (state.currentPlaylist?._id === action.payload._id)
          state.currentPlaylist = action.payload;
      })

      // Delete Playlist
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        state.playlists = state.playlists.filter(p => p._id !== action.payload);

        if (state.currentPlaylist?._id === action.payload)
          state.currentPlaylist = null;
      })

      // Add Song to Playlist
      .addCase(addSongToPlaylist.fulfilled, (state, action) => {
        const index = state.playlists.findIndex(p => p._id === action.payload._id);

        if (index !== -1) state.playlists[index] = action.payload;

        if (state.currentPlaylist?._id === action.payload._id)
          state.currentPlaylist = action.payload;
      })

      // Remove Song from Playlist
      .addCase(removeSongFromPlaylist.fulfilled, (state, action) => {
        const index = state.playlists.findIndex(p => p._id === action.payload._id);

        if (index !== -1) state.playlists[index] = action.payload;
        
        if (state.currentPlaylist?._id === action.payload._id)
          state.currentPlaylist = action.payload;
      });
  },
});

export default playlistSlice.reducer;
