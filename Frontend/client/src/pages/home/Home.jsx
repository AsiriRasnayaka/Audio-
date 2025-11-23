import React from "react";
import RecentSongs from "../music/RecentSongs";
import SongsList from "../music/SongsList";

function Home() {
  return (
    <div>
      <RecentSongs />
      
      <div className="pl-6">  
        <SongsList />
      </div>
    </div>
  );
}

export default Home;
