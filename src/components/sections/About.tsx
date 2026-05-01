import { useEffect, useMemo, useRef, memo } from "react"
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
  TerminalSquare,
  Cpu,
  Globe2,
  Zap,
  Radio,
  Layers3,
  Orbit,
  MousePointer2,
  ShieldCheck,
  Command,
  Network,
  Fingerprint,
  Braces,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const skills = [
  "Backend & APIs",
  "Node.js",
  "Python",
  "React / Next.js",
  "Bots Discord",
  "Bots WhatsApp / Telegram",
  "Automatizaciones",
  "Arquitectura Web",
]

const focus = [
  {
    icon: Bot,
    title: "Bots inteligentes",
    text: "Discord, WhatsApp, Telegram, comandos, paneles y flujos conectados a APIs reales.",
  },
  {
    icon: AppWindow,
    title: "Apps con identidad",
    text: "Interfaces modernas, rápidas y visualmente potentes, pensadas para sentirse premium.",
  },
  {
    icon: TerminalSquare,
    title: "Sistemas funcionales",
    text: "Backend, bases de datos, lógica de negocio y herramientas que solucionan problemas reales.",
  },
]

const pillars = [
  {
    icon: Code2,
    title: "Código con intención",
    text: "Cada sección, animación y flujo tiene una razón. Nada está puesto porque sí.",
  },
  {
    icon: Workflow,
    title: "Experiencia con ritmo",
    text: "Movimiento elegante, jerarquía clara y detalles visuales que acompañan la navegación.",
  },
  {
    icon: Boxes,
    title: "Producto completo",
    text: "Diseño, estructura, lógica, rendimiento e identidad trabajando como una sola pieza.",
  },
]

