import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GlitchText from '../GlitchText';
import MagneticButton from '../MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background number
      gsap.from(numberRef.current, {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Heading animation with split text
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll('.heading-line');
        gsap.from(lines, {
          y: 100,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      const links = linksRef.current?.querySelectorAll('a');
      if (links && links.length > 0) {
        gsap.from(links, {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: linksRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/iamovi' },
    { label: 'Twitter', href: 'https://x.com/hahahaovi' },
    { label: 'Itch.io', href: 'https://iamovi.itch.io' },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-32 relative"
    >
      {/* Large background number */}
      <span
        ref={numberRef}
        className="absolute -left-4 md:left-8 top-1/2 -translate-y-1/2 text-[20rem] md:text-[30rem] font-bold text-muted/5 select-none pointer-events-none leading-none"
      >
        03
      </span>

      <div className="max-w-6xl relative z-10">
        <span className="font-mono text-xs text-muted-foreground tracking-[0.3em] uppercase block mb-8">
          Get in Touch
        </span>

        <h2
          ref={headingRef}
          className="text-4xl md:text-6xl lg:text-8xl font-bold leading-[1] tracking-tighter mb-12 gpu-accelerated"
        >
          <span className="heading-line block overflow-hidden py-1">
            Let's create
          </span>
          <span className="heading-line block overflow-hidden py-1">
            <GlitchText text="something" className="text-stroke" />
          </span>
          <span className="heading-line block overflow-hidden py-1">
            together.
          </span>
        </h2>

        <div className="flex flex-col md:flex-row md:items-center gap-8 mb-16">
          <MagneticButton href="mailto:fornet.ovi@gmail.com">
            fornet.ovi@gmail.com
          </MagneticButton>
        </div>

        <div ref={linksRef} className="flex flex-wrap gap-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 gpu-accelerated"
            >
              <span className="w-2 h-2 rounded-full bg-muted-foreground group-hover:bg-foreground group-hover:scale-125 transition-all duration-300" />
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <footer className="mt-auto pt-32 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-muted-foreground font-mono uppercase tracking-wider">
          <span>© 2026 — Ovi ren</span>
          <span>Designed & Built with precision</span>
        </div>
      </footer>
    </section>
  );
};

export default Contact;
