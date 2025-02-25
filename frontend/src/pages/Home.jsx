import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Home = () => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("verbs");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${query.trim()}&type=${searchType}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-700 mb-6 text-center">
        Welcome to Kriyanighantu
      </h1>
      <h2 className="text-xl md:text-2xl font-semibold text-slate-400 mb-4 text-center">
        Thesaurus of Synonymous Sanskrit Verbs
      </h2>
      <p className="text-base md:text-lg text-slate-600 mb-4 text-center">
        Search for Sanskrit Verbs, Roots, or Lookups
      </p>
      <div className="bg-slate-200 shadow-lg rounded-lg p-6 w-full max-w-md flex flex-col items-center">
        <select
          className="w-full p-2 mb-4 border rounded-md text-slate-700"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="verbs">Verbs</option>
          <option value="roots">Roots</option>
          <option value="lookups">Lookups</option>
        </select>
        <div className="flex w-full">
          <input
            type="text"
            className="w-full p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={`Search ${searchType}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition"
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
