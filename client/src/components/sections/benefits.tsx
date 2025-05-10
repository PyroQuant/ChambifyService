import { motion } from "framer-motion";

const Benefits = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="beneficios" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-poppins font-bold text-3xl md:text-4xl mb-4">
            Beneficios <span className="text-primary">exclusivos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Todo lo que necesitas para un traslado sin preocupaciones
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="flex" variants={itemVariants}>
            <div className="mr-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="fas fa-bolt text-2xl text-primary"></i>
              </div>
            </div>
            <div>
              <h3 className="font-poppins font-semibold text-xl mb-2">
                Rapidez garantizada
              </h3>
              <p className="text-gray-600">
                Confirmamos tu servicio en menos de 15 minutos. Sabemos que tu
                tiempo es valioso y respondemos acorde a eso.
              </p>
            </div>
          </motion.div>

          <motion.div className="flex" variants={itemVariants}>
            <div className="mr-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="fas fa-shield-alt text-2xl text-primary"></i>
              </div>
            </div>
            <div>
              <h3 className="font-poppins font-semibold text-xl mb-2">
                Seguridad total
              </h3>
              <p className="text-gray-600">
                Todos nuestros Chamber son estudiantes universitarios verificados
                con antecedentes validados y evaluados por la comunidad.
              </p>
            </div>
          </motion.div>

          <motion.div className="flex" variants={itemVariants}>
            <div className="mr-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="fas fa-user-graduate text-2xl text-primary"></i>
              </div>
            </div>
            <div>
              <h3 className="font-poppins font-semibold text-xl mb-2">
                Estudiantes certificados
              </h3>
              <p className="text-gray-600">
                Todos nuestros colaboradores son estudiantes universitarios que
                han pasado por un riguroso proceso de selección.
              </p>
            </div>
          </motion.div>

          <motion.div className="flex" variants={itemVariants}>
            <div className="mr-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="fas fa-home text-2xl text-primary"></i>
              </div>
            </div>
            <div>
              <h3 className="font-poppins font-semibold text-xl mb-2">
                Servicio completo a domicilio
              </h3>
              <p className="text-gray-600">
                Trasladamos tus objetos pesados DENTRO de tu hogar, no te dejamos
                la carga en la puerta como otros servicios.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-16 bg-white rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <h3 className="font-poppins font-bold text-2xl mb-4">
                Chambify vs. Servicios tradicionales
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span>
                    <strong className="text-primary">Chambify:</strong>{" "}
                    Verificamos la identidad de cada Chamber para tu seguridad.
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span>
                    <strong className="text-primary">Chambify:</strong> Ingresamos
                    a tu hogar y ubicamos los objetos donde necesites.
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span>
                    <strong className="text-primary">Chambify:</strong>{" "}
                    Confirmación en minutos, no en horas o días.
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                  <span>
                    <strong className="text-primary">Chambify:</strong>{" "}
                    Seguimiento en tiempo real y soporte durante todo el proceso.
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-times-circle text-red-500 mt-1 mr-3"></i>
                  <span>
                    <strong className="text-gray-500">Otros:</strong> No sabes
                    quién entra a tu casa.
                  </span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-times-circle text-red-500 mt-1 mr-3"></i>
                  <span>
                    <strong className="text-gray-500">Otros:</strong> Dejan tu
                    carga en la entrada.
                  </span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1622675363311-3e1904dc1885?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
                alt="Estudiantes universitarios trabajando en equipo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;
