import { useEffect, useMemo, useRef, useState } from "react"
import gsap from "gsap"

interface PreloaderProps {
  onComplete: () => void
}

const FINAL_WORD = "CIROTTI"
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&<>[]{}"
const STATUS = [
  "BOOTING CREATIVE CORE",
  "SYNCING MOTION SYSTEM",
  "LOADING VISUAL IDENTITY",
  "BUILDING DIGITAL EXPERIENCE",
  "LAUNCHING PORTFOLIO",
]

const Preloader = ({ onComplete }: PreloaderProps) => {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const flashRef = useRef<HTMLDivElement>(null)
  const topPanelRef = useRef<HTMLDivElement>(null)
  const bottomPanelRef = useRef<HTMLDivElement>(null)

  const coreRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const progressWrapRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const scanRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const chipsRef = useRef<HTMLDivElement>(null)

  const [count, setCount] = useState(0)
  const [status, setStatus] = useState(0)

  const stars = useMemo(
    () =>
      Array.from({ length: 140 }, () => ({
        x: Math.random(),
        y: Math.random(),
        z: Math.random() * 0.8 + 0.2,
        s: Math.random() * 1.8 + 0.4,
        a: Math.random() * 0.7 + 0.25,
      })),
    []
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    let raf = 0
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      w = canvas.width = window.innerWidth * dpr
      h = canvas.height = window.innerHeight * dpr
      canvas.style.width = "100%"
      canvas.style.height = "100%"
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      stars.forEach((star) => {
        star.y += 0.00035 * star.z
        if (star.y > 1) star.y = 0

        ctx.globalAlpha = star.a
        ctx.fillStyle = "#ffffff"
        ctx.shadowColor = star.z > 0.7 ? "#67e8f9" : "#e879f9"
        ctx.shadowBlur = 18

        ctx.beginPath()
        ctx.arc(star.x * w, star.y * h, star.s * star.z, 0, Math.PI * 2)
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener("resize", resize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [stars])

  useEffect(() => {
    const ctx = gsap.context(() => {
      let scramble = 0
      let completed = false

      gsap.set(topPanelRef.current, { yPercent: 0 })
      gsap.set(bottomPanelRef.current, { yPercent: 0 })
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" })

      gsap.set(
        [
          coreRef.current,
          ringRef.current,
          titleRef.current,
          badgeRef.current,
          statusRef.current,
          progressWrapRef.current,
          counterRef.current,
          chipsRef.current,
        ],
        {
          opacity: 0,
          y: 28,
          filter: "blur(14px)",
        }
      )

      gsap.set(coreRef.current, { scale: 0.62, rotate: -18 })
      gsap.set(ringRef.current, { scale: 0.82 })
      gsap.set(flashRef.current, { opacity: 0 })

      const intro = gsap.timeline()

      intro
        .to(coreRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "expo.out",
        })
        .to(
          ringRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "expo.out",
          },
          "-=0.85"
        )
        .to(
          badgeRef.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.55"
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power4.out",
          },
          "-=0.45"
        )
        .to(
          [statusRef.current, progressWrapRef.current, counterRef.current, chipsRef.current],
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7,
            stagger: 0.07,
            ease: "power3.out",
          },
          "-=0.45"
        )

      gsap.to(ringRef.current, {
        rotate: 360,
        duration: 16,
        repeat: -1,
        ease: "none",
      })

      gsap.to(coreRef.current, {
        scale: 1.08,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      gsap.to(scanRef.current, {
        xPercent: 250,
        duration: 1.2,
        repeat: -1,
        ease: "none",
      })

      const scrambleTimer = setInterval(() => {
        if (!titleRef.current) return

        titleRef.current.innerText = FINAL_WORD.split("")
          .map((char, i) => (i < scramble ? char : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join("")

        scramble += 0.34

        if (scramble >= FINAL_WORD.length) {
          clearInterval(scrambleTimer)
          titleRef.current.innerText = FINAL_WORD
        }
      }, 26)

      const statusTimer = setInterval(() => {
        setStatus((prev) => (prev + 1) % STATUS.length)
      }, 560)

      const proxy = { value: 0 }

      gsap
        .timeline({
          delay: 0.15,
          onComplete: () => {
            if (completed) return
            completed = true

            clearInterval(scrambleTimer)
            clearInterval(statusTimer)

            const exit = gsap.timeline({
              onComplete: () => {
                onComplete()
              },
            })

            exit
              .to(coreRef.current, {
                scale: 1.9,
                opacity: 1,
                duration: 0.42,
                ease: "power3.out",
              })
              .to(
                flashRef.current,
                {
                  opacity: 1,
                  duration: 0.13,
                  ease: "power2.out",
                },
                "-=0.18"
              )
              .to(flashRef.current, {
                opacity: 0,
                duration: 0.22,
                ease: "power2.inOut",
              })
              .to(
                [
                  badgeRef.current,
                  titleRef.current,
                  statusRef.current,
                  progressWrapRef.current,
                  counterRef.current,
                  chipsRef.current,
                  ringRef.current,
                  coreRef.current,
                ],
                {
                  opacity: 0,
                  y: -34,
                  scale: 0.98,
                  filter: "blur(18px)",
                  duration: 0.44,
                  stagger: 0.035,
                  ease: "power4.in",
                },
                "-=0.1"
              )
              .to(
                topPanelRef.current,
                {
                  yPercent: -100,
                  duration: 0.95,
                  ease: "expo.inOut",
                },
                "-=0.02"
              )
              .to(
                bottomPanelRef.current,
                {
                  yPercent: 100,
                  duration: 0.95,
                  ease: "expo.inOut",
                },
                "<"
              )
              .to(rootRef.current, {
                opacity: 0,
                pointerEvents: "none",
                duration: 0.22,
              })
          },
        })
        .to(proxy, {
          value: 100,
          duration: 3.4,
          ease: "power2.inOut",
          onUpdate: () => setCount(Math.floor(proxy.value)),
        })
        .to(
          progressRef.current,
          {
            scaleX: 1,
            duration: 3.4,
            ease: "power2.inOut",
          },
          0
        )

      return () => {
        clearInterval(scrambleTimer)
        clearInterval(statusTimer)
      }
    }, rootRef)

    return () => ctx.revert()
  }, [onComplete])

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#030511] text-white"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-[1]" />

      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_42%,rgba(99,102,241,0.35),transparent_38%),radial-gradient(circle_at_22%_24%,rgba(34,211,238,0.18),transparent_26%),radial-gradient(circle_at_82%_30%,rgba(217,70,239,0.18),transparent_28%),linear-gradient(180deg,#030511_0%,#02030b_100%)]" />

      <div
        ref={topPanelRef}
        className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-1/2 bg-[#030511]"
      />
      <div
        ref={bottomPanelRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-1/2 bg-[#030511]"
      />

      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 z-[60] bg-white opacity-0"
      />

      <div className="relative z-20 flex min-h-screen items-center justify-center px-6 text-center">
        <div className="flex w-full max-w-4xl flex-col items-center">
          <div className="relative mb-10 flex h-[210px] w-[210px] items-center justify-center sm:h-[260px] sm:w-[260px]">
            <div
              ref={ringRef}
              className="absolute inset-0 rounded-full border border-white/10"
            >
              <div className="absolute inset-4 rounded-full border border-dashed border-cyan-200/20" />
              <div className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-200 shadow-[0_0_30px_rgba(165,243,252,0.95)]" />
              <div className="absolute bottom-8 right-8 h-2.5 w-2.5 rounded-full bg-fuchsia-300 shadow-[0_0_30px_rgba(240,171,252,0.95)]" />
            </div>

            <div
              ref={coreRef}
              className="relative flex h-[96px] w-[96px] items-center justify-center rounded-full border border-white/15 bg-white/[0.08] shadow-[0_0_120px_rgba(103,232,249,0.22)] backdrop-blur-2xl sm:h-[116px] sm:w-[116px]"
            >
              <div className="absolute inset-[-90px] rounded-full bg-gradient-to-r from-cyan-400/20 via-indigo-500/20 to-fuchsia-500/20 blur-[80px]" />
              <div className="absolute inset-[14px] rounded-full border border-white/10" />
              <div className="relative h-5 w-5 rounded-full bg-white shadow-[0_0_42px_rgba(255,255,255,0.95)]" />
            </div>
          </div>

          <div
            ref={badgeRef}
            className="mb-4 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 backdrop-blur-xl"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-white/55">
              cinematic portfolio boot
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-[clamp(3.4rem,10vw,9rem)] font-black uppercase leading-none tracking-[-0.12em]"
          >
            CIROTTI
          </h1>

          <div
            ref={statusRef}
            className="mt-5 font-mono text-[11px] uppercase tracking-[0.34em] text-cyan-100/50 sm:text-xs"
          >
            {STATUS[status]}
          </div>

          <div className="mt-9 flex w-full max-w-xl items-center gap-4">
            <div
              ref={progressWrapRef}
              className="relative h-[10px] flex-1 overflow-hidden rounded-full border border-white/10 bg-white/[0.055]"
            >
              <div
                ref={progressRef}
                className="absolute inset-y-0 left-0 w-full rounded-full bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 shadow-[0_0_40px_rgba(103,232,249,0.35)]"
              >
                <div
                  ref={scanRef}
                  className="absolute inset-y-0 left-[-40%] w-[40%] skew-x-[-20deg] bg-white/60 blur-[8px]"
                />
              </div>
            </div>

            <span
              ref={counterRef}
              className="min-w-[58px] text-right font-mono text-sm tracking-[0.2em] text-white/70"
            >
              {String(count).padStart(2, "0")}%
            </span>
          </div>

          <div
            ref={chipsRef}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            {["Creative code", "Motion system", "Premium launch"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-white/38"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Preloader