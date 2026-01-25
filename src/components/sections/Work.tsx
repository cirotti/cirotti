import { useEffect, useRef, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github } from 'lucide-react';
import GlitchText from '../GlitchText';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  category: string;
  year: string;
  description: string;
  githubUrl: string;
}

const projects: Project[] = [
  {
    title: 'syswaifu',
    category: 'System Tools',
    year: '2026',
    description: 'Cross-Platform Neofetch-style system info with waifu images',
    githubUrl: 'https://github.com/iamovi/syswaifu',
  },
  {
    title: 'AnimeWaifu',
    category: 'Anime Ecosystem',
    year: '2024',
    description: 'Anime related Apps/ Ecosystem',
    githubUrl: 'https://github.com/iamovi/AnimeWaifu',
  },
  {
    title: 'AniCss',
    category: 'Library',
    year: '2023',
    description: 'CSS Library for Button and Text Animations & Effects',
    githubUrl: 'https://github.com/iamovi/ani.css',
  },
  {
    title: 'notAcursor',
    category: 'Library/Cursor',
    year: '2023',
    description: 'A library for giving cursor cool looks in web pages',
    githubUrl: 'https://github.com/iamovi/notAcursor',
  },
  {
    title: 'Button Will React',
    category: 'Pranks',
    year: '2023',
    description: 'A collection of playful pranks',
    githubUrl: 'https://github.com/iamovi/button-will-react',
  },
  {
    title: 'MyWebJourney',
    category: 'Memories',
    year: '2023',
    description: 'First website made in high school',
    githubUrl: 'https://github.com/iamovi/MyWebJourney',
  },
];

const Work = memo(() => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background number
      gsap.from(numberRef.current, {
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      const items = projectsRef.current?.querySelectorAll('.project-item');

      if (items) {
        items.forEach((item) => {
          const title = item.querySelector('.project-title');
          const line = item.querySelector('.project-line');
          const arrow = item.querySelector('.project-arrow');

          // Entry animation
          gsap.from(item, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
              fastScrollEnd: true,
            },
          });

          // Hover handlers using GSAP quickTo for performance
          const xToTitle = gsap.quickTo(title, "x", { duration: 0.4, ease: "power3.out" });
          const scaleToLine = gsap.quickTo(line, "scaleX", { duration: 0.5, ease: "power3.out" });
          const xToArrow = gsap.quickTo(arrow, "x", { duration: 0.4, ease: "power3.out" });
          const opacityToArrow = gsap.quickTo(arrow, "opacity", { duration: 0.4, ease: "power3.out" });

          const onEnter = () => {
            scaleToLine(1);
            xToTitle(20);
            xToArrow(0);
            opacityToArrow(1);
          };

          const onLeave = () => {
            scaleToLine(0);
            xToTitle(0);
            xToArrow(-20);
            opacityToArrow(0);
          };

          item.addEventListener('mouseenter', onEnter);
          item.addEventListener('mouseleave', onLeave);
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="min-h-screen px-6 md:px-12 lg:px-24 py-32 relative"
    >
      {/* Large background number */}
      <span
        ref={numberRef}
        className="absolute -right-4 md:right-8 top-1/2 -translate-y-1/2 text-[20rem] md:text-[30rem] font-bold text-muted/5 select-none pointer-events-none leading-none"
      >
        02
      </span>

      <div className="max-w-6xl relative z-10">
        <span className="font-mono text-xs text-muted-foreground tracking-[0.3em] uppercase block mb-8">
          Selected Work
        </span>

        <div ref={projectsRef} className="space-y-0">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="project-item group border-t border-muted-foreground/20 py-8 md:py-12 cursor-pointer gpu-accelerated relative overflow-hidden"
            >
              {/* Hover background */}
              <div
                className="project-line absolute inset-0 bg-secondary/50 origin-left pointer-events-none"
                style={{ transform: 'scaleX(0)' }}
              />

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Number */}
                <div className="md:col-span-1 font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Title with arrow */}
                <div className="md:col-span-4 flex items-center gap-4">
                  <div
                    className="project-arrow text-xl opacity-0"
                    style={{ transform: 'translateX(-20px)' }}
                  >
                    →
                  </div>
                  <GlitchText
                    text={project.title}
                    as="h3"
                    className="project-title text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
                  />
                </div>

                {/* Description */}
                <div className="project-meta md:col-span-3 text-muted-foreground text-sm md:text-base">
                  {project.description}
                </div>

                {/* Category */}
                <div className="md:col-span-2 font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  {project.category}
                </div>

                {/* Year */}
                <div className="md:col-span-1 font-mono text-xs text-muted-foreground text-right">
                  {project.year}
                </div>

                {/* GitHub Link */}
                <div className="md:col-span-1 flex justify-end">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:text-primary transition-colors duration-300 relative z-20"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom border */}
        <div className="border-t border-muted-foreground/20" />
      </div>
    </section>
  );
});

Work.displayName = 'Work';
export default Work;
