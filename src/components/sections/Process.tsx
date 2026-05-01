import { memo, useLayoutEffect, useMemo, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Search,
  PenTool,
  Code2,
  Rocket,
  ArrowUpRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

type Step = {
  icon: LucideIcon
  n: string
  label: string
  title: string
  text: string
  side: string
}

const STEPS: Step[] = [
  {
    icon: Search,
    n: "01",
    label: "Strategy",
    title: "Primero entiendo por qué alguien debería elegirte.",
    text: "Antes de diseñar, traduzco tu negocio en una dirección clara: qué vendes, a quién le hablas y qué percepción necesitas construir.",
    side: "Diagnóstico, intención y posicionamiento.",
  },
  {
    icon: PenTool,
    n: "02",
    label: "Direction",
    title: "Después diseño una presencia que se siente inevitable.",
    text: "Jerarquía, ritmo visual, contraste, copy y motion. Todo se ordena para que tu marca se vea más seria, más confiable y más cara.",
    side: "Identidad visual aplicada a conversión.",
  },
  {
    icon: Code2,
    n: "03",
    label: "Build",
    title: "Lo convierto en una experiencia rápida y memorable.",
    text: "Desarrollo interfaces fluidas, responsive y cuidadas al detalle. No basta con verse bien: tiene que sentirse impecable.",
    side: "Frontend premium, performance y UX.",
  },
  {
    icon: Rocket,
    n: "04",
    label: "Launch",
    title: "Entrega lista para mostrar, vender y escalar.",
    text: "El resultado no es una web más. Es una pieza digital con dirección, narrativa y presencia para diferenciarte desde el primer segundo.",
    side: "Impacto, confianza y valor percibido.",
  },
]

const getStepPosition = (index: number) => {
  if (index === 0) return "mx-auto"
  if (index % 2 === 1) return "mx-auto md:ml-auto"
  return "mx-auto md:mr-auto"
}

const Process = memo(() => {
  const rootRef = useRef<HTMLElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const particles = useMemo(
    () =>
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        x: `${(i * 37) % 100}%`,
        y: `${(i * 61) % 100}%`,
        s: 2 + (i % 3),
        o: 0.12 + (i % 6) * 0.045,
      })),
    []
  )

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const mm = gsap.matchMedia()

      if (reduce) {
        gsap.set(".process-reveal, .process-step, .process-word", {
          opacity: 1,
          y: 0,
          yPercent: 0,
          filter: "blur(0px)",
        })
        return
      }

      gsap.set(".process-word", { yPercent: 120, rotateX: -45 })
      gsap.set(".process-reveal", { opacity: 0, y: 32, filter: "blur(16px)" })

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
        },
      })

      intro
        .to(".process-word", {
          yPercent: 0,
          rotateX: 0,
          duration: 1.15,
          stagger: 0.06,
          ease: "power4.out",
        })
        .to(
          ".process-reveal",
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.65"
        )

      gsap.to(progressRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 20%",
          end: "bottom 80%",
          scrub: true,
        },
      })

      gsap.to(".process-orbit", {
        rotate: 360,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      gsap.to(".process-dot", {
        x: "random(-28,28)",
        y: "random(-34,34)",
        opacity: "random(0.12,0.55)",
        duration: "random(2.5,5.5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.03,
      })

const steps = gsap.utils.toArray<HTMLElement>(".process-step")

steps.forEach((step, index) => {
  const isMobile = window.innerWidth < 768

  const fromX =
    index === 0
      ? 0
      : index % 2 === 1
      ? 140   // derecha
      : -140  // izquierda

gsap.fromTo(
  step,
  {
    opacity: 0,
    y: 140,
    x: fromX,
    scale: 0.94,
    rotate: index % 2 === 1 ? 3 : -3,
    filter: "blur(20px)",
    transformPerspective: 1000,
    z: -80,
  },
  {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotate: 0,
    z: 0,
    filter: "blur(0px)",
    duration: 1.3,
    ease: "power4.out",
    scrollTrigger: {
      trigger: step,
      start: "top 82%",
    },
  }
)

  // PARALLAX SUAVE (mantiene vida)
  gsap.to(step, {
    y: -30,
    ease: "none",
    scrollTrigger: {
      trigger: step,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  })
})

      mm.add("(min-width: 900px)", () => {
        let cx = 0
        let cy = 0
        let tx = 0
        let ty = 0
        let raf = 0

        const move = (event: MouseEvent) => {
          const rect = root.getBoundingClientRect()
          tx = event.clientX - rect.left
          ty = event.clientY - rect.top
        }

        const loop = () => {
          cx += (tx - cx) * 0.09
          cy += (ty - cy) * 0.09

          gsap.set(cursorRef.current, { x: cx, y: cy })
          raf = requestAnimationFrame(loop)
        }

        root.addEventListener("mousemove", move)
        raf = requestAnimationFrame(loop)

        return () => {
          root.removeEventListener("mousemove", move)
          cancelAnimationFrame(raf)
        }
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id="process"
      className="relative isolate overflow-hidden bg-[#030511] px-5 py-24 text-white sm:px-6 md:py-32 lg:px-10 xl:px-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_90%_20%,rgba(99,102,241,0.16),transparent_28%),radial-gradient(circle_at_60%_90%,rgba(217,70,239,0.13),transparent_32%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.12]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(3,5,17,0.9)_76%)]" />

        {particles.map((p) => (
          <span
            key={p.id}
            className="process-dot absolute rounded-full bg-cyan-100 shadow-[0_0_22px_rgba(103,232,249,0.8)]"
            style={{
              left: p.x,
              top: p.y,
              width: p.s,
              height: p.s,
              opacity: p.o,
            }}
          />
        ))}
      </div>

      <div
        ref={cursorRef}
        className="pointer-events-none absolute left-0 top-0 z-0 hidden h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-[80px] lg:block"
      />

      <div className="process-orbit pointer-events-none absolute right-[-220px] top-16 hidden h-[620px] w-[620px] rounded-full border border-white/10 lg:block">
        <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_35px_rgba(103,232,249,1)]" />
      </div>

      <div className="mx-auto max-w-[1560px]">
        <div className="mb-24 max-w-6xl">
          <div className="process-reveal mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
            <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-cyan-100/60">
              Process / Cirotti
            </span>
          </div>

          <h2 className="text-[clamp(3.3rem,10vw,10.5rem)] font-black uppercase leading-[0.76] tracking-[-0.105em]">
            {["No hago", "webs.", "hago", "presencia."].map((word, i) => (
              <span key={i} className="block overflow-hidden pb-2">
                <span
                  className={
                    i === 3
                      ? "process-word block origin-bottom bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-transparent"
                      : "process-word block origin-bottom"
                  }
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>

          <p className="process-reveal mt-8 max-w-2xl text-base leading-8 text-white/58 md:text-lg">
            Un sitio premium no se siente premium por tener efectos. Se siente premium
            cuando cada decisión tiene intención: mensaje, ritmo, jerarquía, velocidad y emoción.
          </p>

          <div className="process-reveal mt-10 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {["Strategy", "Design", "Motion", "Code"].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-5 backdrop-blur-xl"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/42">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto max-w-[1320px]">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-white/10 md:block">
            <div
              ref={progressRef}
              className="h-full w-full origin-top scale-y-0 bg-gradient-to-b from-cyan-300 via-indigo-300 to-fuchsia-300 shadow-[0_0_35px_rgba(103,232,249,0.75)]"
            />
          </div>

          <div className="space-y-24 md:space-y-36">
            {STEPS.map((step, index) => {
              const Icon = step.icon

              return (
                <article
                  key={step.n}
                  className={`process-step group relative w-full max-w-[760px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_35px_120px_rgba(0,0,0,0.38)] backdrop-blur-2xl md:rounded-[2.4rem] md:p-9 ${getStepPosition(
                    index
                  )}`}
                >
                  <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.18),transparent_30%),radial-gradient(circle_at_90%_100%,rgba(217,70,239,0.14),transparent_34%)]" />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-12 flex items-start justify-between gap-8 md:mb-14">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-cyan-100/50">
                          {step.label}
                        </p>
                        <p className="mt-4 font-mono text-xs tracking-[0.38em] text-white/28">
                          / {step.n}
                        </p>
                      </div>

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] transition duration-500 group-hover:scale-110 group-hover:text-cyan-100">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <h3 className="max-w-3xl text-[clamp(2rem,4.2vw,4.35rem)] font-black uppercase leading-[0.84] tracking-[-0.085em]">
                      {step.title}
                    </h3>

                    <div className="mt-8 grid gap-6 border-t border-white/10 pt-7 md:grid-cols-[1fr_0.75fr] md:items-end">
                      <p className="max-w-2xl text-sm leading-7 text-white/58 md:text-base md:leading-8">
                        {step.text}
                      </p>

                      <div className="rounded-3xl border border-white/10 bg-black/20 p-5 backdrop-blur-xl">
                        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
                          Output
                        </p>
                        <p className="mt-3 text-sm leading-6 text-white/62">
                          {step.side}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/30">
                        Cirotti Studio System
                      </span>

                      <ArrowUpRight className="h-4 w-4 text-cyan-100/55 transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
})

Process.displayName = "Process"

export default Process