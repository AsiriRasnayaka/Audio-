import React from "react";
import { Routes, Route } from "react-router-dom";
import AppAuthLayout from "./AppAuthLayout";
import AppMainLayout from "./AppMainLayout";

import Home from "../pages/home/Home";
import Signup from "../pages/register/Signup";
import Login from "../pages/register/Login";
import Account from "../pages/user/Account";
import UpdateUser from "../pages/user/UpdateUser";
import BecomeCreator from "../pages/user/BecomeCreator";
import UploadMusic from "../pages/music/UploadMusic";
import SongsList from "../pages/music/SongsList";
import MusicPlayer from "../pages/music/MusicPlayer";
import RecentSongs from "../pages/music/RecentSongs";
import CreatePlaylist from "../pages/playlist/CreatePlaylist";
import MyPlaylists from "../pages/playlist/MyPlaylists";
import PlaylistDetails from "../pages/playlist/PlaylistDetails";
import SearchPage from "../pages/search/SearchPage";
import CreatorDashboard from "../pages/creator/CreatorDashboard";
import UpdateSong from "../pages/creator/UpdateSong";

export default function AppRoutes() {
  return (
    <Routes>
      {/* AUTH ROUTES */}
      <Route element={<AppAuthLayout />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>

      {/* MAIN APP ROUTES */}
      <Route element={<AppMainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/become-creator" element={<BecomeCreator />} />
        <Route path="/user-account" element={<Account />} />
        <Route path="/update-profile/:id" element={<UpdateUser />} />
        <Route path="/upload-music" element={<UploadMusic />} />
        <Route path="/song-list" element={<SongsList />} />
        <Route path="/music/:id" element={<MusicPlayer />} />
        <Route path="/recent-music" element={<RecentSongs />} />
        <Route path="/create-playlist" element={<CreatePlaylist />} />
        <Route path="/my-playlist" element={<MyPlaylists />} />
        <Route path="/playlist/:id" element={<PlaylistDetails />} />

        <Route path="/search-music" element={<SearchPage />} />
        <Route path="/creator-dashboard" element={<CreatorDashboard />} />
        <Route path="/update-song/:id" element={<UpdateSong />} />
      </Route>
    </Routes>
  );
}
