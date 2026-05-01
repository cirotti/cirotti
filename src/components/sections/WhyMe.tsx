import { memo, useLayoutEffect, useMemo, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Sparkles,
  ShieldCheck,
  Eye,
  Gem,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

type Item = {
  icon: LucideIcon
  number: string
  kicker: string
  title: string
  text: string
}

const ITEMS: Item[] = [
  {
    icon: Sparkles,
    number: "01",
    kicker: "Originalidad",
    title: "No pareces uno más",
    text: "No uso templates ni diseños reciclados. Construyo una presencia visual propia para que tu marca tenga carácter, diferencia y memoria.",
  },
  {
    icon: Eye,
    number: "02",
    kicker: "Percepción",
    title: "Te ven más caro",
    text: "Una web premium cambia la forma en que te juzgan en segundos: más confianza, más autoridad y más valor antes de hablar contigo.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    kicker: "Sistema",
    title: "Diseño y código juntos",
    text: "No separo estética de experiencia. Cada sección, interacción y línea de código trabajan como una sola pieza de venta.",
  },
  {
    icon: Gem,
    number: "04",
    kicker: "Detalle",
    title: "Nada se siente improvisado",
    text: "Motion, responsive, ritmo, copy, jerarquía y microinteracciones: todo suma para que tu sitio se sienta hecho por alguien obsesivo.",
  },
]

const WhyMe = memo(() => {
  const rootRef = useRef<HTMLElement>(null)
  const haloRef = useRef<HTMLDivElement>(null)

  const particles = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        left: `${(i * 31) % 100}%`,
        top: `${(i * 57) % 100}%`,
        size: 2 + (i % 3),
        opacity: 0.1 + (i % 5) * 0.045,
      })),
    []
  )

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const cards = gsap.utils.toArray<HTMLElement>(".why-card")

if (reduce) {
  gsap.set(".why-word, .why-reveal, .why-card, .why-center", {
    opacity: 1,
    y: 0,
    x: 0,
    rotate: 0,
    scale: 1,
    filter: "blur(0px)",
  })
  return
}

gsap.set(".why-word", { yPercent: 120, rotateX: -35 })
gsap.set(".why-reveal", { opacity: 0, y: 28, filter: "blur(14px)" })
gsap.set(".why-center", {
  opacity: 0,
  y: 70,
  scale: 0.96,
  filter: "blur(18px)",
})

cards.forEach((card, index) => {
  const direction = index % 2 === 0 ? -1 : 1

  gsap.set(card, {
    opacity: 0,
    x: direction * 72,
    y: 46,
    rotate: direction * 1.5,
    scale: 0.975,
    filter: "blur(10px)",
  })
})

const intro = gsap.timeline({
  scrollTrigger: {
    trigger: root,
    start: "top 72%",
    once: true,
  },
})

intro
  .to(".why-word", {
    yPercent: 0,
    rotateX: 0,
    duration: 1.15,
    stagger: 0.06,
    ease: "power4.out",
  })
  .to(
    ".why-reveal",
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.9,
      stagger: 0.08,
      ease: "power3.out",
    },
    "-=0.7"
  )
  .to(
    ".why-center",
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1,
      ease: "power4.out",
    },
    "-=0.5"
  )
  .to(
    cards,
    {
      opacity: 1,
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.72,
      stagger: 0.08,
      ease: "power3.out",
    },
    "-=0.35"
  )

gsap.to(".why-dot", {
  x: "random(-26,26)",
  y: "random(-34,34)",
  opacity: "random(0.12,0.45)",
  duration: "random(2.8,5.5)",
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  stagger: 0.04,
})

