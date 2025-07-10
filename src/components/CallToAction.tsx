import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">
            ¿Listo para Comenzar tu Proyecto?
          </h2>
          <p className="text-xl mb-8 font-open-sans">
            Obtén una cotización personalizada y descubre cómo podemos transformar 
            tus ideas en realidad con nuestras soluciones en aluminio y vidrio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/contact"
              className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-500 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <span>Solicitar Cotización</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+5722341234567"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <Phone className="w-5 h-5" />
              <span>Llamar Ahora</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-2xl font-bold mb-2 font-poppins">500+</h3>
              <p className="text-red-100">Proyectos Completados</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 font-poppins">98%</h3>
              <p className="text-red-100">Satisfacción del Cliente</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 font-poppins">20+</h3>
              <p className="text-red-100">Años de Experiencia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;