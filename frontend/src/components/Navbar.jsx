import { Link } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full px-9 bg-slate-200 text-slate-700 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-slate-500">Kriyanighantu</h1>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-slate-700 focus:outline-none">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        <ul
          className={`md:flex flex-col md:flex-row items-center space-y-4 md:space-y-0 space-x-0 md:space-x-6 text-lg ${
            isOpen ? "flex" : "hidden"
          } md:flex absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-slate-200 md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none text-center`}
        >
          <li><Link to="/" className="block md:inline hover:text-blue-500 transition p-2" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/about" className="block md:inline hover:text-blue-500 transition p-2" onClick={closeMenu}>About</Link></li>
          <li><Link to="/contact" className="block md:inline hover:text-blue-500 transition p-2" onClick={closeMenu}>Contact</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
