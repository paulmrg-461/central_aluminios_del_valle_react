import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'Tendencias en Arquitectura con Aluminio 2024',
      excerpt: 'Descubre las últimas tendencias en el uso de aluminio para proyectos arquitectónicos modernos.',
      image: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg?auto=compress&cs=tinysrgb&w=500',
      author: 'María Elena Vásquez',
      date: '15 de Enero, 2024',
      readTime: '5 min de lectura'
    },
    {
      id: 2,
      title: 'Ventajas del Vidrio Templado en Construcción',
      excerpt: 'Conoce los beneficios del vidrio templado y por qué es la elección preferida para proyectos modernos.',
      image: 'https://images.pexels.com/photos/210158/pexels-photo-210158.jpeg?auto=compress&cs=tinysrgb&w=500',
      author: 'Carlos Alberto Mejía',
      date: '8 de Enero, 2024',
      readTime: '4 min de lectura'
    },
    {
      id: 3,
      title: 'Mantenimiento de Fachadas de Aluminio',
      excerpt: 'Guía completa para el mantenimiento adecuado de fachadas de aluminio y prolongar su vida útil.',
      image: 'https://images.pexels.com/photos/1438248/pexels-photo-1438248.jpeg?auto=compress&cs=tinysrgb&w=500',
      author: 'José Manuel Rodríguez',
      date: '22 de Diciembre, 2023',
      readTime: '6 min de lectura'
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-poppins">
            Blog y Recursos
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto font-open-sans">
            Mantente al día con las últimas tendencias, consejos y noticias del mundo 
            del aluminio y el vidrio en la construcción.
          </p>
        </div>

        {/* Blog Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  {post.readTime}
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3 font-poppins hover:text-red-600 transition-colors duration-300">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 font-open-sans">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <User className="w-4 h-4 mr-2" />
                  <span className="mr-4">{post.author}</span>
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{post.date}</span>
                </div>
                
                <button className="inline-flex items-center text-red-600 font-semibold hover:text-red-700 transition-colors duration-300">
                  Leer más
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-red-600 to-red-700 text-white p-8 md:p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4 font-poppins">
            Suscríbete a Nuestro Newsletter
          </h2>
          <p className="text-xl mb-6 font-open-sans">
            Recibe las últimas noticias, consejos y actualizaciones directamente en tu correo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-4 py-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors duration-300">
              Suscribirse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;