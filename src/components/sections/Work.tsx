import { useEffect, useRef, memo, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Github, ArrowUpRight } from "lucide-react"
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
    title: "Scatelier",
    categoria: "Librería",
    anio: "2026",
    descripcion: "Librería CSS para animaciones de botones y texto.",
    githubUrl: "https://github.com/iamovi/",
    projectUrl: "https://github.com/iamovi/",
    image: `${import.meta.env.BASE_URL}scatelier.png`,
  },
{
  title: "TSPC",
  categoria: "Warzone Tournaments",
  anio: "2026",
  descripcion: "Plataforma competitiva enfocada en torneos de Warzone, con información de eventos, enfrentamientos, rankings y experiencia pensada para la comunidad gamer.",
  githubUrl: "https://tspc-esports.vercel.app/",
  projectUrl: "https://tspc-esports.vercel.app/",
  image: `${import.meta.env.BASE_URL}tspc.png`,
},
{
  title: "DecoSistemas",
  categoria: "TV & Streaming",
  anio: "2025",
  descripcion: "Plataforma enfocada en decodificadores para TV que permite acceder a televisión por cable permanente y aplicaciones de streaming en un solo ecosistema.",
  githubUrl: "https://deco-sistemas.vercel.app/",
  projectUrl: "https://deco-sistemas.vercel.app/",
  image: `${import.meta.env.BASE_URL}decosistemas.png`,
},
]

