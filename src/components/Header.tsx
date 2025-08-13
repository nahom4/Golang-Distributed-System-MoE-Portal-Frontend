import { useState, useEffect } from "react";
import { Menu, X, FileText, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  interface MyJwtPayload extends JwtPayload {
    username: string;
  }
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      let decodedToken = jwtDecode(token) as JwtPayload & { username: string };;
      if (decodedToken.username === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`header-nav fixed top-0 left-0 right-0 z-50 px-4 py-3 ${
        isScrolled ? "scrolled" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full">
            <img
              src="Ministry_of_Education_(Ethiopia).png"
              alt="Ministry Logo"
            />
          </div>
          <div className="flex flex-col cursor-pointer" onClick={() => window.location.href = "/"} >
            <span className="logo-text">Ethiopian Ministry of Education</span>
            <span className="text-xs text-gray-500">Results Portal</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link
            to="/result"
            className="nav-link flex items-center space-x-2 text-gray-600 hover:text-green-600"
          >
            <FileText className="w-4 h-4" />
            <span>Check Results</span>
          </Link>

          <Link
            to="/petitions"
            className="nav-link flex items-center space-x-2 text-gray-600 hover:text-green-600"
          >
            <FileText className="w-4 h-4" />
            <span>Submit Petition</span>
          </Link>

          {isAdmin && (
            <Link
              to="/upload"
              className="nav-link flex items-center space-x-2 text-gray-600 hover:text-green-600"
            >
              <FileText className="w-4 h-4" />
              <span>Upload Result</span>
            </Link>
          )}

          {isLoggedIn ? (
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="nav-link flex items-center space-x-2 text-red-600 hover:text-red-700"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </Button>
          ) : (
            <Link
              to="/login"
              className="nav-link flex items-center space-x-2 text-gray-600 hover:text-green-600"
            >
              <span>Login</span>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg">
          <nav className="px-4 py-3 space-y-2">
            <Link
              to="/result"
              className="block py-2 px-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
            >
              Check Results
            </Link>
            <Link
              to="/petitions"
              className="block py-2 px-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
            >
              Submit Petition
            </Link>
            {isAdmin && (
              <Link
                to="/upload"
                className="block py-2 px-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
              >
                Upload Result
              </Link>
            )}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="w-full text-left block py-2 px-3 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                Log Out
              </button>
            ) : (
              <Link
                to="/login"
                className="block py-2 px-3 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
              >
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
