import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Wrench, Award } from 'lucide-react';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      title: 'Perfiles de Aluminio',
      description: 'Perfiles estructurales y decorativos de alta calidad para todo tipo de construcciones.',
      image: 'https://images.pexels.com/photos/1078538/pexels-photo-1078538.jpeg?auto=compress&cs=tinysrgb&w=500',
      features: ['Resistencia superior', 'Múltiples acabados', 'Fácil instalación'],
      icon: Shield
    },
    {
      id: 2,
      title: 'Soluciones en Vidrio',
      description: 'Vidrio templado, laminado y decorativo para espacios modernos y funcionales.',
      image: 'https://images.pexels.com/photos/210158/pexels-photo-210158.jpeg?auto=compress&cs=tinysrgb&w=500',
      features: ['Vidrio templado', 'Diseños personalizados', 'Instalación profesional'],
      icon: Award
    },
    {
      id: 3,
      title: 'Fabricación Personalizada',
      description: 'Diseños únicos adaptados a tus necesidades específicas con la mejor calidad.',
      image: 'https://images.pexels.com/photos/1117452/pexels-photo-1117452.jpeg?auto=compress&cs=tinysrgb&w=500',
      features: ['Diseño exclusivo', 'Medidas precisas', 'Acabados premium'],
      icon: Wrench
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
            Nuestros Productos Destacados
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-open-sans">
            Descubre nuestra amplia gama de soluciones en aluminio y vidrio, 
            diseñadas para satisfacer las necesidades más exigentes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => {
            const IconComponent = product.icon;
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-yellow-400 p-2 rounded-lg">
                    <IconComponent className="w-6 h-6 text-black" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 font-poppins">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-4 font-open-sans">
                    {product.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to="/products"
                    className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors duration-300"
                  >
                    Ver más detalles
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-flex items-center bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-300"
          >
            Ver Todos los Productos
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;