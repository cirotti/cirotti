import { useEffect, useMemo, useRef, memo, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Github,
  ArrowUpRight,
  Sparkles,
  Eye,
  Layers3,
  MonitorPlay,
  MousePointer2,
  Radio,
  Star,
  Zap,
  Play,
  ExternalLink,
  Code2,
} from "lucide-react"
import GlitchText from "../GlitchText"

gsap.registerPlugin(ScrollTrigger)

interface Project {
  title: string
  categoria: string
  anio: string
  descripcion: string
  githubUrl: string
  projectUrl?: string
  image: string
}

const projects: Project[] = [
  {
    title: "SGC Servicios",
    categoria: "Trabajos en Altura",
    anio: "2026",
    descripcion:
      "Sitio corporativo premium para una empresa especializada en trabajos en altura, accesos difíciles, mantenimiento industrial y soluciones de alta complejidad.",
    githubUrl: "https://sgc-servicios.vercel.app/",
    projectUrl: "https://sgc-servicios.vercel.app/",
    image: `${import.meta.env.BASE_URL}sgcservicios2.png`,
  },
  {
    title: "Servicio Iphone",
    categoria: "Servicio Tecnico Iphone",
    anio: "2026",
    descripcion:
      "Servicio técnico iPhone en Santiago. Pantallas, baterías, cámaras, puertos de carga y diagnóstico profesional con atención a domicilio y garantía real.",
    githubUrl: "https://serviciotecnicoiphone.cl/",
    projectUrl: "https://serviciotecnicoiphone.cl/",
    image: `${import.meta.env.BASE_URL}sti.png`,
  },
  {
    title: "TSPC",
    categoria: "Warzone Tournaments",
    anio: "2026",
    descripcion:
      "Plataforma competitiva enfocada en torneos de Warzone, eventos, rankings y experiencia gamer.",
    githubUrl: "https://tspc-esports.vercel.app/",
    projectUrl: "https://tspc-esports.vercel.app/",
    image: `${import.meta.env.BASE_URL}tspc.png`,
  },
  {
    title: "DecoSistemas",
    categoria: "TV & Streaming",
    anio: "2025",
    descripcion:
      "Plataforma para decodificadores, TV permanente y apps de streaming dentro de un ecosistema visual.",
    githubUrl: "https://deco-sistemas.vercel.app/",
    projectUrl: "https://deco-sistemas.vercel.app/",
    image: `${import.meta.env.BASE_URL}decosistemas.png`,
  },
]

