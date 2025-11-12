import express from "express";
import {
    createPlaylist,
    getPlaylistById,
    getUserPlaylists,
    updatePlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist,
} from "../controller/playlist.controller.js";
import {isLoggedIn} from "../middleware/isLoggedIn.js";

const router = express.Router();

router.post("/create",isLoggedIn , createPlaylist);
router.get("/:id", isLoggedIn, getPlaylistById);
router.get('/', isLoggedIn, getUserPlaylists);
router.put("/:id", isLoggedIn, updatePlaylist);
router.delete("/:id", isLoggedIn, deletePlaylist);
router.put("/:id/add-song", isLoggedIn, addSongToPlaylist);
router.put("/:id/remove-song", isLoggedIn, removeSongFromPlaylist);

export default router;
