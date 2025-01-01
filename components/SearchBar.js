"use client";

import { useState, useEffect } from "react";
import { HistoryIcon, SearchIcon, TrendingIcon } from "./Icons";
import AudioSearch from "./AudioSearch";
import GoogleLensSearch from "./GoogleLensSearch";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [isImageSearchOpen, setIsImageSearchOpen] = useState(false);

  const fetchSuggestions = async (query) => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&cx=${process.env.NEXT_PUBLIC_GOOGLE_CX}&q=${query}`
      );
      const data = await res.json();
      const suggestionItems = data.items?.map((item) => item.title) || [];
      setSuggestions(suggestionItems);
      setIsTrending(false); // Not trending when fetching regular suggestions
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const fetchTrendingSearches = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&cx=${process.env.NEXT_PUBLIC_GOOGLE_CX}&q=trending`
      );
      const data = await res.json();
      const trendingItems = data.items?.map((item) => item.title) || [];
      setSuggestions(trendingItems);
      setIsTrending(true); // Mark as trending
    } catch (error) {
      console.error("Error fetching trending searches:", error);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      fetchSuggestions(query);
      setShowSuggestions(true);
    } else {
      fetchTrendingSearches();
      setShowSuggestions(true);
    }
  };

  const handleFocus = () => {
    if (!searchQuery.trim()) {
      fetchTrendingSearches();
    }
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };
const handleOpenMic=()=>{
  setIsVoiceSearchOpen(true)
}
const handleOpenImageSearch=()=>{
  setIsImageSearchOpen(true)
}
  return (
    <div className="relative mt-6 w-full max-w-xl mx-auto">
      {/* Input and Icons */}
      <div
        className={`flex items-center px-4 py-3 min-h-[48px] transition-all duration-200 ${
          showSuggestions
            ? "rounded-t-[24px] rounded-b-none bg-[#303134]"
            : "rounded-[24px] bg-[#5f6368]"
        }`}
      >
        <span className="text-gray-400 hover:text-gray-100 mr-3">
          <img src="/search_icon.svg" alt="search" className="h-5 w-5 invert" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="flex-grow bg-transparent focus:outline-none text-sm text-white"
        />
        <span className="text-gray-400 hover:text-gray-100 ml-3" onClick={handleOpenMic}>
          <img src="/mic.svg" alt="microphone" className="h-5 w-5" />
        </span>
        <span className="text-gray-400 hover:text-gray-100 ml-3" onClick={handleOpenImageSearch}>
          <img src="/camera.svg" alt="image" className="h-5 w-5" />
        </span>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute pb-3 bg-[#303134] text-white w-full mt-0 rounded-b-[24px] shadow-lg z-10">
          <div className="border-[0.5px] border-[#5f6368] ml-[14px] mr-[20px]"></div>
          {isTrending && suggestions.length > 0 && (
            <div className="px-4 pt-[8px] text-[#9aa0a6] text-sm">
              Trending searches
            </div>
          )}
          {suggestions.length > 0 && (
            <ul className="pt-[4px] text-sm font-normal">
              {suggestions.map((item, index) => (
                <li
                  key={index}
                  onClick={() => setSearchQuery(item)}
                  className="flex h-[30px] items-center my-0 pl-[14px] pr-[20px] hover:bg-[#3c4043] cursor-pointer"
                >
                  {isTrending ? (
                    <TrendingIcon className="h-4 w-4 invert mr-3" fill="#9aa0a6" />
                  ) : (
                    <SearchIcon className="h-4 w-4 invert mr-3" fill="#9aa0a6"/>
                  )}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
        <AudioSearch
        isOpen={isVoiceSearchOpen}
        onClose={() => setIsVoiceSearchOpen(false)}
      />
      <GoogleLensSearch
         isOpen={isImageSearchOpen}
         onClose={() => setIsImageSearchOpen(false)}
      />
    </div>
  );
}
