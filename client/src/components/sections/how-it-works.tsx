import { motion } from "framer-motion";

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="como-funciona" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
            ¿Cómo funciona <span className="text-primary">Chambify</span>?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Solo 3 simples pasos para resolver tu problema de carga pesada
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Step 1 */}
          <motion.div 
            className="bg-lightBg rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            variants={itemVariants}
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="font-poppins font-bold text-2xl text-primary">1</span>
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-4 text-center">
              Llámanos o escríbenos
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              Contáctanos por teléfono o WhatsApp para solicitar el servicio que
              necesitas.
            </p>
            <div className="flex flex-col justify-center gap-3 w-full mx-auto">
              <a
                href="tel:+56966261804"
                className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-phone-alt"></i> +56 9 6626 1804
              </a>
              <a
                href="tel:+56942987869"
                className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-phone-alt"></i> +56 9 4298 7869
              </a>
              <a
                href="https://wa.me/56966261804"
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <i className="fab fa-whatsapp"></i> WhatsApp 1
              </a>
              <a
                href="https://wa.me/56942987869"
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <i className="fab fa-whatsapp"></i> WhatsApp 2
              </a>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            className="bg-lightBg rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            variants={itemVariants}
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="font-poppins font-bold text-2xl text-primary">2</span>
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-4 text-center">
              Recibe confirmación rápida
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              En menos de 15 minutos recibirás la confirmación de tu servicio.
            </p>
            <img
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300&q=80"
              alt="Confirmación en smartphone"
              className="rounded-lg mx-auto shadow"
            />
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            className="bg-lightBg rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            variants={itemVariants}
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
              <span className="font-poppins font-bold text-2xl text-primary">3</span>
            </div>
            <h3 className="font-poppins font-semibold text-xl mb-4 text-center">
              Recibe a los Chamber
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              Nuestros estudiantes verificados llegarán a tu domicilio para
              realizar el servicio.
            </p>
            <img
              src="/images/chambers_pareja_humanos.png"
              alt="Chambers pareja humanos"
              className="rounded-lg mx-auto shadow object-cover"
              style={{ width: '100%', maxWidth: 500, height: 300 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
