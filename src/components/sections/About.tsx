import { useEffect, useRef, memo } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Sparkles,
  Code2,
  Boxes,
  Workflow,
  ArrowUpRight,
  Bot,
  AppWindow,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const skills = [
  "Desarrollo Backend",
  "Node.js / APIs",
  "Python",
  "Apps Full-Stack",
  "Bots para Discord",
  "Bots para WhatsApp / Telegram",
  "Arquitectura Web",
  "Open Source",
]

const pillars = [
  {
    icon: Code2,
    title: "Código con intención",
    text: "Cada interfaz, app o sistema debe comunicar presencia, claridad y personalidad.",
  },
  {
    icon: Workflow,
    title: "Movimiento con propósito",
    text: "La animación guía, revela y da ritmo a la experiencia sin romper la funcionalidad.",
  },
  {
    icon: Boxes,
    title: "Sistema visual sólido",
    text: "Estructura, detalle e identidad trabajando como una sola pieza en webs, apps y productos digitales.",
  },
]

const About = memo(() => {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const bigTextRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const glowLeftRef = useRef<HTMLDivElement>(null)
  const glowRightRef = useRef<HTMLDivElement>(null)

  const railRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const titleWrapRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  const cardRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLUListElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(numberRef.current, {
        y: -180,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(bigTextRef.current, {
        xPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(gridRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(glowLeftRef.current, {
        xPercent: 10,
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(glowRightRef.current, {
        xPercent: -8,
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.fromTo(
        railRef.current,
        {
          scaleY: 0,
          transformOrigin: "top center",
        },
        {
          scaleY: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: railRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        labelRef.current,
        {
          y: 18,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: labelRef.current,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      )

      const titleLines =
        titleWrapRef.current?.querySelectorAll(".about-line-inner")

      if (titleLines?.length) {
        gsap.fromTo(
          titleLines,
          {
            yPercent: 120,
            opacity: 0,
          },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 1.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: titleWrapRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      gsap.fromTo(
        introRef.current,
        {
          y: 34,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        statsRef.current?.children || [],
        {
          y: 22,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        cardRef.current,
        {
          y: 42,
          opacity: 0,
          scale: 0.98,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        skillsRef.current?.children || [],
        {
          x: -26,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )

      gsap.fromTo(
        pillarsRef.current?.children || [],
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32 lg:px-16 xl:px-24"
    >
      {/* GRID */}
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
          maskImage:
            "radial-gradient(circle at center, black 45%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 45%, transparent 85%)",
        }}
      />

      {/* NOISE */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12)_0,transparent_55%)]" />

      {/* BIG BG TEXT */}
      <div
        ref={bigTextRef}
        className="pointer-events-none absolute left-[-8%] top-[12%] whitespace-nowrap select-none text-[18vw] font-black leading-none text-white/[0.025]"
      >
        ABOUT — ABOUT — SOBRE MÍ — ABOUT
      </div>

      {/* GLOWS */}
      <div
        ref={glowLeftRef}
        className="absolute left-[-10%] top-[8%] h-[28rem] w-[28rem] rounded-full bg-indigo-500/10 blur-[170px]"
      />
      <div
        ref={glowRightRef}
        className="absolute bottom-[-12%] right-[-8%] h-[26rem] w-[26rem] rounded-full bg-fuchsia-500/10 blur-[160px]"
      />

      {/* NUMBER */}
      <span
        ref={numberRef}
        className="pointer-events-none absolute left-[-0.5rem] top-[16%] select-none text-[8rem] font-black leading-none text-white/[0.04] sm:text-[10rem] lg:left-[1rem] lg:text-[15rem]"
      >
        01
      </span>

      <div className="relative z-10 mx-auto max-w-[1380px]">
        <div className="grid gap-12 lg:grid-cols-[88px_minmax(0,1fr)_420px] xl:gap-16">
          {/* LEFT RAIL */}
          <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-between">
            <div className="font-mono text-[10px] uppercase tracking-[0.44em] text-white/35 [writing-mode:vertical-rl] rotate-180">
              ABOUT / CREATIVE DEVELOPER / BOTS / APPS / VISUAL THINKING
            </div>

            <div
              ref={railRef}
              className="mt-8 h-28 w-px bg-gradient-to-b from-white/0 via-white/35 to-white/0"
            />
          </div>

          {/* LEFT CONTENT */}
          <div className="max-w-[920px]">
            <span
              ref={labelRef}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.34em] text-white/45 backdrop-blur-xl"
            >
              <Sparkles className="h-3.5 w-3.5 text-white/55" />
              Sobre mí
            </span>

            <div
              ref={titleWrapRef}
              className="text-[clamp(2.4rem,5.4vw,5.7rem)] font-semibold leading-[0.93] tracking-[-0.055em] text-white"
            >
              <div className="overflow-hidden">
                <div className="about-line-inner">No me interesa</div>
              </div>

              <div className="overflow-hidden">
                <div className="about-line-inner">
                  crear productos
                  <span className="ml-[0.18em] inline-block text-stroke">
                    normales
                  </span>
                </div>
              </div>

              <div className="overflow-hidden">
                <div className="about-line-inner">sino experiencias,</div>
              </div>

              <div className="overflow-hidden">
                <div className="about-line-inner">apps y bots</div>
              </div>

              <div className="overflow-hidden">
                <div className="about-line-inner">que se sientan</div>
              </div>

              <div className="overflow-hidden">
                <div className="about-line-inner">vivos, precisos</div>
              </div>

              <div className="overflow-hidden">
                <div className="about-line-inner">y memorables.</div>
              </div>
            </div>

            <div
              ref={introRef}
              className="mt-8 max-w-[720px] space-y-5 text-sm leading-7 text-white/62 md:text-base"
            >
              <p>
                Soy <span className="font-semibold text-white">Cirotti</span>,
                desarrollador creativo enfocado en construir productos digitales
                donde el diseño, la interacción y el código trabajen como una
                sola pieza.
              </p>

              <p>
                Desarrollo webs con identidad, aplicaciones funcionales y bots
                hechos a medida para <span className="text-white font-medium">Discord</span>,{" "}
                <span className="text-white font-medium">WhatsApp</span>,{" "}
                <span className="text-white font-medium">Telegram</span> y otras
                plataformas, combinando lógica, automatización y una experiencia
                visual cuidada.
              </p>

              <p>
                Me obsesiona el detalle: el ritmo visual, la jerarquía, el
                movimiento, la claridad y esa sensación de que cada producto
                tiene carácter propio.
              </p>
            </div>

            <div
              ref={statsRef}
              className="mt-10 grid max-w-[760px] gap-3 sm:grid-cols-3"
            >
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                  Enfoque
                </div>
                <div className="mt-2 text-sm text-white/80">
                  Web · Apps · Bots
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                  Stack
                </div>
                <div className="mt-2 text-sm text-white/80">
                  React · Node · Python · GSAP
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur-xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                  Prioridad
                </div>
                <div className="mt-2 text-sm text-white/80">
                  Sistemas con identidad
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div
            ref={cardRef}
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl md:p-6"
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_30%,transparent_70%,rgba(255,255,255,0.05))]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-indigo-500/8 to-transparent" />

            <div className="relative z-10 flex flex-col gap-5">
              {/* HEADER */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/38">
                    Filosofía de trabajo
                  </div>

                  <p className="mt-3 max-w-[280px] text-sm leading-7 text-white/62">
                    Construyo experiencias, aplicaciones y automatizaciones donde
                    la forma y la función no se pelean: se potencian.
                  </p>
                </div>

                <div className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/70">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              {/* SKILLS */}
              <div className="rounded-[22px] border border-white/10 bg-black/25 p-4 backdrop-blur-xl">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                  Especialidades
                </div>

                <ul
                  ref={skillsRef}
                  className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
                >
                  {skills.map((skill, index) => (
                    <li
                      key={skill}
                      className="skill-item group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      <div className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-gradient-to-b from-indigo-400 via-white/70 to-fuchsia-400 transition-transform duration-500 group-hover:scale-y-100" />

                      <div className="flex min-w-0 items-center gap-3">
                        <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="block min-w-0 break-words text-sm font-medium leading-6 text-white/82">
                          {skill}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* EXTRA BLOCK */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/70">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-semibold text-white/86">
                      Bots & automatización
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-white/58">
                    Bots personalizados para Discord, WhatsApp, Telegram y
                    flujos automatizados conectados a APIs, paneles y sistemas.
                  </p>
                </div>

                <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/70">
                      <AppWindow className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-semibold text-white/86">
                      Apps digitales
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-white/58">
                    Desarrollo de aplicaciones web y herramientas a medida con
                    foco en rendimiento, utilidad real y una identidad visual fuerte.
                  </p>
                </div>
              </div>

              {/* PILLARS */}
              <div ref={pillarsRef} className="grid gap-3">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon

                  return (
                    <div
                      key={pillar.title}
                      className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4 transition-colors duration-300 hover:bg-white/[0.05]"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <div className="shrink-0 rounded-full border border-white/10 bg-white/[0.04] p-2 text-white/70">
                          <Icon className="h-4 w-4" />
                        </div>

                        <div className="min-w-0 text-sm font-semibold text-white/86">
                          {pillar.title}
                        </div>
                      </div>

                      <p className="text-sm leading-6 text-white/58">
                        {pillar.text}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

About.displayName = "About"
export default About