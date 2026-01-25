import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p';
}

const GlitchText = ({ text, className = '', as: Component = 'span' }: GlitchTextProps) => {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    const handleMouseEnter = () => {
      gsap.to(element, {
        skewX: 2,
        duration: 0.1,
        ease: 'power2.out',
      });
      gsap.to(element, {
        skewX: 0,
        duration: 0.3,
        delay: 0.1,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    return () => element.removeEventListener('mouseenter', handleMouseEnter);
  }, []);

  return (
    <Component
      ref={textRef as any}
      className={`glitch gpu-accelerated ${className}`}
      data-text={text}
    >
      {text}
    </Component>
  );
};

export default GlitchText;
