// import { Link, useLocation } from "react-router-dom";
// import { FaPaw } from "react-icons/fa";

// const navItems = [
//   { name: "Home", path: "/" },
//   { name: "Menu", path: "/browse" },
//   { name: "Community", path: "/community" },
//   { name: "About Us", path: "/about" },
// ];

// const Navbar = () => {
//   const location = useLocation();

//   return (
//     <header className="bg-white shadow-md fixed w-full top-0 z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
//         <Link to="/" className="flex items-center space-x-2">
//           <FaPaw className="text-2xl text-orange-500" />
//           <span className="text-2xl font-bold text-orange-500">PawPal</span>
//         </Link>

//         <nav className="flex space-x-6">
//           {navItems.map((item) => (
//             <Link
//               key={item.name}
//               to={item.path}
//               className={`text-base font-medium transition-all duration-200 ${
//                 location.pathname === item.path
//                   ? "text-orange-500 border-b-2 border-orange-500 pb-1"
//                   : "text-gray-700 hover:text-orange-500"
//               }`}
//             >
//               {item.name}
//             </Link>
//           ))}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;




import { useState, useRef, useEffect } from "react";
import { FaUser, FaLock } from 'react-icons/fa';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function closeOnOutsideClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl h-16 px-4 flex items-center justify-between">
        
        {/* Left: Logo */}
        <a href="/" className="flex items-center gap-2 font-semibold text-orange-600">
          <span className="text-2xl">🐾</span>
          <span className="text-xl">PawPal</span>
        </a>

        {/* Center: Navigation */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <a href="/" className="hover:text-orange-500">Home</a>
          <a href="/community" className="hover:text-orange-500">Community</a>
          <a href="/about" className="hover:text-orange-500">About Us</a>
        </div>

        {/* Right: Extra Button with dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <div className="space-y-1.5">
              <span className="block h-0.5 w-6 bg-gray-800 rounded"></span>
              <span className="block h-0.5 w-6 bg-gray-800 rounded"></span>
              <span className="block h-0.5 w-6 bg-gray-800 rounded"></span>
            </div>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 rounded-xl border bg-white shadow-lg ring-1 ring-black/5 overflow-hidden">
              <a
                href="/login"
                className="block px-4 py-2.5 text-sm hover:bg-gray-50"
              >
             <div className="flex gap-4"> <FaUser/>Login</div>
              </a>
              {/* <a
                href="/profile"
                className="block px-4 py-2.5 text-sm hover:bg-gray-50"
              >
                Profile
              </a> */}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
