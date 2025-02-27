import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import SanskritKeyboard from "../components/SanskritKeyboard.jsx";

const Verb = () => {
  const [verbs, setVerbs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedVerb, setExpandedVerb] = useState(null);

  const toggleVerbExpansion = (verbId) => {
    setExpandedVerb(expandedVerb === verbId ? null : verbId); // Ensures only one verb expands
  };

  useEffect(() => {
    fetchVerbs();
  }, []);

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
      return;
    }

    try {
      const response = await axios.get(`/api/verbs/search?query=${query}`);
      setVerbs(response.data);
    } catch (error) {
      console.error("Error searching verbs:", error);
    }
  };

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

        {/* Verbs List */}
        <div className="w-full mt-6 space-y-4">
          {verbs.map((verb) => (
            <div
              key={verb.id}
              className="border p-4 rounded-lg shadow-md bg-gray-100 w-full md:w-3/4 mx-auto"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-600">
                  {verb.verb} ({verb.lookup})
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
                  <p><strong>Lookup:</strong> {verb.lookup}</p>
                  <p><strong>English Meaning:</strong> {verb.lookupMeaning}</p>
                  <p><strong>Root:</strong> {verb.root}</p>
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
                      {verb.seeAlso.map((lookup,index) => (
                        <a
                          key={index}
                          href={`/lookups?query=${lookup}`}
                          className="text-blue-500 ml-2"
                        >
                          {lookup}
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Synonyms */}
                  {verb.synonyms && verb.synonyms.length > 0 && (
                    <div className="mt-2">
                      <strong>Synonyms:</strong>
                      {verb.synonyms.map((synVerb) => (
                        <a
                          key={synVerb.id}
                          href="#"
                          onClick={() => handleSearch(synVerb.verb)}
                          className="text-blue-500 ml-2"
                        >
                          {synVerb.verb} ({synVerb.lookup})
                        </a>
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
