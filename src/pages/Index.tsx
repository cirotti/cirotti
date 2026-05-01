import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Process from "@/components/sections/Process"
import WhyMe from "@/components/sections/WhyMe"
import ScrollProgress from '@/components/ScrollProgress';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Work from '@/components/sections/Work';
import Contact from '@/components/sections/Contact';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Prevent scroll during preloader
    if (!isLoaded) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    // Configure ScrollTrigger for performance
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
    });

    // Debounced resize handler
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoaded]);

  return (
    <>
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      <div className={`noise-overlay ${isLoaded ? '' : 'invisible'}`}>

        <Navbar isLoaded={isLoaded} />
        <ScrollProgress />

        <main>
          <Hero isLoaded={isLoaded} />
          <About />
          <Work />
          <Process />
          <WhyMe />
          <Contact />
        </main>
      </div>
    </>
  );
};

export default Index;
