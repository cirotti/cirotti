import { memo, useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as THREE from "three"
import {
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  Copy,
  Cpu,
  Globe2,
  Mail,
  MousePointer2,
  Radio,
  Rocket,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wand2,
  Zap,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const email = "cirottidev@gmail.com"

const socials = [
  { label: "Github", url: "https://github.com/cir0tti" },
  { label: "Twitter", url: "https://x.com/cirotti" },
]

const Contact = memo(() => {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 8)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const group = new THREE.Group()
    scene.add(group)

    const portalGeometry = new THREE.TorusGeometry(1.75, 0.025, 32, 220)
    const portalMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#a5f3fc"),
      transparent: true,
      opacity: 0.9,
    })

    const portal = new THREE.Mesh(portalGeometry, portalMaterial)
    group.add(portal)

    const innerPortal = new THREE.Mesh(
      new THREE.TorusGeometry(1.18, 0.012, 32, 180),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#f0abfc"),
        transparent: true,
        opacity: 0.65,
      })
    )
    group.add(innerPortal)

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.45, 3),
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        roughness: 0.18,
        metalness: 0.9,
        emissive: "#6366f1",
        emissiveIntensity: 0.55,
      })
    )
    group.add(core)

    const particlesGeometry = new THREE.BufferGeometry()
    const count = 1400
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorA = new THREE.Color("#818cf8")
    const colorB = new THREE.Color("#f0abfc")
    const colorC = new THREE.Color("#a5f3fc")

    for (let i = 0; i < count; i++) {
      const radius = 2.2 + Math.random() * 4.8
      const angle = Math.random() * Math.PI * 2
      const y = (Math.random() - 0.5) * 5

      positions[i * 3] = Math.cos(angle) * radius
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = Math.sin(angle) * radius

      const mixed = Math.random()
      const c =
        mixed < 0.33 ? colorA : mixed < 0.66 ? colorB : colorC

      colors[i * 3] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    )

    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    )

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.022,
      transparent: true,
      opacity: 0.95,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    const lightA = new THREE.PointLight("#818cf8", 4, 12)
    lightA.position.set(3, 3, 4)
    scene.add(lightA)

    const lightB = new THREE.PointLight("#f0abfc", 3, 12)
    lightB.position.set(-3, -2, 4)
    scene.add(lightB)

    const ambient = new THREE.AmbientLight("#ffffff", 0.45)
    scene.add(ambient)

    const mouse = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }

    const handleMouse = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouse.y = -(((e.clientY - rect.top) / rect.height - 0.5) * 2)
    }

    section.addEventListener("mousemove", handleMouse)

    const resize = () => {
      const width = section.clientWidth
      const height = section.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }

    resize()
    window.addEventListener("resize", resize)

    let frame = 0
    let raf = 0

    const animate = () => {
      frame += 0.01

      target.x += (mouse.x - target.x) * 0.045
      target.y += (mouse.y - target.y) * 0.045

      group.rotation.y = target.x * 0.38
      group.rotation.x = -target.y * 0.22

      portal.rotation.z += 0.004
      innerPortal.rotation.z -= 0.006
      core.rotation.x += 0.008
      core.rotation.y += 0.011

      core.scale.setScalar(1 + Math.sin(frame * 2.2) * 0.045)

      particles.rotation.y += 0.0009
      particles.rotation.x = target.y * 0.08

      camera.position.x += (target.x * 0.7 - camera.position.x) * 0.035
      camera.position.y += (target.y * 0.45 - camera.position.y) * 0.035
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }

    animate()

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 90,
        opacity: 0,
        filter: "blur(18px)",
        duration: 1.25,
        ease: "power4.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 82%",
        },
      })

      gsap.from(cardRef.current, {
        y: 90,
        opacity: 0,
        scale: 0.94,
        rotateX: -12,
        filter: "blur(18px)",
        duration: 1.25,
        ease: "power4.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 86%",
        },
      })

      gsap.to(group.position, {
        y: -0.75,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(group.rotation, {
        z: 0.35,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }, section)

    return () => {
      ctx.revert()
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      section.removeEventListener("mousemove", handleMouse)

      portalGeometry.dispose()
      portalMaterial.dispose()
      innerPortal.geometry.dispose()
      ;(innerPortal.material as THREE.Material).dispose()
      core.geometry.dispose()
      ;(core.material as THREE.Material).dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
      renderer.dispose()
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1700)
    } catch {}
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative isolate min-h-screen overflow-hidden px-4 py-24 text-white sm:px-6 md:px-10 md:py-32 lg:px-16 xl:px-24"
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(99,102,241,0.18),transparent_34%),radial-gradient(circle_at_80%_65%,rgba(217,70,239,0.18),transparent_30%),linear-gradient(180deg,rgba(3,5,20,0.38),rgba(0,0,0,0.96))]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:80px_80px] opacity-70 [mask-image:radial-gradient(circle_at_center,black_28%,transparent_78%)]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 shadow-[0_0_140px_rgba(129,140,248,0.25)] md:h-[48rem] md:w-[48rem]" />

      <div className="relative z-10 mx-auto grid max-w-[1480px] items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,480px)]">
        <div ref={titleRef}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.08] px-4 py-2.5 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(74,222,128,1)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-emerald-100/80">
              Disponible para proyectos premium
            </span>
          </div>

          <h2 className="max-w-[980px] text-[clamp(3.2rem,8vw,8.8rem)] font-semibold leading-[0.82] tracking-[-0.085em]">
            Tu marca no necesita otra web.
            <span className="mt-2 block bg-gradient-to-r from-white via-cyan-100 to-fuchsia-200 bg-clip-text text-transparent">
              Necesita una experiencia.
            </span>
          </h2>

          <p className="mt-8 max-w-[720px] text-base leading-8 text-white/62 md:text-lg">
            Diseño y desarrollo sitios, apps, bots y sistemas con presencia
            cinematográfica, lógica real, movimiento premium y una experiencia
            que se siente viva en desktop y mobile.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            {[
              [Rocket, "Launch premium"],
              [Wand2, "Motion cinematográfico"],
              [ShieldCheck, "Responsive real"],
              [Zap, "Impacto visual"],
            ].map(([Icon, label]) => {
              const LucideIcon = Icon as typeof Rocket
              return (
                <div
                  key={label as string}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white/80 backdrop-blur-xl"
                >
                  <LucideIcon className="h-4 w-4 text-white/70" />
                  {label as string}
                </div>
              )
            })}
          </div>
        </div>

        <div
          ref={cardRef}
          className="relative overflow-hidden rounded-[38px] border border-white/15 bg-white/[0.075] p-5 shadow-[0_50px_190px_rgba(0,0,0,0.72)] backdrop-blur-2xl md:p-6"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),transparent_26%,transparent_62%,rgba(255,255,255,0.08))]" />
          <div className="pointer-events-none absolute -left-24 top-10 h-52 w-52 rounded-full bg-indigo-500/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-8 h-52 w-52 rounded-full bg-fuchsia-500/25 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/40">
                  Project portal
                </div>

                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/[0.08] px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-cyan-100/80">
                  <Radio className="h-3.5 w-3.5" />
                  conexión abierta
                </div>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/80">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-black/35 p-4">
              <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/36">
                <Terminal className="h-3.5 w-3.5" />
                Build sequence
              </div>

              <div className="space-y-2 font-mono text-xs text-white/58">
                <p><span className="text-emerald-300">●</span> Analizando identidad...</p>
                <p><span className="text-cyan-300">●</span> Diseñando experiencia...</p>
                <p><span className="text-fuchsia-300">●</span> Activando motion premium...</p>
                <p><span className="text-white">●</span> Preparando lanzamiento...</p>
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="group relative mt-5 block w-full overflow-hidden rounded-[30px] border border-white/12 bg-[linear-gradient(180deg,rgba(9,12,30,0.92),rgba(3,5,16,0.98))] px-5 py-5 text-left sm:px-6 sm:py-6"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_0%_50%,rgba(99,102,241,0.24),transparent_32%),radial-gradient(circle_at_100%_50%,rgba(217,70,239,0.24),transparent_32%)]" />

              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.34em] text-white/38">
                    <Mail className="h-3.5 w-3.5" />
                    Contacto directo
                  </div>

                  <div className="break-all text-[1.05rem] font-semibold leading-tight text-white sm:text-[1.2rem] md:text-[1.55rem]">
                    {copied ? "Correo copiado ✓" : email}
                  </div>

                  <div className="mt-2 text-xs text-white/45 sm:text-sm">
                    Presiona para copiar y empezar algo brutal
                  </div>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/80 transition group-hover:scale-110">
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </div>
              </div>
            </button>

            <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-[22px] border border-white/10 bg-white/[0.04] px-4 py-4 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.075]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white/86">
                      {social.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/40 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-5 rounded-[24px] border border-white/10 bg-black/25 px-4 py-4">
              <p className="text-sm leading-6 text-white/58">
                No plantillas. No genérico. Solo experiencias digitales hechas
                para verse caras, sentirse fluidas y dejar una impresión real.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
})

Contact.displayName = "Contact"

export default Contact