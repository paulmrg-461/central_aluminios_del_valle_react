import React from 'react';
import { Users, Target, Eye, Award } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'José Manuel Rodríguez',
      role: 'Gerente General',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Ingeniero Civil con más de 25 años de experiencia en la industria del aluminio.'
    },
    {
      name: 'María Elena Vásquez',
      role: 'Directora de Proyectos',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Arquitecta especializada en fachadas y sistemas constructivos innovadores.'
    },
    {
      name: 'Carlos Alberto Mejía',
      role: 'Jefe de Producción',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Técnico especializado en fabricación y control de calidad con 15 años de experiencia.'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Misión',
      description: 'Brindar soluciones integrales en aluminio y vidrio con la más alta calidad, innovación y servicio personalizado para satisfacer las necesidades de nuestros clientes en el Valle del Cauca.'
    },
    {
      icon: Eye,
      title: 'Visión',
      description: 'Ser la empresa líder en soluciones de aluminio y vidrio en Colombia, reconocida por nuestra excelencia, innovación y compromiso con el desarrollo sostenible.'
    },
    {
      icon: Award,
      title: 'Valores',
      description: 'Calidad, integridad, innovación, trabajo en equipo, responsabilidad social y compromiso con la excelencia en cada proyecto que emprendemos.'
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-poppins">
            Sobre Nosotros
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-open-sans">
            Conoce la historia, valores y equipo que hacen de Central de Aluminios del Valle 
            tu socio confiable en soluciones de aluminio y vidrio.
          </p>
        </div>

        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 font-poppins">
              Nuestra Historia
            </h2>
            <div className="space-y-4 text-gray-600 font-open-sans">
              <p>
                Fundada en 2003, Central de Aluminios del Valle nació con la visión de transformar 
                la industria de la construcción en el Valle del Cauca mediante soluciones innovadoras 
                en aluminio y vidrio.
              </p>
              <p>
                Durante más de dos décadas, hemos crecido desde un pequeño taller familiar hasta 
                convertirnos en una empresa líder, participando en proyectos emblemáticos de la región 
                y ganando la confianza de constructores, arquitectos y propietarios.
              </p>
              <p>
                Nuestro compromiso con la calidad, la innovación y el servicio personalizado nos ha 
                permitido establecer relaciones duraderas con nuestros clientes y contribuir al 
                desarrollo arquitectónico de la región.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1438248/pexels-photo-1438248.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Nuestra empresa"
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <IconComponent className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 font-poppins">
                  {value.title}
                </h3>
                <p className="text-gray-600 font-open-sans leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-poppins">
              Nuestro Equipo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-open-sans">
              Conoce a los profesionales que hacen posible cada proyecto con su experiencia y dedicación.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-poppins">
                    {member.name}
                  </h3>
                  <p className="text-red-600 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 font-open-sans">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 font-poppins">
              Números Que Nos Respaldan
            </h2>
            <p className="text-xl text-gray-600 font-open-sans">
              Más de 20 años construyendo confianza y excelencia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
              <p className="text-gray-600 font-open-sans">Proyectos Completados</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">98%</div>
              <p className="text-gray-600 font-open-sans">Satisfacción del Cliente</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">20+</div>
              <p className="text-gray-600 font-open-sans">Años de Experiencia</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">50+</div>
              <p className="text-gray-600 font-open-sans">Empleados Especializados</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;