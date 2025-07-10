import React from 'react';
import { Users, Clock, Medal, Headphones } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Users,
      title: 'Más de 20 Años de Experiencia',
      description: 'Somos líderes en el Valle del Cauca con décadas de experiencia en soluciones de aluminio y vidrio.',
      stat: '20+'
    },
    {
      icon: Clock,
      title: 'Entregas Puntuales',
      description: 'Cumplimos con los tiempos acordados, garantizando que tu proyecto se complete según lo planeado.',
      stat: '98%'
    },
    {
      icon: Medal,
      title: 'Calidad Garantizada',
      description: 'Utilizamos materiales de primera calidad y procesos certificados para asegurar la excelencia.',
      stat: '100%'
    },
    {
      icon: Headphones,
      title: 'Soporte Integral',
      description: 'Desde el diseño hasta la instalación, te acompañamos en cada paso del proceso.',
      stat: '24/7'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
            ¿Por Qué Elegirnos?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-open-sans">
            Somos tu socio confiable para proyectos de construcción y arquitectura 
            con soluciones innovadoras y de alta calidad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <div key={index} className="text-center group">
                <div className="relative mx-auto w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mb-6 group-hover:bg-yellow-500 transition-colors duration-300">
                  <IconComponent className="w-8 h-8 text-black" />
                  <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {reason.stat}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-poppins">
                  {reason.title}
                </h3>
                <p className="text-gray-600 font-open-sans">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 font-poppins">
                Certificaciones y Garantías
              </h3>
              <p className="text-gray-600 mb-6 font-open-sans">
                Nuestros productos cumplen con las normas internacionales más exigentes 
                y ofrecemos garantía completa en todos nuestros trabajos.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">ISO 9001</h4>
                  <p className="text-sm text-gray-600">Gestión de Calidad</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">ICONTEC</h4>
                  <p className="text-sm text-gray-600">Normas Técnicas</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Certificaciones"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;