import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import ThemeToggle from "./ThemeToggle"

interface NavbarProps {
  isLoaded?: boolean
}

const navLinks = [
  { label: "Sobre mí", href: "#about", code: "01" },
  { label: "Proyectos", href: "#work", code: "02" },
  { label: "Contacto", href: "#contact", code: "03" },
]

const Navbar = ({ isLoaded = true }: NavbarProps) => {
  const navRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const mobilePanelRef = useRef<HTMLDivElement>(null)
  const mobileLinksRef = useRef<HTMLDivElement>(null)

  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isLoaded || !navRef.current) return

    gsap.fromTo(
      navRef.current,
      { y: -90, opacity: 0, filter: "blur(12px)" },
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        delay: 0.25,
        ease: "power4.out",
      }
    )
  }, [isLoaded])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const panel = mobilePanelRef.current
    const links = mobileLinksRef.current?.querySelectorAll(".mobile-link")

    if (!panel || !links?.length) return

    if (isOpen) {
      document.body.style.overflow = "hidden"

      gsap.set(menuRef.current, { pointerEvents: "auto" })

      gsap.fromTo(
        panel,
        { clipPath: "circle(0% at 90% 7%)", opacity: 1 },
        {
          clipPath: "circle(150% at 90% 7%)",
          duration: 0.9,
          ease: "expo.inOut",
        }
      )

      gsap.fromTo(
        links,
        { y: 60, opacity: 0, filter: "blur(12px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.09,
          delay: 0.22,
          duration: 0.8,
          ease: "power4.out",
        }
      )
    } else {
      document.body.style.overflow = ""

      gsap.to(links, {
        y: -24,
        opacity: 0,
        filter: "blur(10px)",
        stagger: 0.035,
        duration: 0.28,
        ease: "power3.in",
      })

      gsap.to(panel, {
        clipPath: "circle(0% at 90% 7%)",
        duration: 0.65,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(menuRef.current, { pointerEvents: "none" })
        },
      })
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-50 px-4 py-4 sm:px-6 md:px-10 lg:px-16 xl:px-24"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        <div
          className={`relative mx-auto flex max-w-[1500px] items-center justify-between overflow-hidden rounded-full border px-4 py-3 backdrop-blur-2xl transition-all duration-500 sm:px-5 ${
            scrolled
              ? "border-white/12 bg-[#030511]/72 shadow-[0_18px_80px_rgba(0,0,0,0.38)]"
              : "border-white/8 bg-white/[0.035]"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.11),transparent_28%,transparent_70%,rgba(255,255,255,0.04))]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="group relative z-10 inline-flex items-center gap-3 text-white"
            aria-label="Ir al inicio"
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.055] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              <span className="absolute h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_24px_rgba(165,243,252,0.9)]" />
              <span className="absolute inset-2 rounded-full border border-white/10" />
            </span>

            <span className="relative block h-6 overflow-hidden sm:h-7">
              <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                <span className="block whitespace-nowrap text-sm font-black tracking-[-0.03em] sm:text-xl">
                  Code By Cirotti
                </span>
              </span>

              <span className="absolute left-0 top-full block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                <span className="block whitespace-nowrap text-sm font-black tracking-[-0.03em] sm:text-xl">
                  Creative Developer
                </span>
              </span>
            </span>
          </a>

          <div className="relative z-10 hidden items-center gap-2 md:flex">
            <div className="mr-2 flex items-center gap-1 rounded-full border border-white/10 bg-black/20 p-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="group relative overflow-hidden rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.24em] text-white/55 transition duration-300 hover:text-white"
                >
                  <span className="absolute inset-0 scale-75 rounded-full bg-white/[0.075] opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100" />
                  <span className="relative z-10 inline-flex items-center gap-2">
                    <span className="text-white/28">{link.code}</span>
                    {link.label}
                  </span>
                </button>
              ))}
            </div>

            <ThemeToggle />
          </div>

          <div className="relative z-50 flex items-center gap-3 md:hidden">
            <ThemeToggle />

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.055] text-white backdrop-blur-xl"
              aria-label="Abrir menú"
              aria-expanded={isOpen}
            >
              <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_65%)] opacity-0 transition duration-300 group-hover:opacity-100" />

              <span className="relative flex h-5 w-5 flex-col items-center justify-center gap-1.5">
                <span
                  className={`h-px w-5 bg-white transition duration-300 ${
                    isOpen ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-px w-5 bg-white transition duration-300 ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-px w-5 bg-white transition duration-300 ${
                    isOpen ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div
        ref={menuRef}
        className="pointer-events-none fixed inset-0 z-40 md:hidden"
      >
        <div
          ref={mobilePanelRef}
          className="absolute inset-0 overflow-hidden bg-[#030511]"
          style={{ clipPath: "circle(0% at 90% 7%)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(99,102,241,0.28),transparent_36%),radial-gradient(circle_at_20%_80%,rgba(34,211,238,0.12),transparent_32%),radial-gradient(circle_at_90%_75%,rgba(217,70,239,0.18),transparent_32%)]" />

          <div
            className="absolute inset-0 opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage: "radial-gradient(circle at center, black 35%, transparent 82%)",
              WebkitMaskImage:
                "radial-gradient(circle at center, black 35%, transparent 82%)",
            }}
          />

          <div className="absolute left-1/2 top-[18%] h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-[90px]" />

          <div
            ref={mobileLinksRef}
            className="relative z-10 flex min-h-screen flex-col justify-center px-6 pt-24"
          >
            <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.95)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/55">
                Navigation
              </span>
            </div>

            <div className="space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="mobile-link group flex w-full items-center justify-between overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.045] px-5 py-5 text-left backdrop-blur-xl"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/30">
                      {link.code}
                    </span>
                    <span className="text-4xl font-black uppercase tracking-[-0.06em] text-white">
                      {link.label}
                    </span>
                  </span>

                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/60 transition group-hover:text-white">
                    ↗
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-[28px] border border-white/10 bg-black/25 p-5 backdrop-blur-xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
                Cirotti / Creative Developer
              </p>
              <p className="mt-3 text-sm leading-6 text-white/56">
                Experiencias web, sistemas vivos, bots y productos digitales con
                identidad visual premium.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar