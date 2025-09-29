import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logo} 
                alt="Central de Aluminios del Valle" 
                className="h-14 w-auto"
              />
              <div>
                <p className="text-sm text-gray-300">Central de Aluminios del Valle</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Especialistas en soluciones de aluminio y vidrio para construcción y arquitectura.
              Más de 20 años de experiencia en el Valle del Cauca.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-poppins">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                  Portafolio
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-poppins">Servicios</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Perfiles de Aluminio</li>
              <li>Soluciones en Vidrio</li>
              <li>Fabricación Personalizada</li>
              <li>Instalación Profesional</li>
              <li>Mantenimiento</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 font-poppins">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Cra. 5 # 32-33, Esmeralda<br />
                  Cali, Valle del Cauca, Colombia
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">+57 301 3318155</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">centraldealuminioscyg@gmail.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <p className="text-gray-300 text-sm">Lun - Vie: 8:00 AM - 6:00 PM</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3">Síguenos</h5>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            &copy; 2024 Central de Aluminios del Valle. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;