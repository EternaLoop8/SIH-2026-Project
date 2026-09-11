import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo1 from "../../assets/Logo1.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b border-gray-100 bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="shrink-0 flex items-center">
            <img
              className="h-15 w-auto object-contain cursor-pointer"
              src={Logo1}
              alt="Logo"
            />
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex space-x-8 text-sm font-medium text-gray-600">
            <li
              className="hover:text-blue-600 cursor-pointer transition-colors"
              onClick={() => navigate("/explore")}
            >
              Explore
            </li>
            <li
              className="hover:text-blue-600 cursor-pointer transition-colors"
              onClick={() => navigate("/experience")}
            >
              Experience
            </li>
            <li
              className="hover:text-blue-600 cursor-pointer transition-colors"
              onClick={() => navigate("/event")}
            >
              Events
            </li>
            <li
              className="hover:text-blue-600 cursor-pointer transition-colors"
              onClick={() => navigate("/business")}
            >
              Business
            </li>
            <li
              className="hover:text-blue-600 cursor-pointer transition-colors"
              onClick={() => navigate("/plan")}
            >
              Plan Trip
            </li>
          </ul>

          {/* Desktop Actions (Search + Buttons) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Input with Icon */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                className="w-48 lg:w-64 pl-9 pr-4 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                type="text"
                placeholder="Search..."
              />
            </div>

            {/* Secondary Button */}
            <button
              className="text-sm font-medium text-gray-700 bg-gray-50 border border-gray-300 hover:bg-gray-100 transition-colors px-4 py-2 rounded-lg shadow-sm cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            {/* Primary CTA Button */}
            <button 
              className="text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm transition-colors cursor-pointer"
              onClick={() => navigate("/become-partner")}
              >
              Become a Partner
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden border-t border-gray-100 bg-gray-50 px-4 pt-2 pb-4 space-y-3`}
      >
        <div className="pt-2 pb-3 space-y-1">
          <ul className="space-y-2 text-base font-medium text-gray-600">
            <li
              className="block px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600 cursor-pointer"
              onClick={() => navigate("/explore")}
            >
              Explore
            </li>
            <li
              className="block px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600 cursor-pointer"
              onClick={() => navigate("/experience")}
            >
              Experience
            </li>
            <li
              className="block px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600 cursor-pointer"
              onClick={() => navigate("/event")}
            >
              Events
            </li>
            <li
              className="block px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600 cursor-pointer"
              onClick={() => navigate("/business")}
            >
              Business
            </li>
            <li
              className="block px-3 py-2 rounded-md hover:bg-gray-100 hover:text-blue-600 cursor-pointer"
              onClick={() => navigate("/plan")}
            >
              Plan Trip
            </li>
          </ul>
        </div>
        <div className="pt-4 border-t border-gray-200 space-y-3">
          {/* Mobile Search Input with Icon */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none bg-white"
              type="text"
              placeholder="Search..."
            />
          </div>
          <div className="flex flex-col space-y-2">
            <button
              className="w-full text-center text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 py-2 rounded-lg shadow-sm"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button 
              className="w-full text-center text-sm font-medium bg-blue-600 text-white py-2 rounded-lg shadow-sm"
              onClick={() => navigate("/become-partner")}
              >
              Become a Partner
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
