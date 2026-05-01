import { memo, useEffect, useRef } from "react"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import * as THREE from "three"
import {
  ArrowRight,
  Bot,
  Code2,
  Cpu,
  Globe2,
  Sparkles,
  Star,
  Zap,
} from "lucide-react"
import GlitchText from "../GlitchText"
import MagneticButton from "../MagneticButton"

gsap.registerPlugin(ScrollTrigger)

interface HeroProps {
  isLoaded?: boolean
}

const splitText = (text: string) =>
  text.split("").map((char, i) => (
    <span key={`${char}-${i}`} className="char inline-block will-change-transform">
      {char === " " ? "\u00A0" : char}
    </span>
  ))

const Hero = memo(({ isLoaded = true }: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lightRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const burstRef = useRef<HTMLDivElement>(null)

  const labelRef = useRef<HTMLDivElement>(null)
  const title1Ref = useRef<HTMLDivElement>(null)
  const title2Ref = useRef<HTMLDivElement>(null)
  const title3Ref = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const trustRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isLoaded) return

    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 120)
    camera.position.set(0, 0, 9)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    })

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.22

    const world = new THREE.Group()
    scene.add(world)

    const system = new THREE.Group()
    world.add(system)

    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      roughness: 0.08,
      metalness: 0.9,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      emissive: "#6366f1",
      emissiveIntensity: 1.15,
    })

    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.7, 7), coreMaterial)
    system.add(core)

    const coreWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.96, 2),
      new THREE.MeshBasicMaterial({
        color: "#a5f3fc",
        wireframe: true,
        transparent: true,
        opacity: 0.14,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )
    system.add(coreWire)

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(3.2, 64, 64),
      new THREE.MeshBasicMaterial({
        color: "#818cf8",
        transparent: true,
        opacity: 0.035,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    )
    system.add(halo)

    const rings: THREE.Mesh[] = []
    const ringData = [
      [1.35, 0.016, "#a5f3fc", 0.9, 0.2, 0.1],
      [1.82, 0.011, "#f0abfc", 0.58, 1.25, 0.45],
      [2.35, 0.008, "#818cf8", 0.46, 0.45, 1.25],
      [2.92, 0.006, "#ffffff", 0.2, 1.55, 0.95],
      [3.35, 0.004, "#a5f3fc", 0.14, 1.95, 1.5],
    ] as const

    ringData.forEach(([radius, tube, color, opacity, rx, ry]) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, tube, 24, 320),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      )

      ring.rotation.x = rx
      ring.rotation.y = ry
      system.add(ring)
      rings.push(ring)
    })

    const nodeGroup = new THREE.Group()
    system.add(nodeGroup)

    const nodeItems = [
      { color: "#a5f3fc", radius: 1.7, size: 0.13 },
      { color: "#f0abfc", radius: 2.15, size: 0.15 },
      { color: "#818cf8", radius: 2.55, size: 0.12 },
      { color: "#ffffff", radius: 3.0, size: 0.14 },
      { color: "#67e8f9", radius: 3.35, size: 0.1 },
    ]

    const nodes: THREE.Mesh[] = []

    nodeItems.forEach((item, i) => {
      const node = new THREE.Mesh(
        new THREE.OctahedronGeometry(item.size, 2),
        new THREE.MeshBasicMaterial({
          color: item.color,
          transparent: true,
          opacity: 0.96,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      )

      node.userData = {
        angle: (i / nodeItems.length) * Math.PI * 2,
        radius: item.radius,
        speed: 0.008 + i * 0.0015,
        y: (i - 2) * 0.22,
      }

      nodeGroup.add(node)
      nodes.push(node)
    })

    const linesMaterial = new THREE.LineBasicMaterial({
      color: "#a5f3fc",
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const lineMeshes: THREE.Line[] = []

    nodes.forEach(() => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
      ])

      const line = new THREE.Line(geo, linesMaterial)
      nodeGroup.add(line)
      lineMeshes.push(line)
    })

    const spiralGeometry = new THREE.BufferGeometry()
    const spiralCount = 2600
    const spiralPositions = new Float32Array(spiralCount * 3)
    const spiralColors = new Float32Array(spiralCount * 3)

    const colorA = new THREE.Color("#818cf8")
    const colorB = new THREE.Color("#f0abfc")
    const colorC = new THREE.Color("#a5f3fc")

    for (let i = 0; i < spiralCount; i++) {
      const t = i / spiralCount
      const angle = t * Math.PI * 22
      const radius = 0.45 + t * 5.2
      const wave = Math.sin(t * Math.PI * 10) * 0.38

      spiralPositions[i * 3] = Math.cos(angle) * radius
      spiralPositions[i * 3 + 1] = (t - 0.5) * 5.5 + wave
      spiralPositions[i * 3 + 2] = Math.sin(angle) * radius

      const c = t < 0.33 ? colorA : t < 0.66 ? colorC : colorB
      spiralColors[i * 3] = c.r
      spiralColors[i * 3 + 1] = c.g
      spiralColors[i * 3 + 2] = c.b
    }

    spiralGeometry.setAttribute("position", new THREE.BufferAttribute(spiralPositions, 3))
    spiralGeometry.setAttribute("color", new THREE.BufferAttribute(spiralColors, 3))

    const spiralMaterial = new THREE.PointsMaterial({
      size: 0.024,
      transparent: true,
      opacity: 0.92,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const spiral = new THREE.Points(spiralGeometry, spiralMaterial)
    world.add(spiral)

    const dustGeometry = new THREE.BufferGeometry()
    const dustCount = 1300
    const dustPositions = new Float32Array(dustCount * 3)

    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 13
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 8
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 9
    }

    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3))

    const dustMaterial = new THREE.PointsMaterial({
      size: 0.012,
      color: "#ffffff",
      transparent: true,
      opacity: 0.34,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    const dust = new THREE.Points(dustGeometry, dustMaterial)
    scene.add(dust)

    scene.add(new THREE.AmbientLight("#ffffff", 0.6))

    const lightA = new THREE.PointLight("#818cf8", 5.5, 15)
    lightA.position.set(3, 4, 5)
    scene.add(lightA)

    const lightB = new THREE.PointLight("#f0abfc", 4.4, 15)
    lightB.position.set(-4, -2, 4)
    scene.add(lightB)

    const lightC = new THREE.PointLight("#a5f3fc", 3.8, 14)
    lightC.position.set(0, 2.5, 5)
    scene.add(lightC)

    const mouse = { x: 0, y: 0 }
    const smooth = { x: 0, y: 0 }
    let boost = 0
    let raf = 0
    let time = 0

    const handleMouse = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouse.y = -(((e.clientY - rect.top) / rect.height - 0.5) * 2)
    }

    const clickBurst = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      boost = 1

      if (burstRef.current) {
        gsap.set(burstRef.current, {
          x: x - section.clientWidth / 2,
          y: y - section.clientHeight / 2,
          scale: 0.2,
          opacity: 1,
          borderColor: "rgba(165,243,252,0.95)",
          boxShadow: "0 0 90px rgba(165,243,252,0.85)",
        })

        gsap.to(burstRef.current, {
          scale: 18,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        })
      }

      gsap.to(coreMaterial, {
        emissiveIntensity: 3.4,
        duration: 0.18,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      })

      gsap.to(spiralMaterial, {
        size: 0.056,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      })

      gsap.to(spiral.scale, {
        x: 1.24,
        y: 1.24,
        z: 1.24,
        duration: 0.24,
        ease: "power3.out",
        yoyo: true,
        repeat: 1,
      })

      nodes.forEach((node) => {
        gsap.to(node.scale, {
          x: 2.25,
          y: 2.25,
          z: 2.25,
          duration: 0.22,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        })
      })

      gsap.to(contentRef.current, {
        x: mouse.x * -18,
        y: mouse.y * 12,
        duration: 0.24,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      })
    }

    section.addEventListener("mousemove", handleMouse)
    section.addEventListener("click", clickBurst)

    const resize = () => {
      const w = section.clientWidth
      const h = section.clientHeight
      const mobile = w < 768
      const tablet = w < 1024

      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)

      world.position.set(mobile ? 0 : tablet ? 0.9 : 1.7, mobile ? -1.95 : 0.15, 0)
      world.scale.setScalar(mobile ? 0.63 : tablet ? 0.82 : 1)
    }

    resize()
    window.addEventListener("resize", resize)

    const animate = () => {
      time += 0.01
      boost *= 0.94

      smooth.x += (mouse.x - smooth.x) * 0.045
      smooth.y += (mouse.y - smooth.y) * 0.045

      system.rotation.y = smooth.x * (0.42 + boost * 0.9)
      system.rotation.x = -smooth.y * (0.22 + boost * 0.45)
      system.position.x = smooth.x * (0.18 + boost * 0.35)
      system.position.y = smooth.y * (0.14 + boost * 0.28)

      core.rotation.x += 0.006 + boost * 0.03
      core.rotation.y += 0.012 + boost * 0.04
      core.scale.setScalar(1 + Math.sin(time * 2.8) * 0.05 + boost * 0.22)

      coreWire.rotation.x -= 0.004
      coreWire.rotation.y += 0.007

      halo.scale.setScalar(1 + Math.sin(time * 1.6) * 0.05 + boost * 0.2)

      rings.forEach((ring, i) => {
        ring.rotation.z += i % 2 === 0 ? 0.004 + i * 0.001 + boost * 0.015 : -0.004 - i * 0.001 - boost * 0.015
      })

      nodes.forEach((node, i) => {
        node.userData.angle += node.userData.speed + boost * 0.012

        const chaos = 1 + boost * 0.42

        node.position.x = Math.cos(node.userData.angle) * node.userData.radius * chaos
        node.position.z = Math.sin(node.userData.angle) * node.userData.radius * chaos
        node.position.y = node.userData.y + Math.sin(time * 2 + node.userData.angle) * (0.24 + boost * 0.5)

        node.rotation.x += 0.015 + boost * 0.04
        node.rotation.y += 0.018 + boost * 0.04

        const positions = lineMeshes[i].geometry.attributes.position as THREE.BufferAttribute
        positions.setXYZ(0, 0, 0, 0)
        positions.setXYZ(1, node.position.x, node.position.y, node.position.z)
        positions.needsUpdate = true
      })

      nodeGroup.rotation.y -= 0.001 + boost * 0.01

      spiral.rotation.y += 0.0013 + boost * 0.01
      spiral.rotation.x = smooth.y * 0.08

      dust.rotation.y -= 0.00032 + boost * 0.002
      dust.rotation.x = smooth.y * 0.035

      camera.position.x += (smooth.x * (0.72 + boost * 0.8) - camera.position.x) * 0.04
      camera.position.y += (smooth.y * (0.45 + boost * 0.5) - camera.position.y) * 0.04
      camera.position.z += ((9 - boost * 1.2) - camera.position.z) * 0.035
      camera.lookAt(0.75, 0, 0)

      renderer.render(scene, camera)
      raf = requestAnimationFrame(animate)
    }

    animate()

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      tl.from(labelRef.current, { y: 24, opacity: 0, duration: 0.7, ease: "power4.out" })
        .from(title1Ref.current?.querySelectorAll(".char") || [], {
          yPercent: 130,
          opacity: 0,
          rotateX: -90,
          filter: "blur(10px)",
          transformOrigin: "0% 100%",
          stagger: 0.022,
          duration: 1,
          ease: "power4.out",
        }, "-=0.2")
        .from(title2Ref.current?.querySelectorAll(".char") || [], {
          yPercent: 130,
          opacity: 0,
          rotateX: -90,
          filter: "blur(10px)",
          transformOrigin: "0% 100%",
          stagger: 0.018,
          duration: 1,
          ease: "power4.out",
        }, "-=0.72")
        .from(title3Ref.current, {
          y: 55,
          opacity: 0,
          filter: "blur(14px)",
          duration: 0.9,
          ease: "power4.out",
        }, "-=0.6")
        .from(subtitleRef.current, {
          y: 28,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.55")
        .from(ctaRef.current?.children || [], {
          y: 24,
          opacity: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
        }, "-=0.45")
        .from(trustRef.current?.children || [], {
          y: 18,
          opacity: 0,
          stagger: 0.08,
          duration: 0.55,
          ease: "power2.out",
        }, "-=0.3")
        .from(panelRef.current, {
          y: 60,
          opacity: 0,
          scale: 0.94,
          rotateX: -10,
          filter: "blur(16px)",
          duration: 1.1,
          ease: "power4.out",
        }, "-=0.95")

      gsap.to(world.position, {
        y: "-=0.95",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(world.rotation, {
        z: 0.3,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      gsap.to(marqueeRef.current, {
        xPercent: -24,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1600",
          scrub: 1,
        },
      })

      gsap.to(gridRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, section)

    return () => {
      ctx.revert()
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      section.removeEventListener("mousemove", handleMouse)
      section.removeEventListener("click", clickBurst)

      core.geometry.dispose()
      coreMaterial.dispose()
      coreWire.geometry.dispose()
      ;(coreWire.material as THREE.Material).dispose()
      halo.geometry.dispose()
      ;(halo.material as THREE.Material).dispose()
      rings.forEach((ring) => {
        ring.geometry.dispose()
        ;(ring.material as THREE.Material).dispose()
      })
      nodes.forEach((node) => {
        node.geometry.dispose()
        ;(node.material as THREE.Material).dispose()
      })
      lineMeshes.forEach((line) => line.geometry.dispose())
      linesMaterial.dispose()
      spiralGeometry.dispose()
      spiralMaterial.dispose()
      dustGeometry.dispose()
      dustMaterial.dispose()
      renderer.dispose()
    }
  }, [isLoaded])

  useEffect(() => {
    const section = sectionRef.current
    const light = lightRef.current
    if (!section || !light) return

    const move = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      gsap.to(light, {
        x: e.clientX - rect.left - 220,
        y: e.clientY - rect.top - 220,
        duration: 0.7,
        ease: "power3.out",
      })
    }

    section.addEventListener("mousemove", move)
    return () => section.removeEventListener("mousemove", move)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden px-5 pb-20 pt-28 text-white sm:px-6 md:px-10 lg:px-16 xl:px-24"
    >
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 h-full w-full" />

      <div
        ref={burstRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-[3] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/0 opacity-0"
      />

      <div className="absolute inset-0 -z-20 bg-[#030511]" />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_60%_28%,rgba(99,102,241,0.25),transparent_34%),radial-gradient(circle_at_82%_58%,rgba(217,70,239,0.2),transparent_32%),radial-gradient(circle_at_32%_68%,rgba(34,211,238,0.12),transparent_30%),linear-gradient(180deg,rgba(3,5,18,0.04),rgba(0,0,0,0.86))]" />

      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.13]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "76px 76px",
          maskImage: "radial-gradient(circle at center, black 32%, transparent 82%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 32%, transparent 82%)",
        }}
      />

      <div
        ref={lightRef}
        className="pointer-events-none absolute left-0 top-0 z-[2] h-[440px] w-[440px] rounded-full bg-white/[0.07] blur-[120px]"
      />

      <div className="pointer-events-none absolute inset-x-0 top-[9%] z-[1] overflow-hidden">
        <div
          ref={marqueeRef}
          className="flex w-max gap-14 whitespace-nowrap text-[16vw] font-black uppercase leading-none tracking-[-0.08em] text-white/[0.035] md:text-[12vw]"
        >
          <span>Cirotti Experience</span>
          <span>Creative Systems</span>
          <span>Digital Impact</span>
          <span>Cirotti Experience</span>
        </div>
      </div>

      <div
        ref={contentRef}
        className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] max-w-[1500px] items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]"
      >
        <div className="relative max-w-4xl pt-8 lg:pt-0">
          <div
            ref={labelRef}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.28em] text-white/75 backdrop-blur-xl"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
            Diseño + código + experiencia
          </div>

          <h1 className="font-black uppercase leading-[0.82] tracking-[-0.075em] text-white">
            <div ref={title1Ref} className="block overflow-hidden text-[clamp(3rem,7vw,7.4rem)]">
              {splitText("No hago")}
            </div>

            <div ref={title2Ref} className="block overflow-hidden text-[clamp(3rem,7vw,7.4rem)]">
              {splitText("páginas.")}
            </div>

            <div ref={title3Ref} className="mt-2 block text-[clamp(2.8rem,6.4vw,6.8rem)]">
              <GlitchText
                text="Creo sistemas vivos."
                className="block bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-transparent"
              />
            </div>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-7 max-w-2xl text-base leading-relaxed text-white/68 sm:text-lg md:text-xl md:leading-relaxed"
          >
            Desarrollo experiencias web cinematográficas, sistemas digitales,
            bots y productos visuales que hacen que una marca se vea distinta,
            seria y difícil de olvidar.
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <div className="w-full sm:w-auto">
              <MagneticButton
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="inline-flex items-center gap-2">
                  Quiero algo brutal
                  <ArrowRight className="h-4 w-4" />
                </span>
              </MagneticButton>
            </div>

            <div className="w-full sm:w-auto">
              <MagneticButton
                onClick={() =>
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="inline-flex items-center gap-2">
                  Ver proyectos
                  <Star className="h-4 w-4" />
                </span>
              </MagneticButton>
            </div>
          </div>

          <div ref={trustRef} className="mt-8 flex flex-wrap items-center gap-3">
            {[
              ["Enfoque", "Visual brutal + UX clara"],
              ["Resultado", "Impacto desde el primer scroll"],
              ["Experiencia", "Desktop, tablet y mobile"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 backdrop-blur-xl"
              >
                <p className="text-[11px] uppercase tracking-[0.25em] text-white/45">
                  {label}
                </p>
                <p className="mt-1 text-sm font-medium text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div ref={panelRef} className="relative mx-auto w-full max-w-[590px] lg:ml-auto">
          <div className="absolute inset-[-12%] rounded-full bg-gradient-to-br from-cyan-400/20 via-indigo-500/10 to-fuchsia-500/20 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2.4rem] border border-white/12 bg-white/[0.065] p-4 shadow-[0_35px_180px_rgba(0,0,0,0.72)] backdrop-blur-2xl">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_28%,transparent_68%,rgba(255,255,255,0.08))]" />

            <div className="relative rounded-[1.9rem] border border-white/10 bg-black/30 p-5">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                </div>

                <div className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/55">
                  Live System
                </div>
              </div>

              <div className="grid gap-3">
                {[
                  [Globe2, "Web Experience", "Interfaces premium con presencia visual."],
                  [Bot, "Bots & Automation", "Sistemas conectados a flujos reales."],
                  [Cpu, "Digital Systems", "Apps, paneles y lógica escalable."],
                  [Code2, "Creative Code", "Animación, rendimiento y detalle."],
                ].map(([Icon, title, text]) => {
                  const LucideIcon = Icon as typeof Globe2

                  return (
                    <div
                      key={title as string}
                      className="group rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.075]"
                    >
                      <div className="flex gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] text-white/75">
                          <LucideIcon className="h-4 w-4" />
                        </div>

                        <div>
                          <h3 className="text-sm font-semibold text-white/90">
                            {title as string}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-white/55">
                            {text as string}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute -left-7 top-[12%] hidden rounded-2xl border border-white/12 bg-white/[0.08] px-4 py-3 backdrop-blur-xl sm:block">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-cyan-400/12 p-2">
                <Zap className="h-4 w-4 text-cyan-300" />
              </div>
              <p className="text-sm font-semibold text-white">Sistema vivo</p>
            </div>
          </div>

          <div className="pointer-events-none absolute -right-7 top-[54%] hidden rounded-2xl border border-white/12 bg-white/[0.08] px-4 py-3 backdrop-blur-xl sm:block">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">
              Núcleo
            </p>
            <p className="mt-1 text-sm font-semibold text-white">Apps / Bots / Web</p>
          </div>
        </div>
      </div>
    </section>
  )
})

Hero.displayName = "Hero"

export default Hero