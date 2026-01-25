import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';
    const finalText = 'LOADING';
    let iteration = 0;
    let interval: NodeJS.Timeout;

    // Text scramble effect
    interval = setInterval(() => {
      if (!textRef.current) return;
      
      textRef.current.innerText = finalText
        .split('')
        .map((letter, index) => {
          if (index < iteration) return finalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

      if (iteration >= finalText.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);

    // Counter animation
    const counterTween = gsap.to({ val: 0 }, {
      val: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: function() {
        setCount(Math.floor(this.targets()[0].val));
      },
    });

    // Progress line
    gsap.to(lineRef.current, {
      scaleX: 1,
      duration: 2.5,
      ease: 'power2.inOut',
    });

    // Exit animation
    const exitTl = gsap.timeline({ delay: 2.8 });
    
    exitTl
      .to(textRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
      })
      .to(counterRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
      }, '-=0.3')
      .to(lineRef.current, {
        scaleX: 0,
        transformOrigin: 'right center',
        duration: 0.4,
        ease: 'power3.in',
      }, '-=0.2')
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete,
      }, '-=0.2');

    return () => {
      clearInterval(interval);
      counterTween.kill();
      exitTl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center"
    >
      <div className="relative">
        <span
          ref={textRef}
          className="font-mono text-sm tracking-[0.5em] text-muted-foreground"
        >
          LOADING
        </span>
      </div>
      
      <div className="mt-8 flex items-center gap-4">
        <div className="w-48 h-px bg-muted relative overflow-hidden">
          <div
            ref={lineRef}
            className="absolute inset-0 bg-foreground origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
        <span
          ref={counterRef}
          className="font-mono text-xs text-muted-foreground w-8"
        >
          {count}%
        </span>
      </div>
    </div>
  );
};

export default Preloader;
