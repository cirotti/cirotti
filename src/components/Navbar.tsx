import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  isLoaded?: boolean;
}

const Navbar = ({ isLoaded = true }: NavbarProps) => {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isLoaded || !navRef.current) return;

    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out',
    });
  }, [isLoaded]);

  useEffect(() => {
    if (!isOpen || !menuRef.current) return;

    const links = menuRef.current.querySelectorAll('.menu-link');
    if (!links.length) return;

    gsap.from(links, {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
    });
  }, [isOpen]);

  const navLinks = [
    { label: 'Sobre Mi', href: '#about' },
    { label: 'Proyectos', href: '#work' },
    { label: 'Contacto', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 lg:px-24 py-6 bg-background/50 backdrop-blur-md"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        {/* Logo / hover text style Dennis */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group relative inline-flex items-center overflow-hidden text-foreground"
          aria-label="Ir al inicio"
        >
          <span className="relative block h-6 md:h-7 overflow-hidden">
            <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
              <span className="font-bold text-xl tracking-tight">
                Code By Cirotti
              </span>
            </span>

            <span className="absolute left-0 top-full block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
              <span className="font-bold text-xl tracking-tight whitespace-nowrap">
                Portafolio
              </span>
            </span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div ref={linksRef} className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="link-underline font-mono text-sm text-foreground uppercase tracking-wider"
            >
              {link.label}
            </button>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button + Toggle */}
        <div className="flex items-center gap-4 md:hidden z-50">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-px bg-foreground transition-transform duration-300 ${
                isOpen ? 'rotate-45 translate-y-[3px]' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-foreground transition-opacity duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-foreground transition-transform duration-300 ${
                isOpen ? '-rotate-45 -translate-y-[5px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed inset-0 bg-background z-40 flex flex-col justify-center items-center gap-8 transition-opacity duration-500 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => handleNavClick(link.href)}
            className="menu-link text-4xl font-bold"
          >
            {link.label}
          </button>
        ))}
      </div>
    </>
  );
};

export default Navbar;