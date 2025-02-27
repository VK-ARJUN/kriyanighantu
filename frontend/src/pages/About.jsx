import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl text-gray-800">
      {/* Heading */}
      <motion.h1 
        className="text-4xl font-bold text-center text-blue-600 mb-6"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        About This App
      </motion.h1>

      {/* Description */}
      <motion.p 
        className="text-lg text-center text-gray-600 leading-relaxed"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        This application is an advanced <b>Sanskrit Thesaurus</b>, designed to help users explore Sanskrit verbs and their relationships. Built using the <b>MERN stack</b>, it integrates <b>MongoDB</b> for data storage and <b>Neo4j</b> for graph-based verb relationships.
      </motion.p>

      {/* Features Section */}
      <div className="mt-10 space-y-6">
        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4"
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <span className="text-blue-500 text-3xl">🔍</span>
          <p className="text-gray-700 font-medium">
            <b>Search for Sanskrit Verbs & Lookups</b> with instant retrieval.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4"
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <span className="text-green-500 text-3xl">🔗</span>
          <p className="text-gray-700 font-medium">
            <b>Graph-based Synonym Navigation</b> using <b>Neo4j</b>.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4"
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <span className="text-purple-500 text-3xl">⌨️</span>
          <p className="text-gray-700 font-medium">
            <b>Integrated Sanskrit Keyboard</b> for easy input.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4"
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <span className="text-red-500 text-3xl">📚</span>
          <p className="text-gray-700 font-medium">
            <b>Dynamic Data Updates</b> ensuring real-time changes.
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div 
        className="mt-12 text-center text-gray-500"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.8, delay: 1.3 }}
      >
        Built with ❤️ by <b>IIIT Kottayam and CIFSS</b> | Powered by <b>MERN & Neo4j</b>
      </motion.div>
    </div>
  );
};

export default About;
