import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorPosRef = useRef({ x: 0, y: 0 });
  const followerPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    // Check if device has mouse
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) {
      cursor.style.display = 'none';
      follower.style.display = 'none';
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Smooth cursor follow with lerp
      cursorPosRef.current.x += (mouseRef.current.x - cursorPosRef.current.x) * 0.2;
      cursorPosRef.current.y += (mouseRef.current.y - cursorPosRef.current.y) * 0.2;
      followerPosRef.current.x += (mouseRef.current.x - followerPosRef.current.x) * 0.08;
      followerPosRef.current.y += (mouseRef.current.y - followerPosRef.current.y) * 0.08;

      cursor.style.transform = `translate3d(${cursorPosRef.current.x}px, ${cursorPosRef.current.y}px, 0) translate(-50%, -50%)`;
      follower.style.transform = `translate3d(${followerPosRef.current.x}px, ${followerPosRef.current.y}px, 0) translate(-50%, -50%)`;

      requestRef.current = requestAnimationFrame(animate);
    };

    // Handle hover states
    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const isButton = target.classList.contains('magnetic-btn');
      
      gsap.to(follower, { 
        scale: isButton ? 2.5 : 2, 
        opacity: isButton ? 0.5 : 1,
        duration: 0.3, 
        ease: 'power2.out' 
      });
      gsap.to(cursor, { 
        scale: 0.5, 
        duration: 0.3, 
        ease: 'power2.out' 
      });
    };

    const handleMouseLeave = () => {
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
    };

    // Attach listeners to interactive elements
    const attachListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, .magnetic-btn, .project-item, .skill-item');
      interactiveElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
      return interactiveElements;
    };

    window.addEventListener('mousemove', handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);
    
    // Attach listeners after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      attachListeners();
    }, 100);

    // Re-attach listeners when DOM changes
    const observer = new MutationObserver(() => {
      attachListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-foreground rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-foreground rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};

export default Cursor;
