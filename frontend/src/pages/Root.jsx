import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import SanskritKeyboard from "../components/SanskritKeyboard.jsx";

const Root = () => {
  const [roots, setRoots] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRoot, setExpandedRoot] = useState(null);

  useEffect(() => {
    fetchRoots();
  }, []);

  const fetchRoots = async () => {
    try {
      const response = await axios.get("/api/roots");
      setRoots(response.data);
    } catch (error) {
      console.error("Error fetching roots:", error);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query === "") {
      fetchRoots();
      return;
    }

    try {
      const response = await axios.get(`/api/roots/search?query=${query}`);
      setRoots(response.data);
    } catch (error) {
      console.error("Error searching roots:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Sanskrit Roots</h1>

      <div className="flex flex-col items-center">
        <div className="relative w-full md:w-2/3 lg:w-1/2">
            <input
                type="text"
                className="pl-10 pr-4 py-2 border-4 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Search for a root..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        <div className="w-full mt-4">
          <SanskritKeyboard onKeyClick={(char) => handleSearch(searchQuery + char)} />
        </div>

        <div className="w-full mt-6 space-y-4">
          {roots.map((root) => (
            <div key={root.root} className="border p-4 rounded-lg shadow-md bg-blue-100 w-full md:w-3/4 mx-auto">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">{root.root}</h2>
                <button 
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
                  onClick={() => setExpandedRoot(expandedRoot === root.root ? null : root.root)}
                >
                  {expandedRoot === root.root ? "Close" : "View"}
                </button>
              </div>

              {expandedRoot === root.root && (
                <div className="mt-2 text-gray-700">
                  <p><strong>Ganam:</strong> {root.ganam}</p>
                  <p><strong>Root Index:</strong> {root.rootIndex}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Root;
