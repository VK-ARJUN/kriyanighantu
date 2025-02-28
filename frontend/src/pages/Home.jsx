import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const navigate = useNavigate();

  const options = [
    { title: "Search By Root", path: "/roots", color: "bg-blue-200" },
    { title: "Search By Verb", path: "/verbs", color: "bg-green-200" },
    { title: "Search By Meaning", path: "/lookups", color: "bg-blue-200" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center bg-slate-50 px-4">
        <motion.h1 className="text-4xl md:text-5xl font-bold text-slate-700 mb-6 text-center" initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}>
          Welcome to Kriyanighantu
        </motion.h1>
        <motion.h2 className="text-xl md:text-2xl font-semibold text-slate-400 mb-4 text-center" initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}>
          Thesaurus of Synonymous Sanskrit Verbs
        </motion.h2>
        <motion.p className="text-base md:text-lg text-slate-600 mb-4 text-center" initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}>
          Search for Sanskrit Verbs, Roots, or Meanings
        </motion.p>

        {/* Search Option Cards Below */}
<div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-6">
  {options.map((option, index) => (
    <motion.div
      key={option.title}
      initial={{ x: 100, opacity: 0 }}  // Start 100px to the right, invisible
      animate={{ x: 0, opacity: 1 }}   // Move to final position, fully visible
      transition={{ duration: 0.5, delay: index * 0.1 }} // Stagger effect
      className={`w-64 h-32 flex items-center justify-center ${option.color} text-lg font-semibold rounded-lg shadow-lg cursor-pointer transition-transform`}
      whileHover={{ scale: 1.1 }} // Scale up on hover
      onClick={() => navigate(option.path)}
    >
      {option.title}
    </motion.div>
  ))}
</div>
      </main>

      {/* Footer Section (Stays at Bottom) */}
      <motion.footer className="bg-slate-200 text-slate-700 py-6 text-center" initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}>
        <p>
          A collaborative project between IIIT Kottayam and CIFSS, sponsored by Central Sanskrit University
        </p>
      </motion.footer>
    </div>
  );
};

export default Home;
