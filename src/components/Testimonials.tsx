import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'María González',
      company: 'Constructora Élite',
      role: 'Gerente de Proyectos',
      content: 'Excelente calidad en todos sus productos. Hemos trabajado con ellos en múltiples proyectos y siempre superan nuestras expectativas.',
      rating: 5,
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 2,
      name: 'Carlos Rodríguez',
      company: 'Arquitectos Modernos',
      role: 'Arquitecto Principal',
      content: 'Su equipo técnico es excepcional. Nos ayudaron a materializar diseños complejos con soluciones innovadoras en aluminio y vidrio.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 3,
      name: 'Ana Patricia Méndez',
      company: 'Residencial San Carlos',
      role: 'Propietaria',
      content: 'Transformaron completamente nuestra fachada. El trabajo fue impecable y el servicio post-venta excepcional.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto font-open-sans">
            La satisfacción de nuestros clientes es nuestra mayor recompensa. 
            Conoce sus experiencias trabajando con nosotros.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-2xl p-8 md:p-12 relative">
            <div className="flex items-center justify-center mb-6">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, index) => (
                <Star key={index} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>

            <blockquote className="text-center">
              <p className="text-lg md:text-xl text-gray-100 mb-8 font-open-sans leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </p>
              
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="font-semibold text-white font-poppins">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="text-yellow-400 text-sm font-semibold">
                    {testimonials[currentTestimonial].company}
                  </p>
                </div>
              </div>
            </blockquote>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors duration-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-full transition-colors duration-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === currentTestimonial ? 'bg-yellow-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;