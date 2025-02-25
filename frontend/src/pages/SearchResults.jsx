import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResults = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q");
  const searchType = location.pathname.slice(1); // "verbs", "roots", or "lookups"

  useEffect(() => {
    if (!query) return;

    console.log("Fetching results for:", query);
    console.log("Search type:", searchType);

    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/server/api/${searchType}?q=${query}`);
        const result = await response.json();
        if (response.ok) {
          setData(result);
        } else {
          setError(result.error || "Something went wrong");
        }
      } catch (err) {
        setError("Failed to fetch results");
      }
      setLoading(false);
    };

    fetchResults();
  }, [query, searchType]);

  if (!query) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl text-gray-600">
        No search query provided.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-700 text-center mb-6">
        {`Search Results for "${query}" (${searchType})`}
      </h2>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Display Verb Details if searching for a verb */}
      {!loading && !error && searchType === "verbs" && data && (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-bold text-slate-700 mb-4">{data.verb}</h2>
          <p className="text-lg text-slate-600"><strong>Meaning:</strong> {data.meaning}</p>
          <p className="text-lg text-slate-600"><strong>Gana:</strong> {data.ganam}</p>
          <p className="text-lg text-slate-600"><strong>Example:</strong> {data.example}</p>

          {/* Display Synonyms */}
          <h3 className="text-2xl font-semibold text-slate-700 mt-6 mb-3">Synonymous Verbs</h3>
          <div className="flex flex-wrap">
            {data.synonyms?.length > 0 ? (
              data.synonyms.map((syn, index) => (
                <button
                  key={index}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg m-1 hover:bg-blue-600"
                  onClick={() => navigate(`/verbs?q=${syn}`)}
                >
                  {syn}
                </button>
              ))
            ) : (
              <p className="text-gray-500">No synonyms found.</p>
            )}
          </div>
        </div>
      )}

      {/* Display simple list for Roots & Lookups */}
      {!loading && !error && searchType !== "verbs" && data && (
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
          {data.length === 0 ? (
            <p className="text-center text-gray-500">No results found.</p>
          ) : (
            data.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b last:border-b-0 py-3"
              >
                <p className="text-lg font-medium text-slate-700">{item.lookup || item.root}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
