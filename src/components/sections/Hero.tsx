import { useEffect, useRef, memo } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Star, Zap } from "lucide-react";
import GlitchText from "../GlitchText";
import MagneticButton from "../MagneticButton";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  isLoaded?: boolean;
}

const splitText = (text: string) =>
  text.split("").map((char, i) => (
    <span
      key={`${char}-${i}`}
      className="char inline-block will-change-transform"
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

const Hero = memo(({ isLoaded = true }: HeroProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      gsap.set(
        [
          labelRef.current,
          subtitleRef.current,
          ctaRef.current?.children,
          trustRef.current?.children,
          scrollRef.current,
        ],
        { willChange: "transform, opacity" }
      );

      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(labelRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power4.out",
      })
        .from(
          titleLine1Ref.current?.querySelectorAll(".char") || [],
          {
            yPercent: 120,
            opacity: 0,
            rotateX: -90,
            transformOrigin: "0% 100%",
            stagger: 0.028,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.2"
        )
        .from(
          titleLine2Ref.current?.querySelectorAll(".char") || [],
          {
            yPercent: 120,
            opacity: 0,
            rotateX: -90,
            transformOrigin: "0% 100%",
            stagger: 0.02,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.7"
        )
        .from(
          subtitleRef.current,
          {
            y: 28,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.65"
        )
        .from(
          ctaRef.current?.children || [],
          {
            y: 24,
            opacity: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.45"
        )
        .from(
          trustRef.current?.children || [],
          {
            y: 18,
            opacity: 0,
            stagger: 0.08,
            duration: 0.55,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .from(
          visualRef.current,
          {
            scale: 0.9,
            opacity: 0,
            rotate: -4,
            duration: 1.2,
            ease: "expo.out",
          },
          "-=1.1"
        )
        .from(
          [badge1Ref.current, badge2Ref.current, badge3Ref.current],
          {
            y: 30,
            opacity: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.65"
        )
        .from(
          scrollRef.current,
          {
            opacity: 0,
            y: 16,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.25"
        );

      gsap.to(imageWrapRef.current, {
        y: 18,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(badge1Ref.current, {
        y: -10,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(badge2Ref.current, {
        y: 10,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(badge3Ref.current, {
        y: -8,
        duration: 2.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(marqueeRef.current, {
        xPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1800",
          scrub: 1,
        },
      });

      gsap.to(gridRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isLoaded]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!lightRef.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - 180;
      const y = e.clientY - rect.top - 180;

      gsap.to(lightRef.current, {
        x,
        y,
        duration: 0.7,
        ease: "power3.out",
      });
    };

    const section = containerRef.current;
    if (!section) return;

    section.addEventListener("mousemove", handleMouseMove);
    return () => section.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const rotateY = (px - 0.5) * 14;
      const rotateX = (py - 0.5) * -14;

      gsap.to(el, {
        rotateX,
        rotateY,
        transformPerspective: 1200,
        transformOrigin: "center center",
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const reset = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden px-5 pt-28 pb-14 sm:px-6 md:px-10 lg:px-16 xl:px-24"
    >
      {/* Fondo general */}
      <div className="absolute inset-0 -z-20 bg-[#050816]" />

      {/* Grid / textura */}
      <div
        ref={gridRef}
        className="absolute inset-0 -z-10 opacity-[0.16]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
          maskImage:
            "radial-gradient(circle at center, black 30%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 30%, transparent 85%)",
        }}
      />

      {/* Luces */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-8%] top-[-12%] h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/18 blur-[120px]" />
        <div className="absolute right-[-10%] top-[12%] h-[28rem] w-[28rem] rounded-full bg-cyan-400/18 blur-[120px]" />
        <div className="absolute bottom-[-16%] left-[28%] h-[24rem] w-[24rem] rounded-full bg-indigo-500/20 blur-[130px]" />
      </div>

      {/* Light follow */}
      <div
        ref={lightRef}
        className="pointer-events-none absolute left-0 top-0 z-0 h-[360px] w-[360px] rounded-full bg-white/8 blur-[110px]"
      />

      {/* Marquee gigante */}
      <div className="pointer-events-none absolute inset-x-0 top-[9%] overflow-hidden">
        <div
          ref={marqueeRef}
          className="flex w-max gap-14 whitespace-nowrap text-[14vw] font-black uppercase leading-none tracking-[-0.06em] text-white/[0.04] md:text-[11vw]"
        >
          <span>Cirotti Developer</span>
          <span>Web Experience</span>
          <span>Creative Code</span>
          <span>Cirotti Developer</span>
          <span>Web Experience</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
        {/* Columna izquierda */}
        <div className="relative max-w-3xl">
          <div
            ref={labelRef}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-white/75 backdrop-blur-xl sm:text-xs"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            Diseño + desarrollo que vende
          </div>

          <h1 className="max-w-4xl font-black uppercase leading-[0.88] tracking-[-0.06em] text-white">
<div
  ref={titleLine1Ref}
  className="block overflow-hidden text-[clamp(2.6rem,6vw,5.2rem)]"
>
              {splitText("Creo webs")}
            </div>

<div
  ref={titleLine2Ref}
  className="block overflow-hidden text-[clamp(2.4rem,5.6vw,5rem)]"
>
  <span className="inline-block align-top">
    {splitText("que atraen")}
  </span>{" "}
  <span className="relative inline-block align-top">
    <span className="absolute inset-0 translate-y-[2px] blur-[12px] bg-gradient-to-r from-cyan-400 via-white to-fuchsia-400 bg-clip-text text-transparent opacity-50">
      clientes
    </span>

    <span className="relative inline-block bg-gradient-to-r from-cyan-300 via-white to-fuchsia-300 bg-clip-text text-transparent">
      clientes
    </span>
  </span>
</div>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/68 sm:text-lg md:text-xl md:leading-relaxed"
          >
            Diseño experiencias web premium para marcas, negocios y proyectos
            que quieren verse distintos, transmitir confianza y convertir más.
            No hago páginas comunes: construyo presencia digital con impacto.
          </p>

          <div
            ref={ctaRef}
            className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap"
          >
            <div className="w-full sm:w-auto">
              <MagneticButton
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="inline-flex items-center gap-2">
                  Quiero mi web
                  <ArrowRight className="h-4 w-4" />
                </span>
              </MagneticButton>
            </div>

            <div className="w-full sm:w-auto">
              <MagneticButton
                onClick={() =>
                  document
                    .getElementById("work")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="inline-flex items-center gap-2">
                  Ver proyectos
                  <Star className="h-4 w-4" />
                </span>
              </MagneticButton>
            </div>
          </div>

          <div
            ref={trustRef}
            className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/45">
                Enfoque
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                Visual brutal + UX clara
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/45">
                Ideal para
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                Marcas, negocios y portafolios
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.25em] text-white/45">
                Resultado
              </p>
              <p className="mt-1 text-sm font-medium text-white">
                Más impacto desde el primer scroll
              </p>
            </div>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="relative flex items-center justify-center lg:justify-end">
          <div
            ref={visualRef}
            className="relative w-full max-w-[620px] [transform-style:preserve-3d]"
          >
            {/* Aro / borde glow */}
            <div className="absolute inset-[-10%] rounded-[2.2rem] bg-gradient-to-br from-cyan-400/20 via-transparent to-fuchsia-500/20 blur-3xl" />

            {/* Marco principal */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.06] p-3 shadow-[0_20px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#08101f]">
                {/* Barra superior tipo UI */}
                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-white/55">
                    Hero Experience
                  </div>
                </div>

                {/* Imagen / visual */}
                <div
                  ref={imageWrapRef}
                  className="relative aspect-[4/4.6] w-full sm:aspect-[4/4.2] md:aspect-[4/4] lg:aspect-[4/4.4]"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}cirotti.png`}
                    alt="Cirotti"
                    className="absolute inset-0 h-full w-full object-cover scale-[1.02] grayscale-[8%] contrast-[1.05] saturate-[1.05]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/15 to-transparent" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_80%_15%,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_70%_80%,rgba(217,70,239,0.15),transparent_30%)]" />

                  {/* Líneas decorativas */}
                  <div className="absolute left-4 top-4 h-20 w-20 rounded-tl-[1.4rem] border-l border-t border-white/15" />
                  <div className="absolute bottom-4 right-4 h-20 w-20 rounded-br-[1.4rem] border-b border-r border-white/15" />

                  {/* Info inferior */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <div className="rounded-2xl border border-white/10 bg-black/30 p-4 backdrop-blur-xl">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-white/45 sm:text-[11px]">
                        Cirotti / Creative Developer
                      </p>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80 sm:text-[15px]">
                        Diseño interfaces con presencia, movimiento y una
                        identidad visual difícil de olvidar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating cards */}
            <div
              ref={badge1Ref}
              className="absolute -left-2 top-[12%] z-20 rounded-2xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur-xl sm:-left-8"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-cyan-400/12 p-2">
                  <Zap className="h-4 w-4 text-cyan-300" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">
                    Impacto visual
                  </p>
                  <p className="text-sm font-semibold text-white">
                    Primera impresión fuerte
                  </p>
                </div>
              </div>
            </div>

            <div
              ref={badge2Ref}
              className="absolute -right-1 top-[55%] z-20 rounded-2xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur-xl sm:-right-8"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">
                Diseño
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Premium / moderno / limpio
              </p>
            </div>

            <div
              ref={badge3Ref}
              className="absolute bottom-[-1rem] left-[10%] z-20 rounded-2xl border border-white/12 bg-white/8 px-4 py-3 backdrop-blur-xl"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">
                Objetivo
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Convertir visitas en clientes
              </p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;