const About = memo(() => {
  const sectionRef = useRef<HTMLElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const starFieldRef = useRef<HTMLDivElement>(null)
  const bigTextRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const focusRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const pillarsRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const systemRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const nebulaRef = useRef<HTMLDivElement>(null)
  const constellationRef = useRef<HTMLDivElement>(null)
  const scanRef = useRef<HTMLDivElement>(null)
  const pulseRef = useRef<HTMLDivElement>(null)

  const particles = useMemo(
    () =>
      Array.from({ length: 95 }, (_, i) => ({
        id: i,
        left: `${(i * 17.17 + 9) % 100}%`,
        top: `${(i * 23.91 + 11) % 100}%`,
        size: 1 + (i % 4),
        delay: (i % 13) * 0.16,
        duration: 2.3 + (i % 9) * 0.34,
      })),
    []
  )

  useEffect(() => {
    const section = sectionRef.current
    const light = lightRef.current

    const move = (e: MouseEvent) => {
      if (!section || !light) return
      const rect = section.getBoundingClientRect()

      gsap.to(light, {
        x: e.clientX - rect.left - 280,
        y: e.clientY - rect.top - 280,
        duration: 0.75,
        ease: "power3.out",
      })
    }

    section?.addEventListener("mousemove", move)

    const ctx = gsap.context(() => {
      const parallax = {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }

      gsap.to(gridRef.current, { yPercent: 16, ease: "none", scrollTrigger: parallax })
      gsap.to(starFieldRef.current, { yPercent: -10, ease: "none", scrollTrigger: parallax })
      gsap.to(bigTextRef.current, { xPercent: -28, ease: "none", scrollTrigger: parallax })
      gsap.to(nebulaRef.current, { xPercent: -8, yPercent: 10, ease: "none", scrollTrigger: parallax })
      gsap.to(constellationRef.current, { yPercent: -12, ease: "none", scrollTrigger: parallax })

      gsap.to(orbitRef.current, {
        rotate: 360,
        duration: 44,
        ease: "none",
        repeat: -1,
      })

      gsap.to(pulseRef.current, {
        scale: 1.18,
        opacity: 0.15,
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      })

      gsap.to(scanRef.current, {
        yPercent: 360,
        duration: 4.2,
        ease: "none",
        repeat: -1,
      })

      const lines = titleRef.current?.querySelectorAll(".about-line")

      if (lines?.length) {
        gsap.fromTo(
          lines,
          { yPercent: 120, opacity: 0, rotateX: -80, filter: "blur(14px)" },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1.15,
            stagger: 0.075,
            ease: "power4.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        )
      }

      gsap.fromTo(
        [labelRef.current, introRef.current, cardRef.current, systemRef.current],
        { y: 44, opacity: 0, filter: "blur(18px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.12,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 74%",
            toggleActions: "play none none reverse",
          },
        }
      )

      const groups = [
        statsRef.current?.children,
        focusRef.current?.children,
        skillsRef.current?.children,
        pillarsRef.current?.children,
        terminalRef.current?.children,
      ]

      groups.forEach((group) => {
        if (!group?.length) return

        gsap.fromTo(
          group,
          { y: 28, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.78,
            stagger: 0.055,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group[0],
              start: "top 91%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })

      gsap.to(".about-float", {
        y: -16,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.16,
      })

      gsap.to(".about-node", {
        scale: 1.4,
        opacity: 1,
        duration: 1.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.2,
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      section?.removeEventListener("mousemove", move)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative isolate overflow-hidden px-5 py-24 text-white sm:px-6 md:px-10 md:py-32 lg:px-16 xl:px-24"
    >
      <div className="absolute inset-0 -z-20 bg-[#030511]" />

      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_58%_0%,rgba(99,102,241,0.24),transparent_34%),radial-gradient(circle_at_82%_42%,rgba(217,70,239,0.18),transparent_32%),radial-gradient(circle_at_22%_72%,rgba(34,211,238,0.12),transparent_30%),linear-gradient(180deg,rgba(3,5,17,0.02)_0%,rgba(3,5,17,0.4)_45%,rgba(0,0,0,0.88)_100%)]" />

      <div
        ref={nebulaRef}
        className="pointer-events-none absolute right-[-18%] top-[-10%] z-[1] h-[48rem] w-[48rem] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.22),rgba(217,70,239,0.12)_35%,transparent_68%)] blur-[120px]"
      />

      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
          maskImage: "radial-gradient(circle at center, black 34%, transparent 82%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 34%, transparent 82%)",
        }}
      />

      <div
        ref={lightRef}
        className="pointer-events-none absolute left-0 top-0 z-[2] h-[560px] w-[560px] rounded-full bg-white/[0.065] blur-[150px]"
      />

      <div ref={starFieldRef} className="pointer-events-none absolute inset-0 z-[2]">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-white/70"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animation: `pulse ${p.duration}s ease-in-out ${p.delay}s infinite`,
              boxShadow: "0 0 26px rgba(255,255,255,0.55)",
            }}
          />
        ))}
      </div>

      <div
        ref={bigTextRef}
        className="pointer-events-none absolute left-[-48%] top-[7%] z-[1] whitespace-nowrap text-[22vw] font-black uppercase leading-none tracking-[-0.095em] text-white/[0.03] sm:left-[-24%] sm:text-[17vw] lg:left-[-12%] lg:text-[13vw]"
      >
        DIGITAL GALAXY — SYSTEMS — BOTS — APPS —
      </div>

      <div
        ref={constellationRef}
        className="pointer-events-none absolute right-[2%] top-[8%] z-[2] hidden h-[42rem] w-[42rem] lg:block"
      >
        <div className="absolute inset-0 rounded-full border border-white/[0.07]" />
        <div
          ref={orbitRef}
          className="absolute inset-10 rounded-full border border-dashed border-cyan-200/[0.1]"
        >
          <span className="about-node absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-200 opacity-70 shadow-[0_0_36px_rgba(165,243,252,0.95)]" />
          <span className="about-node absolute bottom-12 right-12 h-2 w-2 rounded-full bg-fuchsia-200 opacity-70 shadow-[0_0_30px_rgba(245,208,254,0.9)]" />
          <span className="about-node absolute left-14 top-1/2 h-2 w-2 rounded-full bg-indigo-200 opacity-70 shadow-[0_0_30px_rgba(199,210,254,0.9)]" />
        </div>

        <div ref={pulseRef} className="absolute inset-28 rounded-full border border-cyan-200/10 bg-cyan-200/[0.03]" />

        <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 600 600">
          <path
            d="M300 60 L470 210 L410 480 L170 430 L120 190 Z"
            fill="none"
            stroke="rgba(165,243,252,.45)"
            strokeWidth="1"
            strokeDasharray="8 10"
          />
          <path
            d="M300 60 L410 480 M470 210 L170 430 M120 190 L410 480"
            fill="none"
            stroke="rgba(240,171,252,.28)"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,540px)] xl:gap-16">
          <div>
            <div
              ref={labelRef}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-xl"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-white/55">
                Sobre mí / Digital Galaxy
              </span>
            </div>

            <div
              ref={titleRef}
              className="max-w-[1120px] text-[clamp(3rem,6.4vw,7.4rem)] font-black uppercase leading-[0.8] tracking-[-0.085em]"
            >
              {["No soy un", "creador de", "páginas.", "Soy constructor", "de sistemas", "vivos."].map(
                (line, index) => (
                  <div key={line} className="overflow-hidden pb-1">
                    <div
                      className={`about-line ${
                        index >= 3
                          ? "bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-transparent"
                          : ""
                      }`}
                    >
                      {line}
                    </div>
                  </div>
                )
              )}
            </div>

            <div
              ref={introRef}
              className="mt-8 max-w-[800px] space-y-5 text-sm leading-7 text-white/64 md:text-base"
            >
              <p>
                Soy <span className="font-semibold text-white">Cirotti</span>,
                desarrollador creativo enfocado en crear productos digitales con
                presencia: webs, apps, bots, automatizaciones y sistemas que no
                se sienten genéricos.
              </p>

              <p>
                Me gusta unir diseño, lógica y movimiento para que cada producto
                tenga una identidad propia: visualmente fuerte, funcional y
                preparado para crecer.
              </p>
            </div>

            <div ref={statsRef} className="mt-10 grid max-w-[920px] gap-3 sm:grid-cols-3">
              {[
                ["Mentalidad", "Diseño + código + negocio"],
                ["Sistema", "Web · Apps · Bots"],
                ["Resultado", "Experiencia memorable"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="about-float group rounded-3xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.08]"
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/35">
                    {label}
                  </div>
                  <div className="mt-3 text-sm font-medium text-white/82">
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div ref={focusRef} className="mt-5 grid max-w-[1000px] gap-3 md:grid-cols-3">
              {focus.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.title}
                    className="group relative overflow-hidden rounded-[30px] border border-white/10 bg-black/25 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-200/25 hover:bg-white/[0.07]"
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.15),transparent_38%)]" />

                    <div className="relative z-10">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/75">
                        <Icon className="h-4 w-4" />
                      </div>

                      <h3 className="text-sm font-semibold text-white/92">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-white/55">
                        {item.text}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div ref={systemRef} className="mt-5 grid max-w-[1000px] gap-3 md:grid-cols-3">
              {[
                [Layers3, "Arquitectura clara", "Bases sólidas para proyectos que pueden crecer."],
                [Orbit, "Movimiento premium", "Animaciones suaves, útiles y con intención visual."],
                [MousePointer2, "Interacción memorable", "Detalles que hacen que la experiencia se sienta viva."],
              ].map(([Icon, title, text]) => {
                const LucideIcon = Icon as typeof Layers3

                return (
                  <div
                    key={title as string}
                    className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/[0.065]"
                  >
                    <LucideIcon className="mb-4 h-4 w-4 text-white/65" />
                    <h3 className="text-sm font-semibold text-white/90">
                      {title as string}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/52">
                      {text as string}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          <div
            ref={cardRef}
            className="relative overflow-hidden rounded-[42px] border border-white/12 bg-white/[0.065] p-5 shadow-[0_45px_190px_rgba(0,0,0,0.72)] backdrop-blur-2xl md:p-6"
          >
            <div
              ref={scanRef}
              className="pointer-events-none absolute left-0 right-0 top-0 h-28 bg-gradient-to-b from-cyan-300/0 via-cyan-200/[0.09] to-cyan-300/0"
            />

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.2),transparent_25%,transparent_62%,rgba(255,255,255,0.08))]" />
            <div className="pointer-events-none absolute inset-[1px] rounded-[41px] border border-white/[0.06]" />
            <div className="pointer-events-none absolute -right-28 -top-28 h-60 w-60 rounded-full bg-indigo-500/24 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-28 h-60 w-60 rounded-full bg-fuchsia-500/22 blur-3xl" />

            <div className="relative z-10">
              <div className="mb-6 flex items-start justify-between gap-5">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.34em] text-white/38">
                    Developer Core
                  </div>

                  <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-white">
                    Diseño la experiencia. Construyo la lógica.
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/58">
                    Mi punto fuerte está en unir estética, interacción y código
                    para crear productos digitales con utilidad real y una
                    presencia visual potente.
                  </p>
                </div>

                <div className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] p-2 text-white/70">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>

              <div
                ref={terminalRef}
                className="mb-5 rounded-[30px] border border-white/10 bg-black/35 p-4"
              >
                <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                  <Radio className="h-3.5 w-3.5" />
                  Live profile
                </div>

                {[
                  ["emerald", "analizando idea del cliente..."],
                  ["cyan", "diseñando sistema visual..."],
                  ["fuchsia", "conectando lógica + experiencia..."],
                  ["white", "preparando lanzamiento memorable..."],
                ].map(([color, text]) => (
                  <p key={text} className="font-mono text-xs leading-6 text-white/55">
                    <span
                      className={
                        color === "emerald"
                          ? "text-emerald-300"
                          : color === "cyan"
                          ? "text-cyan-300"
                          : color === "fuchsia"
                          ? "text-fuchsia-300"
                          : "text-white"
                      }
                    >
                      ●
                    </span>{" "}
                    {text}
                  </p>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
                  <Cpu className="mb-3 h-4 w-4 text-white/60" />
                  <div className="text-sm font-semibold text-white/90">
                    Automatización
                  </div>
                  <p className="mt-2 text-xs leading-5 text-white/48">
                    Flujos, bots, APIs y procesos conectados.
                  </p>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
                  <Globe2 className="mb-3 h-4 w-4 text-white/60" />
                  <div className="text-sm font-semibold text-white/90">
                    Web Apps
                  </div>
                  <p className="mt-2 text-xs leading-5 text-white/48">
                    Interfaces modernas listas para producción.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-[30px] border border-white/10 bg-black/25 p-4">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                    Especialidades
                  </div>
                  <Zap className="h-4 w-4 text-white/45" />
                </div>

                <div ref={skillsRef} className="grid gap-2 sm:grid-cols-2">
                  {skills.map((skill, index) => (
                    <div
                      key={skill}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 transition duration-300 hover:border-white/20 hover:bg-white/[0.075]"
                    >
                      <div className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-gradient-to-b from-cyan-300 via-white to-fuchsia-300 transition-transform duration-500 group-hover:scale-y-100" />

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] tracking-[0.25em] text-white/32">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="text-sm font-medium text-white/78">
                          {skill}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div ref={pillarsRef} className="mt-5 grid gap-3">
                {pillars.map((pillar) => {
                  const Icon = pillar.icon

                  return (
                    <div
                      key={pillar.title}
                      className="group rounded-[24px] border border-white/10 bg-white/[0.035] p-4 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.065]"
                    >
                      <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/70">
                          <Icon className="h-4 w-4" />
                        </div>

                        <h4 className="text-sm font-semibold text-white/90">
                          {pillar.title}
                        </h4>
                      </div>

                      <p className="text-sm leading-6 text-white/55">
                        {pillar.text}
                      </p>
                    </div>
                  )
                })}
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4">
                  <ShieldCheck className="mb-3 h-4 w-4 text-white/60" />
                  <p className="text-sm font-semibold text-white/88">
                    Responsive real
                  </p>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4">
                  <Command className="mb-3 h-4 w-4 text-white/60" />
                  <p className="text-sm font-semibold text-white/88">
                    Lógica escalable
                  </p>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4">
                  <Network className="mb-3 h-4 w-4 text-white/60" />
                  <p className="text-sm font-semibold text-white/88">
                    APIs conectadas
                  </p>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.035] p-4">
                  <Fingerprint className="mb-3 h-4 w-4 text-white/60" />
                  <p className="text-sm font-semibold text-white/88">
                    Identidad propia
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-[28px] border border-white/10 bg-black/30 p-4">
                <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                  <Braces className="h-3.5 w-3.5" />
                  Core principle
                </div>

                <p className="text-sm leading-6 text-white/58">
                  No se trata solo de que se vea bonito. Se trata de que el
                  producto tenga presencia, lógica, velocidad y una experiencia
                  que el cliente recuerde.
                </p>
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