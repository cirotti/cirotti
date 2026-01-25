import { useRef, useEffect, ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

const MagneticButton = ({ children, className = '', onClick, href }: MagneticButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const boundingRef = useRef<DOMRect | null>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      boundingRef.current = button.getBoundingClientRect();
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!boundingRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = boundingRef.current;
      
      const x = (clientX - left - width / 2) * 0.3;
      const y = (clientY - top - height / 2) * 0.3;

      gsap.to(button, {
        x,
        y,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
      boundingRef.current = null;
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const baseClasses = `magnetic-btn border border-foreground px-8 py-4 font-mono text-sm uppercase tracking-wider gpu-accelerated ${className}`;

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseClasses}
    >
      <span>{children}</span>
    </button>
  );
};

export default MagneticButton;
