import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import GlitchText from '../GlitchText';
import MagneticButton from '../MagneticButton';

interface HeroProps {
  isLoaded?: boolean;
}

const splitText = (text: string) => {
  return text.split('').map((char, i) => (
    <span
      key={i}
      className="char inline-block gpu-accelerated"
      style={{ perspective: '1000px' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));
};

const Hero = memo(({ isLoaded = true }: HeroProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.3,
      });

      // Animate the horizontal line
      tl.from(lineRef.current, {
        scaleX: 0,
        duration: 1.2,
        transformOrigin: 'left center',
      })
        // Label
        .from(labelRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.6,
        }, '-=0.8')
        // Avatar
        .from(containerRef.current?.querySelector('.avatar-container') || null, {
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: 'back.out(1.7)',
        }, '-=0.8')
        // Title characters
        .from(titleRef.current?.querySelectorAll('.char') || [], {
          y: 120,
          opacity: 0,
          rotationX: -80,
          stagger: 0.02,
          duration: 1,
          ease: 'power4.out',
        }, '-=0.6')
        // Subtitle
        .from(subtitleRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.8,
        }, '-=0.5')
        // CTA buttons
        .from(ctaRef.current?.querySelectorAll('.magnetic-btn') || [], {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
        }, '-=0.4')

    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 relative overflow-hidden"
    >
      {/* Decorative line */}
      <div
        ref={lineRef}
        className="absolute top-1/2 left-0 w-full h-px bg-muted/20 gpu-accelerated"
      />

      <div className="max-w-6xl relative z-10">
        <p
          ref={labelRef}
          className="font-mono text-xs md:text-sm text-muted-foreground mb-6 tracking-[0.3em] uppercase"
        >
          Creative Developer
        </p>

        <div className="flex flex-col md:flex-row items-center gap-12 mb-8">
          <div className="flex flex-col items-start">
            <h1
              ref={titleRef}
              className="text-5xl md:text-7xl lg:text-[8rem] font-bold leading-[0.85] tracking-tighter"
            >
              <span className="block overflow-hidden py-2">
                {splitText('Ovi')}
              </span>
              <span className="block overflow-hidden py-2">
                <GlitchText text="ren" className="text-stroke" />
              </span>
            </h1>
          </div>

          <div className="avatar-container relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 shrink-0 overflow-hidden border border-muted-foreground/20 gpu-accelerated group">
            <img
              src={`${import.meta.env.BASE_URL}avatar.jpg`}
              alt="Avatar"
              className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none" />
            <div className="absolute inset-0 border border-foreground/20 pointer-events-none" />
          </div>
        </div>

        <p
          ref={subtitleRef}
          className="text-base md:text-lg text-muted-foreground max-w-md mb-12 leading-relaxed"
        >
          Hobby programmer exploring the intersection of code and creativity.
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-4">
          <MagneticButton onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
            View Work
          </MagneticButton>
          <MagneticButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Get in Touch
          </MagneticButton>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-muted-foreground/20" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-muted-foreground/20 hidden md:block" />
    </section>
  );
});

Hero.displayName = 'Hero';
export default Hero;