const Work = memo(() => {
  const sectionRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLAnchorElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)
  const bigTextRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLParagraphElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const previewImgRef = useRef<HTMLImageElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)
  const mobileHintRef = useRef<HTMLDivElement>(null)

  const [active, setActive] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const particles = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        left: `${(i * 19.37 + 7) % 100}%`,
        top: `${(i * 11.91 + 13) % 100}%`,
        size: 1 + (i % 4),
        delay: (i % 12) * 0.16,
        duration: 2.1 + (i % 8) * 0.35,
      })),
    []
  )

  const activeProject = projects[active]

  const animatePreview = () => {
    if (!previewImgRef.current) return

    gsap.fromTo(
      previewImgRef.current,
      { scale: 1.12, opacity: 0.45, filter: "blur(6px)" },
      {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.42,
        ease: "power3.out",
      }
    )

    if (previewRef.current) {
      gsap.fromTo(
        previewRef.current,
        { scale: 0.975 },
        { scale: 1, duration: 0.42, ease: "power3.out" }
      )
    }
  }

  const activateProject = (index: number) => {
    setActive(index)

    if (cursorRef.current) {
      cursorRef.current.href = projects[index].projectUrl || projects[index].githubUrl
    }

    animatePreview()

    if (!isMobile) {
      gsap.to(cursorRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.28,
        ease: "power3.out",
        overwrite: "auto",
      })
    }
  }

  const hideCursor = () => {
    if (isMobile) return

    gsap.to(cursorRef.current, {
      scale: 0.65,
      opacity: 0,
      duration: 0.22,
      ease: "power3.out",
      overwrite: "auto",
    })
  }

  const openProject = (project: Project) => {
    window.open(project.projectUrl || project.githubUrl, "_blank", "noopener,noreferrer")
  }

  useEffect(() => {
    const section = sectionRef.current
    const light = lightRef.current

    if (!section || !light) return

    const xTo = gsap.quickTo(light, "x", { duration: 0.45, ease: "power3.out" })
    const yTo = gsap.quickTo(light, "y", { duration: 0.45, ease: "power3.out" })

    const moveLight = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      xTo(e.clientX - rect.left - 190)
      yTo(e.clientY - rect.top - 190)
    }

    section.addEventListener("mousemove", moveLight, { passive: true })

    const ctx = gsap.context(() => {
      gsap.set(cursorRef.current, {
        xPercent: -50,
        yPercent: -50,
        scale: 0.65,
        opacity: 0,
        pointerEvents: "none",
      })

      const parallax = {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }

      gsap.to(gridRef.current, {
        yPercent: 16,
        ease: "none",
        scrollTrigger: parallax,
      })

      gsap.to(bigTextRef.current, {
        xPercent: -28,
        ease: "none",
        scrollTrigger: parallax,
      })

      gsap.to(orbitRef.current, {
        rotate: 360,
        duration: 46,
        ease: "none",
        repeat: -1,
      })

      gsap.fromTo(
        [titleRef.current, introRef.current, previewRef.current, metaRef.current],
        { y: 45, opacity: 0, filter: "blur(8px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.12,
          duration: 0.75,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        }
      )

      gsap.fromTo(
        railRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        }
      )

      gsap.fromTo(
        ".work-item",
        {
          y: window.innerWidth < 768 ? 40 : 70,
          opacity: 0,
          filter: "blur(6px)",
          scale: window.innerWidth < 768 ? 0.96 : 1,
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 0.65,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 84%",
          },
        }
      )

      gsap.fromTo(
        mobileHintRef.current,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 88%",
          },
        }
      )

      gsap.to(".work-float", {
        y: -14,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.16,
      })

      gsap.to(".work-orb", {
        scale: 1.35,
        opacity: 1,
        duration: 1.9,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 0.25,
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      section.removeEventListener("mousemove", moveLight)
    }
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.16, ease: "power3.out" })
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.16, ease: "power3.out" })

    const move = (e: MouseEvent) => {
      if (window.innerWidth < 1024) return
      xTo(e.clientX)
      yTo(e.clientY)
    }

    window.addEventListener("mousemove", move, { passive: true })
    return () => window.removeEventListener("mousemove", move)
  }, [])

  useEffect(() => {
    if (!projectsRef.current) return

    const container = projectsRef.current

    let ticking = false

    const updateMobileScroll = () => {
      ticking = false
      if (window.innerWidth >= 1024) return

      const cards = Array.from(container.children) as HTMLElement[]
      const center = container.scrollLeft + container.clientWidth / 2

      let closestIndex = 0
      let closestDistance = Infinity

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.clientWidth / 2
        const distance = Math.abs(center - cardCenter)
        const strength = Math.max(0, 1 - distance / container.clientWidth)
        const img = card.querySelector(".work-card-img")

        gsap.to(card, {
          scale: 0.96 + strength * 0.04,
          opacity: 0.72 + strength * 0.28,
          duration: 0.18,
          ease: "power2.out",
          overwrite: "auto",
        })

        if (img) {
          gsap.to(img, {
            y: (1 - strength) * 12,
            scale: 1.04 + strength * 0.03,
            duration: 0.18,
            ease: "power2.out",
            overwrite: "auto",
          })
        }

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      if (closestIndex !== active) setActive(closestIndex)
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateMobileScroll)
      }
    }

    container.addEventListener("scroll", onScroll, { passive: true })
    updateMobileScroll()

    return () => container.removeEventListener("scroll", onScroll)
  }, [active])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative isolate overflow-hidden px-5 py-24 text-white sm:px-6 md:px-10 md:py-32 lg:px-16 xl:px-24"
    >
      <a
        ref={cursorRef}
        href={activeProject.projectUrl || activeProject.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden lg:flex"
        aria-label="Ver proyecto"
      >
        <div className="relative flex h-[108px] w-[108px] items-center justify-center rounded-full border border-cyan-200/35 bg-black/45 backdrop-blur-xl shadow-[0_0_34px_rgba(103,232,249,0.32)]">
          <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl" />
          <div className="absolute inset-3 rounded-full border border-white/10" />
          <span className="relative z-10 font-mono text-[12px] uppercase tracking-[0.34em] text-cyan-100">
            View
          </span>
        </div>
      </a>

      <div className="absolute inset-0 -z-20 bg-[#030511]" />

      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_58%_0%,rgba(99,102,241,0.22),transparent_34%),radial-gradient(circle_at_85%_50%,rgba(217,70,239,0.18),transparent_32%),radial-gradient(circle_at_20%_78%,rgba(34,211,238,0.12),transparent_30%),linear-gradient(180deg,rgba(3,5,17,0.02)_0%,rgba(3,5,17,0.42)_45%,rgba(0,0,0,0.88)_100%)]" />

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
        className="pointer-events-none absolute left-0 top-0 z-[2] h-[380px] w-[380px] rounded-full bg-white/[0.06] blur-[90px]"
      />

      <div className="pointer-events-none absolute inset-0 z-[2]">
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
        className="pointer-events-none absolute left-[-48%] top-[8%] z-[1] whitespace-nowrap text-[22vw] font-black uppercase leading-none tracking-[-0.095em] text-white/[0.03] sm:left-[-24%] sm:text-[17vw] lg:left-[-12%] lg:text-[13vw]"
      >
        SELECTED WORK — DIGITAL WORLDS — SHOWCASE —
      </div>

      <div className="pointer-events-none absolute right-[3%] top-[8%] z-[2] hidden h-[40rem] w-[40rem] rounded-full border border-white/[0.07] lg:block">
        <div
          ref={orbitRef}
          className="absolute inset-10 rounded-full border border-dashed border-cyan-200/[0.1]"
        >
          <span className="work-orb absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-200 opacity-70 shadow-[0_0_34px_rgba(165,243,252,0.95)]" />
          <span className="work-orb absolute bottom-12 right-12 h-2 w-2 rounded-full bg-fuchsia-200 opacity-70 shadow-[0_0_28px_rgba(245,208,254,0.9)]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1500px]">
        <div className="mb-14 grid gap-10 lg:grid-cols-[86px_minmax(0,1fr)_minmax(340px,520px)] lg:items-end xl:gap-16">
          <aside className="hidden lg:flex lg:flex-col lg:items-center lg:justify-between">
            <div className="font-mono text-[10px] uppercase tracking-[0.46em] text-white/35 [writing-mode:vertical-rl] rotate-180">
              WORK / SHOWCASE / SELECTED PROJECTS
            </div>

            <div
              ref={railRef}
              className="mt-8 h-36 w-px bg-gradient-to-b from-transparent via-white/45 to-transparent"
            />
          </aside>

          <div>
            <div
              ref={metaRef}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-xl"
            >
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-white/55">
                Proyectos seleccionados
              </span>
            </div>

            <div
              ref={titleRef}
              className="max-w-[1050px] text-[clamp(3rem,6.2vw,7rem)] font-black uppercase leading-[0.82] tracking-[-0.08em]"
            >
              <div className="overflow-hidden pb-1">
                <div className="bg-gradient-to-r from-white via-white to-white/45 bg-clip-text text-transparent">
                  Trabajos que
                </div>
              </div>
              <div className="overflow-hidden pb-1">
                <div className="bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-transparent">
                  hablan antes
                </div>
              </div>
              <div className="overflow-hidden pb-1">
                <div>que yo.</div>
              </div>
            </div>
          </div>

          <p
            ref={introRef}
            className="max-w-[440px] text-sm leading-7 text-white/60 md:text-base"
          >
            Cada proyecto es una prueba de dirección visual, lógica, interacción
            y detalle. No solo muestro pantallas: muestro experiencias que una
            marca podría usar para verse distinta.
          </p>
        </div>

        <div
          ref={mobileHintRef}
          className="mb-4 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 text-xs text-white/55 backdrop-blur-xl lg:hidden"
        >
          <span className="inline-flex items-center gap-2">
            <Play className="h-3.5 w-3.5 text-cyan-200" />
            Desliza para explorar
          </span>
          <span className="font-mono tracking-[0.25em]">
            {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,0.8fr)] xl:gap-12">
          <div
            ref={projectsRef}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-7 [scrollbar-width:none] [-ms-overflow-style:none] lg:block lg:space-y-4 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((project, index) => {
              const isActive = active === index

              return (
                <article
                  key={project.title}
                  className={`work-item group relative min-w-[86%] snap-center cursor-pointer overflow-hidden rounded-[34px] border p-5 backdrop-blur-xl transition duration-500 active:scale-[0.97] sm:min-w-[72%] md:p-6 lg:min-w-0 ${isActive
                    ? "border-cyan-200/25 bg-white/[0.08] shadow-[0_18px_55px_rgba(34,211,238,0.10)]"
                    : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]"
                    }`}
                  onMouseEnter={() => !isMobile && activateProject(index)}
                  onMouseLeave={() => !isMobile && hideCursor()}
                  onClick={() => {
                    if (isMobile) {
                      activateProject(index)
                    } else {
                      openProject(project)
                    }
                  }}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_10%_50%,rgba(34,211,238,0.16),transparent_34%),radial-gradient(circle_at_90%_50%,rgba(217,70,239,0.14),transparent_34%)]" />

                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                  <div className="relative z-10 grid gap-5 md:grid-cols-[1fr_150px] md:items-center">
                    <div>
                      <div className="mb-5 flex flex-wrap items-center gap-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/38">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
                          {project.categoria}
                        </span>

                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/34">
                          {project.anio}
                        </span>
                      </div>

                      <div className="mb-4 flex items-center gap-4">
                        <GlitchText
                          text={project.title}
                          as="h3"
                          className="text-3xl font-semibold leading-none tracking-[-0.055em] text-white sm:text-4xl lg:text-[3.3rem]"
                        />

                        <ArrowUpRight className="h-5 w-5 text-white/45 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white" />
                      </div>

                      <p className="max-w-[48ch] text-sm leading-7 text-white/58 md:text-[15px]">
                        {project.descripcion}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-2 text-xs text-white/60">
                          <Eye className="h-3.5 w-3.5" />
                          Live preview
                        </span>

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-2 text-xs text-white/60 transition hover:border-white/20 hover:text-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-3.5 w-3.5" />
                          Source
                        </a>
                      </div>
                    </div>

                    <div className="relative h-[170px] overflow-hidden rounded-[26px] border border-white/10 bg-black/35 md:h-[150px]">
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="work-card-img h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/10" />

                      <div className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/35 text-white/70 backdrop-blur-xl lg:hidden">
                        <ExternalLink className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div
            ref={previewRef}
            className="relative h-fit overflow-hidden rounded-[42px] border border-white/12 bg-white/[0.065] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl lg:sticky lg:top-24"
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.2),transparent_25%,transparent_62%,rgba(255,255,255,0.08))]" />
            <div className="pointer-events-none absolute inset-[1px] rounded-[41px] border border-white/[0.06]" />

            <div className="relative z-10">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                </div>

                <span className="rounded-full border border-cyan-200/15 bg-cyan-300/[0.06] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-100/70">
                  Active preview
                </span>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden rounded-[30px] border border-white/10 bg-black/40">
                <img
                  ref={previewImgRef}
                  src={activeProject.image}
                  alt={activeProject.title}
                  loading="eager"
                  decoding="async"
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-white/10" />

                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="rounded-[24px] border border-white/10 bg-black/40 p-4 backdrop-blur-xl">
                    <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/38">
                      <Radio className="h-3.5 w-3.5" />
                      Selected case
                    </div>

                    <h3 className="text-2xl font-semibold tracking-[-0.04em] text-white">
                      {activeProject.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/58">
                      {activeProject.descripcion}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  [Layers3, "Identidad"],
                  [MonitorPlay, "Interfaz"],
                  [MousePointer2, "Interacción"],
                ].map(([Icon, label]) => {
                  const LucideIcon = Icon as typeof Layers3

                  return (
                    <div
                      key={label as string}
                      className="work-float rounded-[22px] border border-white/10 bg-black/25 p-4"
                    >
                      <LucideIcon className="mb-3 h-4 w-4 text-white/60" />
                      <p className="text-xs font-medium text-white/72">
                        {label as string}
                      </p>
                    </div>
                  )
                })}
              </div>

              <button
                type="button"
                onClick={() => openProject(activeProject)}
                className="mt-5 flex w-full items-center justify-between rounded-[26px] border border-white/10 bg-white/[0.045] px-5 py-4 text-sm font-medium text-white/78 transition hover:border-white/20 hover:bg-white/[0.075] hover:text-white active:scale-[0.98]"
              >
                Abrir proyecto
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {[
            [Star, "Selección curada", "Solo proyectos donde la experiencia visual tiene intención."],
            [Zap, "Impacto rápido", "Diseños pensados para llamar la atención desde el primer vistazo."],
            [Sparkles, "Detalle premium", "Microinteracciones, profundidad y estética consistente con tu marca."],
          ].map(([Icon, title, text]) => {
            const LucideIcon = Icon as typeof Star

            return (
              <div
                key={title as string}
                className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl"
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

        <div className="mt-4 rounded-[28px] border border-white/10 bg-black/25 p-5 backdrop-blur-xl lg:hidden">
          <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
            <Code2 className="h-3.5 w-3.5" />
            Mobile experience
          </div>

          <p className="text-sm leading-6 text-white/56">
            En mobile, la galería se comporta como una experiencia tipo app:
            desliza, toca un proyecto y mira cómo cambia el preview activo.
          </p>
        </div>
      </div>
    </section>
  )
})

Work.displayName = "Work"

export default Work