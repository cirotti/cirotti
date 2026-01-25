import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    gsap.to(progressRef.current, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={lineRef} className="fixed bottom-8 left-8 w-px h-20 bg-muted-foreground/20 z-50 hidden md:block">
      <div
        ref={progressRef}
        className="absolute bottom-0 left-0 w-full bg-foreground origin-bottom"
        style={{ height: '100%', transform: 'scaleY(0)' }}
      />
    </div>
  );
};

export default ScrollProgress;
