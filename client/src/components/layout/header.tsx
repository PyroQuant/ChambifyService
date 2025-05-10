import { useState } from "react";
import { Link } from "wouter";
import ChambifyLogo from "../ui/chambify-logo";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center">
            <ChambifyLogo />
          </a>
        </Link>
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#como-funciona" className="hover:text-primary transition-colors">
            ¿Cómo funciona?
          </a>
          <a href="#beneficios" className="hover:text-primary transition-colors">
            Beneficios
          </a>
          <a href="#testimonios" className="hover:text-primary transition-colors">
            Testimonios
          </a>
          <a
            href="#registro"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Regístrate
          </a>
        </div>
        <button
          className="md:hidden text-darkText"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } md:hidden bg-white px-4 py-2 shadow-inner`}
      >
        <a
          href="#como-funciona"
          className="block py-2 hover:text-primary transition-colors"
          onClick={closeMobileMenu}
        >
          ¿Cómo funciona?
        </a>
        <a
          href="#beneficios"
          className="block py-2 hover:text-primary transition-colors"
          onClick={closeMobileMenu}
        >
          Beneficios
        </a>
        <a
          href="#testimonios"
          className="block py-2 hover:text-primary transition-colors"
          onClick={closeMobileMenu}
        >
          Testimonios
        </a>
        <a
          href="#registro"
          className="block py-2 text-primary font-medium"
          onClick={closeMobileMenu}
        >
          Regístrate
        </a>
      </div>
    </header>
  );
};

export default Header;
