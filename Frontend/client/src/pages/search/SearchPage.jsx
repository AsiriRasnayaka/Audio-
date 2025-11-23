import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Search from "./Search";
import SearchResult from "./SearchResult";

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryFromUrl = queryParams.get("q") || "";

  const [query, setQuery] = useState(queryFromUrl);

  // If URL changes (Header search), update local state
  useEffect(() => {
    setQuery(queryFromUrl);
  }, [queryFromUrl]);

  return (
    <div className="min-h-screen bg-[#111827]">
      <Search query={query} setQuery={setQuery} />
      <SearchResult query={query} />
    </div>
  );
};

export default SearchPage;