const Work = memo(() => {
  const sectionRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const cursorViewRef = useRef<HTMLAnchorElement>(null)
  const cursorLabelRef = useRef<HTMLSpanElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const bigTextRef = useRef<HTMLDivElement>(null)
  const glowLeftRef = useRef<HTMLDivElement>(null)
  const glowRightRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const [active, setActive] = useState<number | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cursorViewRef.current, {
        xPercent: -50,
        yPercent: -50,
        scale: 0.7,
        opacity: 0,
        pointerEvents: "none",
      })

      gsap.to(numberRef.current, {
        y: -220,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(bigTextRef.current, {
        xPercent: -28,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(gridRef.current, {
        yPercent: 16,
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
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      const items = gsap.utils.toArray<HTMLElement>(".project-item")

items.forEach((item, index) => {
  const title = item.querySelector(".project-title")
  const line = item.querySelector(".project-line")
  const glow = item.querySelector(".project-glow")
  const arrow = item.querySelector(".project-arrow")
  const meta = item.querySelector(".project-meta")
  const media = item.querySelector(".project-media")
  const mediaImg = item.querySelector(".project-media-img")
  const description = item.querySelector(".project-description")
  const chip = item.querySelector(".project-chip")

  gsap.from(item, {
    y: 90,
    opacity: 0,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: item,
      start: "top 88%",
    },
  })

  gsap.set(line, {
    scaleX: 0,
    transformOrigin: "left center",
  })

  gsap.set(glow, { opacity: 0 })
  gsap.set(arrow, { x: -18, opacity: 0, rotate: -8 })
  gsap.set(meta, { x: 0 })
  gsap.set(media, { scale: 0.94, rotate: -4, y: 10 })
  gsap.set(mediaImg, { scale: 1 })
  gsap.set(title, { x: 0 })

  const killProjectTweens = () => {
    gsap.killTweensOf([
      title,
      line,
      glow,
      arrow,
      meta,
      media,
      mediaImg,
      description,
      chip,
    ])
  }

  const enter = () => {
    setActive(index)

    if (cursorViewRef.current) {
      cursorViewRef.current.href =
        projects[index].projectUrl || projects[index].githubUrl
    }

    killProjectTweens()

    gsap.to(title, {
      x: 24,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    })

    gsap.to(line, {
      scaleX: 1,
      duration: 0.55,
      ease: "power3.out",
      overwrite: "auto",
    })

    gsap.to(glow, {
      opacity: 1,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    })

    gsap.to(arrow, {
      x: 0,
      opacity: 1,
      rotate: 0,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    })

    gsap.to(meta, {
      x: -8,
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    })

    gsap.to(media, {
      scale: 1,
      rotate: 0,
      y: 0,
      duration: 0.55,
      ease: "power3.out",
      overwrite: "auto",
    })

    gsap.to(mediaImg, {
      scale: 1.08,
      duration: 0.9,
      ease: "power3.out",
      overwrite: "auto",
    })

    gsap.to(description, {
      color: "rgba(255,255,255,0.82)",
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    })

    gsap.to(chip, {
      backgroundColor: "rgba(255,255,255,0.08)",
      borderColor: "rgba(255,255,255,0.18)",
      color: "rgba(255,255,255,0.86)",
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    })

    gsap.to(cursorViewRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.28,
      ease: "power3.out",
      overwrite: "auto",
    })
  }

  const leave = () => {
    setActive((prev) => (prev === index ? null : prev))

    killProjectTweens()

    gsap.to(title, {
      x: 0,
      duration: 0.32,
      ease: "power3.out",
      overwrite: "auto",
    })

    gsap.to(line, {
      scaleX: 0,
      duration: 0.35,
      ease: "power3.out",
      overwrite: "auto",
    })

    gsap.to(glow, {
      opacity: 0,
      duration: 0.28,
      ease: "power3.out",
      overwrite: "auto",
    })

    gsap.to(arrow, {
      x: -18,
      opacity: 0,
      rotate: -8,
      duration: 0.28,
      ease: "power3.out",
      overwrite: "auto",
    })

    gsap.to(meta, {
      x: 0,
      duration: 0.32,
      ease: "power3.out",
      overwrite: "auto",
    })

    gsap.to(media, {
      scale: 0.94,
      rotate: -4,
      y: 10,
      duration: 0.34,
      ease: "power3.out",
      overwrite: "auto",
    })

    gsap.to(mediaImg, {
      scale: 1,
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    })

    gsap.to(description, {
      color: "rgba(255,255,255,0.56)",
      duration: 0.28,
      ease: "power2.out",
      overwrite: "auto",
    })

    gsap.to(chip, {
      backgroundColor: "rgba(255,255,255,0.03)",
      borderColor: "rgba(255,255,255,0.1)",
      color: "rgba(255,255,255,0.45)",
      duration: 0.28,
      ease: "power2.out",
      overwrite: "auto",
    })

    gsap.to(cursorViewRef.current, {
      scale: 0.7,
      opacity: 0,
      duration: 0.2,
      ease: "power3.out",
      overwrite: "auto",
    })
  }

  item.addEventListener("mouseenter", enter)
  item.addEventListener("mouseleave", leave)
})
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!cursorViewRef.current) return

      const isDesktop = window.innerWidth >= 1024
      if (!isDesktop) return

      gsap.to(cursorViewRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.22,
        ease: "power3.out",
      })
    }

    window.addEventListener("mousemove", move)
    return () => window.removeEventListener("mousemove", move)
  }, [])

  const handleProjectClick = (project: Project) => {
    const url = project.projectUrl || project.githubUrl
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative overflow-hidden px-6 py-28 md:px-10 md:py-36 lg:px-16 xl:px-24"
    >
      <a
        ref={cursorViewRef}
        href={active !== null ? projects[active].projectUrl || projects[active].githubUrl : "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden lg:flex"
        aria-label="Ver proyecto"
      >
<div className="relative flex h-[130px] w-[130px] items-center justify-center rounded-full border border-cyan-300/40 bg-black/40 backdrop-blur-xl shadow-[0_0_40px_rgba(103,232,249,0.45)]">

  <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl" />

  <span className="relative z-10 font-mono text-[12px] uppercase tracking-[0.34em] text-cyan-200">
    View
  </span>

</div>
      </a>

      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(circle at center, black 45%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 45%, transparent 85%)",
        }}
      />

      <div
        ref={glowLeftRef}
        className="absolute left-[-12%] top-[12%] h-[32rem] w-[32rem] rounded-full bg-indigo-500/12 blur-[170px]"
      />
      <div
        ref={glowRightRef}
        className="absolute bottom-[-10%] right-[-8%] h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/12 blur-[170px]"
      />

      <div
        ref={bigTextRef}
        className="pointer-events-none absolute left-[-10%] top-[14%] whitespace-nowrap select-none text-[18vw] font-black leading-none text-white/[0.025]"
      >
        WORK — SHOWCASE — PROJECTS — WORK
      </div>

      <span
        ref={numberRef}
        className="pointer-events-none absolute right-[-1rem] top-[18%] select-none text-[9rem] font-black leading-none text-white/[0.04] sm:text-[12rem] lg:right-[2rem] lg:text-[18rem]"
      >
        02
      </span>

      <div className="relative z-10 mx-auto max-w-[1320px]">
        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end lg:gap-16">
          <div>
            <div className="mb-5 font-mono text-[10px] uppercase tracking-[0.38em] text-white/40">
              Proyectos seleccionados
            </div>

            <h2 className="max-w-[920px] text-[clamp(2.6rem,6vw,6rem)] font-semibold leading-[0.94] tracking-[-0.055em] text-white">
              Diseño experiencias y productos que buscan sentirse
              <span className="ml-[0.18em] inline-block text-stroke">
                únicos
              </span>
              , vivos y memorables.
            </h2>
          </div>

          <p className="max-w-[360px] text-sm leading-7 text-white/58 md:text-base">
            Una selección de proyectos donde combino identidad visual,
            interacción y detalle para construir interfaces con presencia,
            profundidad y carácter.
          </p>
        </div>

        <div ref={projectsRef} className="relative space-y-5">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="project-item group relative cursor-pointer overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.025] p-4 backdrop-blur-sm transition-colors duration-300 hover:border-white/14 md:p-5 lg:p-6"
              onClick={() => handleProjectClick(project)}
            >
              <div
                className="project-line absolute inset-0 origin-left rounded-[30px] bg-white/[0.03]"
                style={{ transform: "scaleX(0)" }}
              />

              <div className="project-glow absolute inset-0 rounded-[30px] bg-[radial-gradient(circle_at_18%_50%,rgba(99,102,241,0.15),transparent_30%),radial-gradient(circle_at_82%_50%,rgba(217,70,239,0.13),transparent_34%)] opacity-0" />

              <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                <div className="flex items-start justify-between gap-4 lg:col-span-7">
                  <div className="flex min-w-0 items-start gap-4 md:gap-5">
                    <div className="pt-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/38">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0">
                      <div className="mb-4 flex items-center gap-4 md:gap-5">
                        <div className="project-arrow translate-x-[-18px] rotate-[-8deg] opacity-0 text-white/70">
                          <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6" />
                        </div>

                        <GlitchText
                          text={project.title}
                          as="h3"
                          className="project-title text-3xl font-semibold leading-none tracking-[-0.05em] text-white sm:text-4xl lg:text-[3.35rem]"
                        />
                      </div>

                      <p className="project-description max-w-[42ch] text-sm leading-7 text-white/56 md:text-[15px]">
                        {project.descripcion}
                      </p>

                      <div className="project-meta mt-6 flex flex-wrap items-center gap-3">
                        <span className="project-chip rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
                          {project.categoria}
                        </span>

                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
                          {project.anio}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <div className="project-media relative h-[220px] translate-y-[10px] overflow-hidden rounded-[22px] border border-white/10 bg-black/40 shadow-[0_16px_50px_rgba(0,0,0,0.35)] scale-[0.94] rotate-[-4deg] lg:h-[240px]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-media-img h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/45 via-transparent to-white/10" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute left-4 top-4">
                      <span className="rounded-full border border-white/12 bg-black/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-white/74 backdrop-blur-md">
                        Showcase
                      </span>
                    </div>

                    <div className="absolute inset-0 hidden items-center justify-center lg:flex">
                      <div className="rounded-full border border-white/10 bg-black/35 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/70 opacity-0 transition-all duration-300 group-hover:opacity-100">
                        Hover to view
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-end justify-start lg:col-span-1 lg:justify-end">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/github inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition-all duration-300 hover:scale-105 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Ver repositorio de ${project.title}`}
                  >
                    <Github className="h-4 w-4 transition-transform duration-300 group-hover/github:scale-110" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
})

Work.displayName = "Work"
export default Work