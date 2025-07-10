import React, { useState } from 'react';
import { ExternalLink, Calendar, MapPin } from 'lucide-react';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = [
    { id: 'all', name: 'Todos' },
    { id: 'residential', name: 'Residencial' },
    { id: 'commercial', name: 'Comercial' },
    { id: 'industrial', name: 'Industrial' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Torre Empresarial Plaza Mayor',
      category: 'commercial',
      location: 'Cali, Valle del Cauca',
      year: '2023',
      description: 'Fachada integral con sistema de muro cortina en aluminio y vidrio templado.',
      image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=600',
      details: ['Área: 2,500 m²', 'Altura: 15 pisos', 'Vidrio: Templado 8mm']
    },
    {
      id: 2,
      title: 'Residencial Campestre Los Álamos',
      category: 'residential',
      location: 'Jamundí, Valle del Cauca',
      year: '2023',
      description: 'Ventanería completa en aluminio con doble acristalamiento para 120 apartamentos.',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
      details: ['120 apartamentos', 'Ventanas: 480 unidades', 'Área: 3,200 m²']
    },
    {
      id: 3,
      title: 'Centro Comercial Palmetto Plaza',
      category: 'commercial',
      location: 'Cali, Valle del Cauca',
      year: '2022',
      description: 'Estructura de aluminio para techos y fachadas con vidrio laminado de seguridad.',
      image: 'https://images.pexels.com/photos/1438248/pexels-photo-1438248.jpeg?auto=compress&cs=tinysrgb&w=600',
      details: ['Área: 8,000 m²', 'Locales: 150', 'Vidrio: Laminado 6+6mm']
    },
    {
      id: 4,
      title: 'Planta Industrial Tecnoquímicas',
      category: 'industrial',
      location: 'Yumbo, Valle del Cauca',
      year: '2022',
      description: 'Cerramientos industriales con perfiles de aluminio de alta resistencia.',
      image: 'https://images.pexels.com/photos/1117452/pexels-photo-1117452.jpeg?auto=compress&cs=tinysrgb&w=600',
      details: ['Área: 5,000 m²', 'Naves: 4', 'Perfiles: Estructurales 6061-T6']
    },
    {
      id: 5,
      title: 'Hotel Boutique Casa Blanca',
      category: 'commercial',
      location: 'Cali, Valle del Cauca',
      year: '2021',
      description: 'Mamparas de baño y divisiones interiores en vidrio templado con acabados premium.',
      image: 'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=600',
      details: ['45 habitaciones', 'Mamparas: 90 unidades', 'Herrajes: Acero inoxidable']
    },
    {
      id: 6,
      title: 'Conjunto Residencial Alameda',
      category: 'residential',
      location: 'Palmira, Valle del Cauca',
      year: '2021',
      description: 'Ventanas y puertas en aluminio con sistemas de seguridad integrados.',
      image: 'https://images.pexels.com/photos/2760241/pexels-photo-2760241.jpeg?auto=compress&cs=tinysrgb&w=600',
      details: ['200 viviendas', 'Ventanas: 800 unidades', 'Puertas: 200 unidades']
    }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-poppins">
            Nuestro Portafolio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-open-sans">
            Descubre los proyectos que hemos realizado con éxito, desde construcciones residenciales 
            hasta complejos comerciales e industriales.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  {filters.find(f => f.id === project.category)?.name || 'Proyecto'}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-poppins">
                  {project.title}
                </h3>
                
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {project.location}
                </div>
                
                <div className="flex items-center text-gray-600 text-sm mb-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {project.year}
                </div>
                
                <p className="text-gray-600 mb-4 font-open-sans">
                  {project.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Detalles del Proyecto:</h4>
                  <ul className="space-y-1">
                    {project.details.map((detail, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-red-600 rounded-full mr-3"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center space-x-2">
                  <span>Ver Detalles</span>
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-red-600 to-red-700 text-white p-8 md:p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4 font-poppins">
            ¿Tienes un Proyecto en Mente?
          </h2>
          <p className="text-xl mb-6 font-open-sans">
            Nos encantaría ser parte de tu próximo proyecto. Contáctanos para una consulta gratuita.
          </p>
          <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-300">
            Iniciar Proyecto
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;