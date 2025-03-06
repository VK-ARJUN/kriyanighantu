import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import SanskritKeyboard from "../components/SanskritKeyboard.jsx";

const Lookup = () => {
  const [lookups, setLookups] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedLookup, setExpandedLookup] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search");
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    } else {
      fetchLookups();
    }
  }, [location.search]);

  const fetchLookups = async () => {
    try {
      const response = await axios.get("/api/lookups");
      setLookups(response.data);
    } catch (error) {
      console.error("Error fetching lookups:", error);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query === "") {
      fetchLookups();
      setNoResults(false);
      return;
    }
    try {
      const response = await axios.get(`/api/lookups/search?query=${query}`);
      setLookups(response.data);
      setNoResults(response.data.length === 0);
    } catch (error) {
      console.error("Error searching lookups:", error);
    }
  };

  const handleVerbSearch = (verb) => {
    navigate(`/verbs?search=${verb}`);
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Sanskrit Meanings
      </h1>

      <div className="flex flex-col items-center">
        <div className="relative w-full md:w-2/3 lg:w-1/2">
          <input
            type="text"
            className="pl-10 pr-4 py-2 border-4 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search for a lookup..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        <div className="w-full mt-4">
          <SanskritKeyboard onKeyClick={(char) => handleSearch(searchQuery + char)} />
        </div>

        {noResults && (
          <p className="text-red-500 text-center font-bold mt-4">
            No results found for: <span className="text-blue-500">{searchQuery}</span>
          </p>
        )}

        <div className="w-full mt-6 space-y-4">
          {lookups.map((lookup) => (
            <div key={lookup.lookup} className="border p-4 rounded-lg shadow-md bg-gray-100 w-full md:w-3/4 mx-auto">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-600">{lookup.lookup}</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600" onClick={() => setExpandedLookup(expandedLookup === lookup ? null : lookup)}>
                  {expandedLookup === lookup ? "Close" : "View"}
                </button>
              </div>

              {expandedLookup === lookup && (
                <div className="mt-2 text-gray-700">
                  <p><strong>English Meaning :</strong> {lookup.englishMeaning}</p>
                  <p><strong>Bhattmalla Reference :</strong> {lookup.reference}</p>

                  {lookup.verbs && lookup.verbs.length > 0 && (
                    <div className="mt-2">
                      <strong>Synonyms (पर्यायाः) :</strong>
                      {lookup.verbs.map((verb, index) => (
                        <span key={index} className="inline">
                          <button
                            key={index}
                            onClick={() => handleVerbSearch(verb)}
                            className="text-blue-500 hover:underline ml-2"
                          >
                            {verb}
                          </button>
                          {index < lookup.verbs.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lookup;
