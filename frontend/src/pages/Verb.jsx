import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import SanskritKeyboard from "../components/SanskritKeyboard.jsx";

const Verb = () => {
  const [verbs, setVerbs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedVerb, setExpandedVerb] = useState(null);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleVerbExpansion = (verbId) => {
    setExpandedVerb(expandedVerb === verbId ? null : verbId); // Ensures only one verb expands
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search");
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    } else {
      fetchVerbs();
    }
  }, [location.search]);

  const fetchVerbs = async () => {
    try {
      const response = await axios.get("/api/verbs");
      setVerbs(response.data);
    } catch (error) {
      console.error("Error fetching verbs:", error);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query === "") {
      fetchVerbs();
      setNoResults(false);
      return;
    }

    try {
      const response = await axios.get(`/api/verbs/search?query=${query}`);
      setVerbs(response.data);
      setNoResults(response.data.length === 0);
    } catch (error) {
      console.error("Error searching verbs:", error);
    }
  };

  const handleLookupSearch = (lookup) => {
    navigate(`/lookups?search=${lookup}`);
  }

  const handleRootSearch = (root) => {
    navigate(`/roots?search=${root}`);
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Sanskrit Verbs
      </h1>

      {/* Search Bar */}
      <div className="flex flex-col items-center">
        <div className="relative w-full md:w-2/3 lg:w-1/2">
          <input
            type="text"
            className="pl-10 pr-4 py-2 border-4 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search for a verb..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Sanskrit Keyboard */}
        <div className="w-full mt-4">
          <SanskritKeyboard onKeyClick={(char) => handleSearch(searchQuery + char)} />
        </div>

        {noResults && (
          <p className="text-red-500 text-center font-bold mt-4">
            No results found for: <span className="text-blue-500">{searchQuery}</span>
          </p>
        )}


        {/* Verbs List */}
        <div className="w-full mt-6 space-y-4">
          {verbs.map((verb) => (
            <div
              key={verb.id}
              className="border p-4 rounded-lg shadow-md bg-gray-100 w-full md:w-3/4 mx-auto"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-400">
                  <span className="text-gray-700">{verb.verb}</span> ({verb.lookup})
                </h2>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                  onClick={() => toggleVerbExpansion(verb.id)}
                >
                  {expandedVerb === verb.id ? "Close" : "View"}
                </button>
              </div>

              {/* Expanded Verb Details */}
              {expandedVerb === verb.id && (
                <div className="mt-2 text-gray-700">
                  <p><strong>Lookup:</strong>{" "}
                    <button
                      onClick={() => handleLookupSearch(verb.lookup)}
                      className="text-blue-500 hover:underline"
                    >
                      {verb.lookup}
                    </button>
                  </p>
                  <p><strong>English Meaning:</strong> {verb.lookupMeaning}</p>
                  <p><strong>Root:</strong>{" "}
                    <button
                      onClick={() => handleRootSearch(verb.root)}
                      className="text-blue-500 hover:underline"
                    >
                      {verb.root}
                    </button>
                  </p>
                  <p><strong>Root Index:</strong> {verb.rootIndex}</p>
                  <p><strong>Ganam:</strong> {verb.ganam}</p>
                  <p><strong>Properties:</strong> {verb.transVerb}</p>
                  <p><strong>It Agma:</strong> {verb.ItAgma}</p>
                  <p><strong>Derivation:</strong> {verb.derivation}</p>
                  <p><strong>Example:</strong> {verb.example}</p>

                  {/* See Also */}
                  {Array.isArray(verb.seeAlso) && verb.seeAlso.length > 0 && (
                    <div className="mt-2">
                      <strong>See Also:</strong>
                      {verb.seeAlso.map((lookup, index) => (
                        <span key={index} className="inline">
                          <button
                            key={index}
                            onClick={() => handleLookupSearch(lookup)}
                            className="text-blue-500 ml-2 hover:underline"
                          >
                            {lookup}
                          </button>
                          {index < verb.seeAlso.length - 1 ? " ," : ""}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Synonyms */}
                  {verb.synonyms && verb.synonyms.length > 0 && (
                    <div className="mt-2">
                      <strong>Synonyms:</strong>
                      {verb.synonyms.map((synVerb, index) => (
                        <span key={synVerb.id} className="inline">
                          <button
                            onClick={() => handleSearch(synVerb.verb)}
                            className="text-blue-500 ml-2 hover:underline"
                          >
                            {synVerb.verb}
                          </button>
                          {index < verb.synonyms.length - 1 ? ", " : ""}
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

export default Verb;
