import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const options = [
    { title: "Search Root", path: "/roots", color: "bg-blue-200" },
    { title: "Search Verb", path: "/verbs", color: "bg-green-200" },
    { title: "Search Lookup", path: "/lookups", color: "bg-blue-200" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center bg-slate-50 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-700 mb-6 text-center">
          Welcome to Kriyanighantu
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-400 mb-4 text-center">
          Thesaurus of Synonymous Sanskrit Verbs
        </h2>
        <p className="text-base md:text-lg text-slate-600 mb-4 text-center">
          Search for Sanskrit Verbs, Roots, or Lookups
        </p>

        {/* Search Option Cards Below */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-6">
          {options.map((option) => (
            <div
              key={option.title}
              className={`w-64 h-32 flex items-center justify-center ${option.color} text-lg font-semibold rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform`}
              onClick={() => navigate(option.path)}
            >
              {option.title}
            </div>
          ))}
        </div>
      </main>

      {/* Footer Section (Stays at Bottom) */}
      <footer className="bg-slate-200 text-slate-700 py-6 text-center">
        <p>
          A collaborative project between IIIT Kottayam and CIFSS, supported by Central Sanskrit University
        </p>
      </footer>
    </div>
  );
};

export default Home;
