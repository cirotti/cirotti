import { useEffect, useMemo, useRef, memo, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"
import {
  ArrowUpRight,
  Copy,
  Check,
  Sparkles,
  Orbit,
  Mail,
  Clock3,
  Wand2,
} from "lucide-react"
import GlitchText from "../GlitchText"

gsap.registerPlugin(ScrollTrigger)

const socials = [
  { label: "Github", url: "https://github.com/iamovi", meta: "Code / builds" },
  { label: "Twitter", url: "https://x.com/hahahaovi", meta: "Thoughts / drops" },
  { label: "Itch.io", url: "https://iamovi.itch.io", meta: "Experiments / games" },
]

const Contact = memo(() => {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLParagraphElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLButtonElement>(null)
  const socialsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const bgTextRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const glowARef = useRef<HTMLDivElement>(null)
  const glowBRef = useRef<HTMLDivElement>(null)
  const glowCRef = useRef<HTMLDivElement>(null)
  const orbitalRef = useRef<HTMLDivElement>(null)
  const badgeRowRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  const [copied, setCopied] = useState(false)

  const particles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${(i * 5.37 + 7) % 100}%`,
        top: `${(i * 11.23 + 13) % 100}%`,
        size: 2 + (i % 4),
        delay: (i % 7) * 0.35,
        duration: 3.2 + (i % 5) * 0.65,
      })),
    []
  )

  useEffect(() => {
    let split: SplitType | null = null
    let splitWords: SplitType | null = null

    const mm = gsap.matchMedia()

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        split = new SplitType(titleRef.current, {
          types: "lines,words",
          lineClass: "contact-line",
          wordClass: "contact-word",
        })

        gsap.set(split.lines, { overflow: "hidden" })

        gsap.from(split.words, {
          yPercent: 120,
          opacity: 0,
          rotateX: -75,
          transformOrigin: "50% 100%",
          stagger: 0.028,
          duration: 1.15,
          ease: "power4.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 84%",
          },
        })
      }

      if (introRef.current) {
        splitWords = new SplitType(introRef.current, { types: "words" })

        gsap.from(splitWords.words, {
          opacity: 0,
          y: 18,
          stagger: 0.008,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: introRef.current,
            start: "top 88%",
          },
        })
      }

      gsap.from(badgeRowRef.current?.children || [], {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: badgeRowRef.current,
          start: "top 88%",
        },
      })

      gsap.from(cardRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.965,
        rotateX: -8,
        transformOrigin: "50% 100%",
        duration: 1.25,
        ease: "power4.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 88%",
        },
      })

      gsap.from(socialsRef.current?.children || [], {
        y: 28,
        opacity: 0,
        stagger: 0.09,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: socialsRef.current,
          start: "top 90%",
        },
      })

      gsap.from(statsRef.current?.children || [], {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 92%",
        },
      })

      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "0% 50%",
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 94%",
        },
      })

      gsap.to(bgTextRef.current, {
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

      gsap.to(glowARef.current, {
        xPercent: 10,
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(glowBRef.current, {
        xPercent: -8,
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(glowCRef.current, {
        xPercent: -4,
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      if (orbitalRef.current) {
        gsap.to(orbitalRef.current, {
          rotate: 360,
          duration: 24,
          ease: "none",
          repeat: -1,
        })
      }

      mm.add("(min-width: 768px)", () => {
        if (cardRef.current) {
          gsap.to(cardRef.current, {
            yPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          })
        }
      })

      const emailEl = emailRef.current
      if (emailEl) {
        const onMove = (e: MouseEvent) => {
          const rect = emailEl.getBoundingClientRect()
          const x = e.clientX - rect.left - rect.width / 2
          const y = e.clientY - rect.top - rect.height / 2

          gsap.to(emailEl, {
            x: x * 0.06,
            y: y * 0.12,
            duration: 0.35,
            ease: "power3.out",
          })
        }

        const onLeave = () => {
          gsap.to(emailEl, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
          })
        }

        emailEl.addEventListener("mousemove", onMove)
        emailEl.addEventListener("mouseleave", onLeave)

        return () => {
          emailEl.removeEventListener("mousemove", onMove)
          emailEl.removeEventListener("mouseleave", onLeave)
        }
      }
    }, sectionRef)

    return () => {
      ctx.revert()
      mm.revert()
      split?.revert()
      splitWords?.revert()
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("cirottidev@gmail.com")
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {}
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden px-4 py-24 sm:px-6 md:px-10 md:py-32 lg:px-16 xl:px-24"
    >
      {/* Base gradient atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_28%),linear-gradient(180deg,rgba(6,8,20,0.25)_0%,rgba(4,6,18,0.78)_40%,rgba(2,4,14,1)_100%)]" />

      {/* Grid */}
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "78px 78px",
          maskImage:
            "radial-gradient(circle at center, black 28%, rgba(0,0,0,0.65) 52%, transparent 84%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black 28%, rgba(0,0,0,0.65) 52%, transparent 84%)",
        }}
      />

      {/* soft vignettes */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/[0.04] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/50 to-transparent" />

      {/* giant text */}
      <div
        ref={bgTextRef}
        className="pointer-events-none absolute left-[-42%] top-[11%] whitespace-nowrap select-none text-[24vw] font-black leading-none tracking-[-0.08em] text-white/[0.03] sm:left-[-22%] sm:text-[18vw] lg:left-[-12%] lg:text-[15vw]"
      >
        LET&apos;S TALK — LET&apos;S CREATE — LET&apos;S BUILD
      </div>

      {/* Glows */}
      <div
        ref={glowARef}
        className="pointer-events-none absolute left-[-8%] top-[4%] h-[24rem] w-[24rem] rounded-full bg-indigo-500/20 blur-[120px] sm:h-[30rem] sm:w-[30rem] md:h-[40rem] md:w-[40rem] md:blur-[180px]"
      />
      <div
        ref={glowBRef}
        className="pointer-events-none absolute bottom-[-12%] right-[-10%] h-[22rem] w-[22rem] rounded-full bg-fuchsia-500/16 blur-[120px] sm:h-[28rem] sm:w-[28rem] md:h-[36rem] md:w-[36rem] md:blur-[180px]"
      />
      <div
        ref={glowCRef}
        className="pointer-events-none absolute right-[20%] top-[28%] h-[16rem] w-[16rem] rounded-full bg-cyan-400/10 blur-[100px] sm:h-[20rem] sm:w-[20rem] md:h-[28rem] md:w-[28rem] md:blur-[150px]"
      />

      {/* orbital halo */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          ref={orbitalRef}
          className="absolute left-1/2 top-[18%] h-[18rem] w-[18rem] -translate-x-1/2 rounded-full border border-white/[0.08] sm:h-[22rem] sm:w-[22rem] lg:top-[14%] lg:h-[34rem] lg:w-[34rem]"
        >
          <div className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-white/70 shadow-[0_0_24px_rgba(255,255,255,0.95)]" />
        </div>
      </div>

      {/* particles */}
      <div className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-white/60 animate-pulse"
            style={{
              left: p.left,
              top: p.top,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              boxShadow: "0 0 18px rgba(255,255,255,0.45)",
            }}
          />
        ))}
      </div>

      {/* subtle noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-soft-light"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35) 0.5px, transparent 0.8px), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.28) 0.5px, transparent 0.8px), radial-gradient(circle at 50% 70%, rgba(255,255,255,0.24) 0.5px, transparent 0.8px)",
          backgroundSize: "24px 24px, 28px 28px, 32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1460px]">
        <div className="grid items-end gap-10 lg:grid-cols-[84px_minmax(0,1.15fr)_minmax(320px,430px)] xl:grid-cols-[96px_minmax(0,1.2fr)_430px] xl:gap-16">
          {/* left rail */}
          <div className="hidden lg:flex lg:h-full lg:flex-col lg:justify-between">
            <div className="font-mono text-[10px] uppercase tracking-[0.45em] text-white/38 [writing-mode:vertical-rl] rotate-180">
              CONTACT / AVAILABLE FOR FREELANCE / SELECTED PROJECTS
            </div>

            <div className="mx-auto h-28 w-px bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
          </div>

          {/* left content */}
          <div className="relative max-w-[900px]">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 backdrop-blur-xl">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/55">
                Open for selected work
              </span>
            </div>

            <div
              ref={titleRef}
              className="overflow-hidden text-[clamp(2.65rem,8vw,7.2rem)] font-semibold leading-[0.9] tracking-[-0.065em]"
            >
              <div className="overflow-hidden">Construyamos</div>
              <div className="overflow-hidden">
                <GlitchText
                  text="algo inolvidable"
                  className="block text-stroke"
                />
              </div>
              <div className="overflow-hidden">para tu marca</div>
            </div>

            <p
              ref={introRef}
              className="mt-7 max-w-[680px] text-[0.98rem] leading-7 text-white/62 sm:text-[1.02rem] md:mt-8 md:text-[1.05rem] md:leading-8"
            >
              Diseño y desarrollo experiencias web con presencia, tensión visual
              y personalidad real. No busco hacer “otra web más”, sino una pieza
              digital que haga sentir algo desde el primer segundo, también en
              mobile.
            </p>

            <div
              ref={badgeRowRef}
              className="mt-8 flex flex-wrap gap-3 md:mt-10"
            >
              <div className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2.5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.075]">
                <Orbit className="h-4 w-4 text-white/70" />
                <span className="text-sm text-white/78">Webs con identidad</span>
              </div>

              <div className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2.5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.075]">
                <Wand2 className="h-4 w-4 text-white/70" />
                <span className="text-sm text-white/78">Motion con intención</span>
              </div>

              <div className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2.5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.075]">
                <Mail className="h-4 w-4 text-white/70" />
                <span className="text-sm text-white/78">Freelance & collabs</span>
              </div>
            </div>

            <div
              ref={lineRef}
              className="mt-10 h-px w-full max-w-[720px] bg-gradient-to-r from-white/35 via-white/10 to-transparent"
            />

            <div className="mt-8 grid max-w-[740px] gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4 backdrop-blur-xl">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/36">
                  Approach
                </div>
                <div className="text-sm leading-6 text-white/80">
                  Diseño, código y detalle en una sola pieza.
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4 backdrop-blur-xl">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/36">
                  Intent
                </div>
                <div className="text-sm leading-6 text-white/80">
                  Que tu proyecto se vea distinto y se sienta vivo.
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4 backdrop-blur-xl">
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/36">
                  Devices
                </div>
                <div className="text-sm leading-6 text-white/80">
                  Experiencia cuidada en desktop, tablet y mobile.
                </div>
              </div>
            </div>
          </div>

          {/* right card */}
          <div
            ref={cardRef}
            className="relative overflow-hidden rounded-[30px] border border-white/12 bg-white/[0.055] p-4 shadow-[0_40px_140px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-5 md:p-6"
          >
            {/* layered highlights */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_24%,transparent_56%,rgba(255,255,255,0.08)_100%)]" />
            <div className="pointer-events-none absolute inset-[1px] rounded-[29px] border border-white/6" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
            <div className="pointer-events-none absolute -left-16 top-8 h-36 w-36 rounded-full bg-indigo-500/18 blur-3xl" />
            <div className="pointer-events-none absolute -right-10 bottom-6 h-36 w-36 rounded-full bg-fuchsia-500/14 blur-3xl" />

            <div className="relative z-10">
              <div className="mb-7 flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
                    Direct contact
                  </div>

                  <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/8 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-emerald-300/80">
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.95)]" />
                    Disponible para proyectos
                  </div>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>

              <button
                ref={emailRef}
                onClick={handleCopy}
                className="group relative block w-full overflow-hidden rounded-[24px] border border-white/12 bg-[linear-gradient(180deg,rgba(8,10,24,0.82),rgba(5,6,18,0.92))] px-5 py-5 text-left transition-transform duration-300 will-change-transform sm:px-6 sm:py-6"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_0%_50%,rgba(99,102,241,0.16),transparent_30%),radial-gradient(circle_at_100%_50%,rgba(217,70,239,0.16),transparent_30%),linear-gradient(90deg,rgba(255,255,255,0.04),transparent,rgba(255,255,255,0.04))]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.34em] text-white/38">
                      Email
                    </div>

                    <div className="break-all text-[1.05rem] font-semibold leading-tight text-white sm:text-[1.15rem] md:text-[1.55rem]">
                      {copied ? "Correo copiado ✓" : "cirottidev@gmail.com"}
                    </div>

                    <div className="mt-2 text-xs text-white/45 sm:text-sm">
                      Presiona para copiar y hablar de tu proyecto
                    </div>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/75 transition-all duration-300 group-hover:scale-110 group-hover:border-white/20 group-hover:text-white">
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </button>

              <div
                ref={socialsRef}
                className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-1"
              >
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.035] px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
                  >
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[linear-gradient(120deg,rgba(255,255,255,0.06),transparent_35%,transparent_65%,rgba(255,255,255,0.04))]" />

                    <div className="relative z-10">
                      <div className="mb-3 flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
                          Social
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-white/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                      </div>

                      <div className="text-sm font-medium text-white/85">
                        {social.label}
                      </div>
                      <div className="mt-1 text-xs text-white/42">
                        {social.meta}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div
                ref={statsRef}
                className="mt-5 grid gap-3 sm:grid-cols-2"
              >
                <div className="rounded-[20px] border border-white/10 bg-white/[0.035] px-4 py-4 backdrop-blur-xl">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                    <Clock3 className="h-3.5 w-3.5" />
                    Tiempo de respuesta
                  </div>
                  <div className="mt-2 text-sm text-white/80">2–4 horas</div>
                </div>

                <div className="rounded-[20px] border border-white/10 bg-white/[0.035] px-4 py-4 backdrop-blur-xl">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                    Enfoque
                  </div>
                  <div className="mt-2 text-sm text-white/80">
                    Branding + Web + Motion
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.32em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 — Cirotti</span>
          <span>Creative Developer</span>
        </footer>
      </div>
    </section>
  )
})

Contact.displayName = "Contact"
export default Contact