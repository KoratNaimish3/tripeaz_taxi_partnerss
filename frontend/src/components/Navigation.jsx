import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, Logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
      // The Home component will handle scrolling via useEffect
      setIsMobileMenuOpen(false);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    Logout();
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-brand-yellow rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">T</span>
              </div>
              <span className="ml-2 text-xl font-bold text-black">
                Tripeaz Taxi Partners
              </span>
            </div>
          </Link>



          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollToSection("blog")}
              className="text-gray-700 hover:text-brand-yellow px-4 py-2 text-sm font-medium transition-colors duration-200"
            >
              Blog
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-700 hover:text-brand-yellow px-4 py-2 text-sm font-medium transition-colors duration-200"
            >
              Contact us
            </button>

            {user ? (
              <>
                <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700">
                  <User size={18} />
                  <span>{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-brand-yellow px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-brand-yellow px-4 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-brand-yellow text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-brand-yellow p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {location.pathname === "/" && (
              <>
                <button
                  onClick={() => scrollToSection("hero")}
                  className="text-gray-700 hover:text-brand-yellow block px-3 py-2 text-base font-medium w-full text-left"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("problems")}
                  className="text-gray-700 hover:text-brand-yellow block px-3 py-2 text-base font-medium w-full text-left"
                >
                  Problems
                </button>
                <button
                  onClick={() => scrollToSection("solutions")}
                  className="text-gray-700 hover:text-brand-yellow block px-3 py-2 text-base font-medium w-full text-left"
                >
                  Solutions
                </button>
                <button
                  onClick={() => scrollToSection("why-trust")}
                  className="text-gray-700 hover:text-brand-yellow block px-3 py-2 text-base font-medium w-full text-left"
                >
                  Why Trust Us
                </button>
                <button
                  onClick={() => scrollToSection("blog")}
                  className="text-gray-700 hover:text-brand-yellow block px-3 py-2 text-base font-medium w-full text-left"
                >
                  Blog
                </button>
                <button
                  onClick={() => scrollToSection("pricing")}
                  className="text-gray-700 hover:text-brand-yellow block px-3 py-2 text-base font-medium w-full text-left"
                >
                  Pricing
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-gray-700 hover:text-brand-yellow block px-3 py-2 text-base font-medium w-full text-left"
                >
                  Contact
                </button>
              </>
            )}
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 text-base text-gray-700">
                  <User size={18} />
                  <span>{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-brand-yellow block px-3 py-2 text-base font-medium w-full text-left flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-brand-yellow block px-3 py-2 text-base font-medium w-full text-left"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="bg-brand-yellow text-black block px-3 py-2 text-base font-medium w-full text-left rounded-lg mt-4"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}



