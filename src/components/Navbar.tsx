import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import GlitchText from './GlitchText';

interface NavbarProps {
  isLoaded?: boolean;
}

const Navbar = ({ isLoaded = true }: NavbarProps) => {
  const navRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

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
    if (links.length === 0) return;

    gsap.from(links, {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
    });
  }, [isOpen]);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 lg:px-24 py-6 mix-blend-difference"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        <a href="#" className="text-foreground">
          <GlitchText text="Ov" className="text-xl font-bold" />
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
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 z-50"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-px bg-foreground transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-[3px]' : ''
              }`}
          />
          <span
            className={`block w-6 h-px bg-foreground transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''
              }`}
          />
          <span
            className={`block w-6 h-px bg-foreground transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-[5px]' : ''
              }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`fixed inset-0 bg-background z-40 flex flex-col justify-center items-center gap-8 transition-opacity duration-500 md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => handleNavClick(link.href)}
            className="menu-link text-4xl font-bold"
          >
            <GlitchText text={link.label} />
          </button>
        ))}
      </div>
    </>
  );
};

export default Navbar;
