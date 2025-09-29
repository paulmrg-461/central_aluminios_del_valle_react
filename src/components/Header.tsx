import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import logoDark from '../assets/logo_dark.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/products', label: 'Productos' },
    { path: '/inventory', label: 'Inventario' },
    { path: '/about', label: 'Nosotros' },
    { path: '/portfolio', label: 'Portafolio' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contacto' }
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
    }`}>
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2 px-4 text-sm hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+57 301 3318155</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>centraldealuminioscyg@gmail.com</span>
            </div>
          </div>
          <div className="text-sm">
            Horario: Lunes - Viernes 8:00 AM - 6:00 PM
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={logoDark} 
              alt="Central de Aluminios del Valle" 
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors duration-300 hover:text-yellow-400 ${
                  location.pathname === item.path
                    ? 'text-yellow-400 border-b-2 border-yellow-400'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors duration-300"
            >
              Cotizar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-yellow-400 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block py-2 px-4 font-medium transition-colors duration-300 ${
                  location.pathname === item.path
                    ? 'text-yellow-400 bg-yellow-50'
                    : 'text-gray-700 hover:text-yellow-400 hover:bg-gray-50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="block mt-4 mx-4 bg-red-600 text-white px-6 py-2 rounded-lg font-medium text-center hover:bg-red-700 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Cotizar
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;