gsap.to(".why-ring", {
  rotate: 360,
  ease: "none",
  scrollTrigger: {
    trigger: root,
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  },
})

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
        cx += (tx - cx) * 0.08
        cy += (ty - cy) * 0.08

        gsap.set(haloRef.current, { x: cx, y: cy })
        raf = requestAnimationFrame(loop)
      }

      root.addEventListener("mousemove", move)
      raf = requestAnimationFrame(loop)

      return () => {
        root.removeEventListener("mousemove", move)
        cancelAnimationFrame(raf)
      }
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id="why-me"
      className="relative isolate overflow-hidden bg-[#030511] px-5 py-28 text-white sm:px-6 md:py-36 lg:px-10 xl:px-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_85%_22%,rgba(99,102,241,0.16),transparent_28%),radial-gradient(circle_at_50%_92%,rgba(217,70,239,0.14),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.032)_1px,transparent_1px)] bg-[size:76px_76px] opacity-[0.11]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(3,5,17,0.91)_78%)]" />

        {particles.map((p) => (
          <span
            key={p.id}
            className="why-dot absolute rounded-full bg-cyan-100 shadow-[0_0_22px_rgba(103,232,249,0.8)]"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      <div
        ref={haloRef}
        className="pointer-events-none absolute left-0 top-0 hidden h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-300/10 blur-[90px] lg:block"
      />

      <div className="mx-auto max-w-[1540px]">
        <div className="mx-auto mb-20 max-w-6xl text-center md:mb-28">
          <div className="why-reveal mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
            <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-cyan-100/60">
              Why Cirotti
            </span>
          </div>

          <h2 className="text-[clamp(3.1rem,9vw,9.8rem)] font-black uppercase leading-[0.76] tracking-[-0.105em]">
            {["No vendo", "páginas.", "vendo", "percepción."].map((word, index) => (
              <span key={word} className="block overflow-hidden pb-2">
                <span
                  className={
                    index === 3
                      ? "why-word block origin-bottom bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-transparent"
                      : "why-word block origin-bottom"
                  }
                >
                  {word}
                </span>
              </span>
            ))}
          </h2>

          <p className="why-reveal mx-auto mt-8 max-w-2xl text-base leading-8 text-white/58 md:text-lg">
            Tu web puede ser un link más en Instagram… o puede ser la primera prueba
            de que trabajas en serio, cobras bien y vales lo que pides.
          </p>
        </div>

        <div className="relative mx-auto grid max-w-[1280px] gap-5 lg:grid-cols-[0.75fr_1.35fr_0.75fr] lg:items-center lg:gap-6">
          <div className="hidden lg:block">
            <WhyCard item={ITEMS[0]} className="why-card mb-6" />
            <WhyCard item={ITEMS[2]} className="why-card" />
          </div>

          <div className="why-center relative order-first overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.055] p-7 shadow-[0_40px_140px_rgba(0,0,0,0.42)] backdrop-blur-2xl lg:order-none lg:min-h-[650px] lg:p-10">
            <div className="why-ring pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/10">
              <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_35px_rgba(103,232,249,1)]" />
              <span className="absolute bottom-14 left-10 h-2 w-2 rounded-full bg-fuchsia-300 shadow-[0_0_30px_rgba(217,70,239,0.95)]" />
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_50%_100%,rgba(217,70,239,0.14),transparent_34%)]" />

            <div className="relative z-10 flex min-h-[520px] flex-col justify-between lg:min-h-[570px]">
              <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-cyan-100/55">
                  Premium System
                </p>
                <ArrowUpRight className="h-4 w-4 text-cyan-100/60" />
              </div>

              <div>
                <p className="mb-6 max-w-sm font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
                  El cliente no compra “una web”. Compra confianza, claridad y la sensación
                  de estar frente a una marca seria.
                </p>

<h3 className="max-w-[12ch] text-[clamp(2.55rem,4.45vw,5.15rem)] font-black uppercase leading-[0.84] tracking-[-0.07em]">
  <span className="block">La primera</span>
  <span className="block">impresión</span>
  <span className="block bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-transparent">
    también vende.
  </span>
</h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {["Confianza", "Autoridad", "Deseo"].map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-white/10 bg-black/20 p-4 backdrop-blur-xl"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/36">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <WhyCard item={ITEMS[1]} className="why-card mb-6" />
            <WhyCard item={ITEMS[3]} className="why-card" />
          </div>

          <div className="mt-6 grid gap-4 lg:hidden">
            {ITEMS.map((item) => (
              <WhyCard key={item.number} item={item} className="why-card" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
})

type WhyCardProps = {
  item: Item
  className?: string
}

const WhyCard = ({ item, className = "" }: WhyCardProps) => {
  const Icon = item.icon

  return (
    <article
      className={`group relative overflow-hidden lg:overflow-visible rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:p-7 ${className}`}
    >
      <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_90%_100%,rgba(217,70,239,0.14),transparent_36%)]" />
      </div>

      <div className="relative z-10">
        <div className="mb-10 flex items-start justify-between gap-5">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-100/45">
              {item.kicker}
            </p>
            <p className="mt-3 font-mono text-xs tracking-[0.34em] text-white/25">
              / {item.number}
            </p>
          </div>

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/70 transition duration-500 group-hover:scale-110 group-hover:text-cyan-100">
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <h3 className="text-[clamp(1.7rem,3vw,2.65rem)] font-black uppercase leading-[0.88] tracking-[-0.075em]">
          {item.title}
        </h3>

        <p className="mt-5 text-sm leading-7 text-white/58">{item.text}</p>
      </div>
    </article>
  )
}

WhyMe.displayName = "WhyMe"

export default WhyMe