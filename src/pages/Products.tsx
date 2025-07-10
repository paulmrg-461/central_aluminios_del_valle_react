import React, { useState } from 'react';
import { Search, Filter, ArrowRight } from 'lucide-react';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Todos los Productos' },
    { id: 'aluminum', name: 'Perfiles de Aluminio' },
    { id: 'glass', name: 'Soluciones en Vidrio' },
    { id: 'custom', name: 'Fabricación Personalizada' }
  ];

  const products = [
    {
      id: 1,
      name: 'Perfiles Estructurales',
      category: 'aluminum',
      description: 'Perfiles de alta resistencia para estructuras arquitectónicas',
      image: 'https://images.pexels.com/photos/1078538/pexels-photo-1078538.jpeg?auto=compress&cs=tinysrgb&w=500',
      features: ['Aleación 6061-T6', 'Múltiples dimensiones', 'Acabado anodizado'],
      price: 'Desde $25,000 COP/m'
    },
    {
      id: 2,
      name: 'Ventanas de Aluminio',
      category: 'aluminum',
      description: 'Ventanas con excelente aislamiento térmico y acústico',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=500',
      features: ['Doble acristalamiento', 'Herrajes alemanes', 'Múltiples colores'],
      price: 'Desde $180,000 COP/m²'
    },
    {
      id: 3,
      name: 'Vidrio Templado',
      category: 'glass',
      description: 'Vidrio de seguridad para aplicaciones arquitectónicas',
      image: 'https://images.pexels.com/photos/210158/pexels-photo-210158.jpeg?auto=compress&cs=tinysrgb&w=500',
      features: ['Espesor 4-19mm', 'Resistencia superior', 'Corte personalizado'],
      price: 'Desde $45,000 COP/m²'
    },
    {
      id: 4,
      name: 'Mamparas de Baño',
      category: 'glass',
      description: 'Mamparas elegantes con vidrio templado y acabados premium',
      image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=500',
      features: ['Vidrio 8mm', 'Herrajes inoxidables', 'Instalación incluida'],
      price: 'Desde $320,000 COP/unidad'
    },
    {
      id: 5,
      name: 'Fachadas Integrales',
      category: 'custom',
      description: 'Soluciones completas para fachadas comerciales y residenciales',
      image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=500',
      features: ['Diseño personalizado', 'Cálculos estructurales', 'Instalación profesional'],
      price: 'Cotización personalizada'
    },
    {
      id: 6,
      name: 'Divisiones Oficina',
      category: 'custom',
      description: 'Sistemas modulares para espacios corporativos modernos',
      image: 'https://images.pexels.com/photos/1117452/pexels-photo-1117452.jpeg?auto=compress&cs=tinysrgb&w=500',
      features: ['Vidrio laminado', 'Perfiles anodizados', 'Fácil reconfiguración'],
      price: 'Desde $85,000 COP/m²'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-poppins">
            Nuestros Productos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-open-sans">
            Explora nuestra amplia gama de soluciones en aluminio y vidrio, 
            diseñadas para satisfacer las necesidades más exigentes.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-gray-600 font-medium">Filtrar por:</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-300 ${
                  activeCategory === category.id
                    ? 'bg-yellow-400 text-black'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {categories.find(c => c.id === product.category)?.name || 'Producto'}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-poppins">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-4 font-open-sans">
                  {product.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Características:</h4>
                  <ul className="space-y-1">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-red-600">
                    {product.price}
                  </div>
                  <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-300 flex items-center space-x-2">
                    <span>Cotizar</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 font-open-sans">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;