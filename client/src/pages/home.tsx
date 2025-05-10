import { useEffect } from "react";
import Header from "@/components/layout/header";
import HeroSection from "@/components/sections/hero-section";
import HowItWorks from "@/components/sections/how-it-works";
import Benefits from "@/components/sections/benefits";
import Testimonials from "@/components/sections/testimonials";
import Registration from "@/components/sections/registration";
import Promo from "@/components/sections/promo";
import Footer from "@/components/layout/footer";

const Home = () => {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.pageYOffset - 80,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="font-inter text-darkText bg-lightBg">
      <Header />
      <HeroSection />
      <HowItWorks />
      <Benefits />
      <Testimonials />
      <Registration />
      <Promo />
      <Footer />
    </div>
  );
};

export default Home;
