import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

const Search = ({ query, setQuery }) => {
  const [input, setInput] = useState(query);

   const handleSearch = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      setQuery(input); // Update parent query
    }
  };

  // Sync input field if query changes from URL (Header search)
  useEffect(() => {
    setInput(query);
  }, [query]);


  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full flex justify-center py-6"
    >
      <form
        onSubmit={handleSearch}
        className="flex items-center w-full max-w-2xl bg-[#1f2937] border border-gray-700 rounded-xl shadow-lg overflow-hidden"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search songs by title, artist, album, or category..."
          className="flex-1 px-4 py-3 bg-[#1f2937] text-gray-200 focus:outline-none placeholder-gray-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 transition px-4 py-4 flex items-center justify-center text-white"
        >
          <FaSearch className="w-5 h-5"/>
        </button>
      </form>
    </motion.div>
  );
};

export default Search;
