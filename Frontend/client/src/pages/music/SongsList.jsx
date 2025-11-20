import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../store/slices/songSlice";
import SongCard from "./SongCard";

const SongsList = () => {
  const dispatch = useDispatch();
  const { songs, loading, error } = useSelector((state) => state.song);

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  if (loading) return <p className="text-white text-center mt-10">Loading songs...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!songs || songs.length === 0)
    return <p className="text-gray-400 text-center mt-10">No songs found</p>;

  return (
    <div className="min-h-screen pb-20 bg-[#111827] p-6">
      <h2 className="text-2xl text-white font-bold mb-6 ">All Songs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {songs.map((song) => (
          <SongCard key={song._id} song={song} />
        ))}
      </div>
    </div>
  );
};

export default SongsList;
