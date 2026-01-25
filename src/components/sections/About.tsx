import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section number animation
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

      // Split text into words for staggered reveal
      if (textRef.current) {
        const words = textRef.current.querySelectorAll('.word');
        gsap.from(words, {
          y: 60,
          opacity: 0,
          stagger: 0.03,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // Animate skills
      const skills = skillsRef.current?.querySelectorAll('.skill-item');
      if (skills) {
        gsap.from(skills, {
          x: -40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    'Backend Development',
    'Node.js / APIs',
    'Python',
    'Full-stack Apps',
    'Anime Ecosystems',
    'Open Source',
  ];

  const wrapWords = (text: string) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="word inline-block mr-[0.3em]">
        {word}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="min-h-screen flex items-center px-6 md:px-12 lg:px-24 py-32 relative"
    >
      {/* Large background number */}
      <span
        ref={numberRef}
        className="absolute -left-4 md:left-8 top-1/2 -translate-y-1/2 text-[20rem] md:text-[30rem] font-bold text-muted/5 select-none pointer-events-none leading-none"
      >
        01
      </span>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 w-full max-w-6xl relative z-10">
        <div>
          <span className="font-mono text-xs text-muted-foreground tracking-[0.3em] uppercase block mb-8">
            About Me
          </span>

          <p
            ref={textRef}
            className="text-2xl md:text-3xl lg:text-4xl leading-[1.4] font-light gpu-accelerated"
          >
            {wrapWords("Hey there! I'm Ovi ren, a hobby programmer who loves building things and exploring the intersection of")}
            <span className="word inline-block mr-[0.3em] text-stroke font-bold">code</span>
            {wrapWords("and")}
            <span className="word inline-block mr-[0.3em] text-stroke font-bold">creativity.</span>
            {wrapWords("I'm mainly a Node.js developer, diving deep into backend development, APIs, and full-stack applications.")}
          </p>
        </div>

        <div ref={skillsRef} className="flex flex-col justify-center">
          <span className="font-mono text-xs text-muted-foreground tracking-[0.3em] uppercase block mb-8">
            Expertise
          </span>

          <ul className="space-y-4">
            {skills.map((skill, index) => (
              <li
                key={skill}
                className="skill-item flex items-center gap-4 text-lg group gpu-accelerated cursor-default"
              >
                <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="relative overflow-hidden">
                  <span className="block group-hover:-translate-y-full transition-transform duration-300">
                    {skill}
                  </span>
                  <span className="absolute top-full left-0 group-hover:-translate-y-full transition-transform duration-300 text-foreground">
                    {skill}
                  </span>
                </span>
                <span className="flex-1 h-px bg-muted-foreground/20 ml-4 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
});

About.displayName = 'About';
export default About;
