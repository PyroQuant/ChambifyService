import { motion } from "framer-motion";

const Promo = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="bg-lightBg rounded-xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="font-poppins font-bold text-3xl mb-4">
                ¿Listo para mover tus objetos pesados?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Contáctanos ahora y obtén una respuesta en menos de 15 minutos.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <motion.a
                  href="tel:+56966261804"
                  className="bg-primary text-white py-4 px-6 rounded-lg text-center font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-phone-alt"></i> +56 9 6626 1804
                </motion.a>
                <motion.a
                  href="tel:+56942987869"
                  className="bg-primary text-white py-4 px-6 rounded-lg text-center font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-phone-alt"></i> +56 9 4298 7869
                </motion.a>
                <motion.a
                  href="https://wa.me/56966261804"
                  className="bg-green-500 text-white py-4 px-6 rounded-lg text-center font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fab fa-whatsapp"></i> WhatsApp 1
                </motion.a>
                <motion.a
                  href="https://wa.me/56942987869"
                  className="bg-green-500 text-white py-4 px-6 rounded-lg text-center font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fab fa-whatsapp"></i> WhatsApp 2
                </motion.a>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
                alt="Clientes felices recibiendo su entrega"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Promo;
