import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/slices/userSlice.js"
import songReducer from "../store/slices/songSlice.js";
import playlistReducer from "../store/slices/playlistSlice.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        song: songReducer,
        playlist: playlistReducer,
    },
}); 