import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1603796846097-bee99e4a601f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
          alt="Estudiante universitario moviendo objetos"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="md:flex items-center">
          <motion.div 
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-poppins font-bold text-4xl md:text-5xl leading-tight mb-4">
              Traslado de carga pesada hecho por{" "}
              <span className="text-secondary">estudiantes verificados</span>
            </h1>
            <p className="text-lg md:text-xl mb-8">
              La solución rápida, confiable y segura para mover tus objetos
              pesados dentro de tu hogar. Estudiantes universitarios verificados
              a tu servicio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#registro"
                className="bg-orange-600 text-white font-bold py-4 px-8 rounded-lg text-center text-lg hover:bg-orange-700 transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Registrate y obtén $20.000
              </motion.a>
              <motion.a
                href="tel:+56912345678"
                className="bg-gray-100 text-primary font-bold py-4 px-8 rounded-lg text-center text-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-phone-alt"></i> Llamar ahora
              </motion.a>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2 md:pl-12"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="https://images.unsplash.com/photo-1560440021-33f9b867899d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
              alt="Estudiante moviendo muebles con entusiasmo"
              className="rounded-xl shadow-2xl w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
