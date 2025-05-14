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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl md:mx-0 mx-auto">
              <motion.a
                href="tel:+56966261804"
                className="w-full bg-gray-100 text-primary font-bold py-4 px-8 rounded-lg text-center text-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-phone-alt"></i> Llamar +56 9 6626 1804
              </motion.a>
              <motion.a
                href="tel:+56942987869"
                className="w-full bg-gray-100 text-primary font-bold py-4 px-8 rounded-lg text-center text-lg flex items-center justify-center gap-2 transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-phone-alt"></i> Llamar +56 9 4298 7869
              </motion.a>
              <motion.a
                href="#registro"
                className="col-span-1 sm:col-span-2 bg-orange-600 text-white font-bold py-5 px-8 rounded-xl text-center text-lg md:text-xl hover:bg-orange-700 transition-colors shadow-lg w-full mt-4"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Preinscríbete y asegura tu bono de $20.000 para el lanzamiento<br/>
                <span className="text-xs font-normal block mt-1">Recibirás tu bono cuando la app esté disponible oficialmente. ¡Te avisaremos!</span>
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
              src="/images/chamber_persona.png"
              alt="Persona de Chambify"
              className="rounded-xl shadow-2xl w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
