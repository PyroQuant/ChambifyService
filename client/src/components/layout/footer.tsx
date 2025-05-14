import ChambifyLogo from "../ui/chambify-logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="md:flex md:justify-between mb-8">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <ChambifyLogo size="sm" />
            </div>
            <p className="text-gray-400 max-w-md">
              La forma más rápida y segura de trasladar objetos pesados dentro de tu hogar, con estudiantes universitarios verificados.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium text-lg mb-4">Enlaces</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#como-funciona"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ¿Cómo funciona?
                  </a>
                </li>
                <li>
                  <a
                    href="#beneficios"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Beneficios
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonios"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Testimonios
                  </a>
                </li>
                <li>
                  <a
                    href="#registro"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Registro
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-4">Contacto</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-phone-alt mr-2 text-gray-400"></i>
                  <a
                    href="tel:+56966261804"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    +56 9 6626 1804
                  </a>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone-alt mr-2 text-gray-400"></i>
                  <a
                    href="tel:+56942987869"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    +56 9 4298 7869
                  </a>
                </li>
                <li className="flex items-center">
                  <i className="fab fa-whatsapp mr-2 text-gray-400"></i>
                  <a
                    href="https://wa.me/56966261804"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    WhatsApp 1
                  </a>
                </li>
                <li className="flex items-center">
                  <i className="fab fa-whatsapp mr-2 text-gray-400"></i>
                  <a
                    href="https://wa.me/56942987869"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    WhatsApp 2
                  </a>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-2 text-gray-400"></i>
                  <a
                    href="mailto:contacto@chambify.cl"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    contacto@chambify.cl
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className="fab fa-instagram text-2xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className="fab fa-facebook text-2xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <i className="fab fa-tiktok text-2xl"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Chambify. Todos los derechos reservados.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-white transition-colors">
              Términos y condiciones
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Política de privacidad
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
