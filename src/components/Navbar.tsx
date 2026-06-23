import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

interface NavbarProps {
  isLoaded?: boolean
}

const navLinks = [
  { label: "Sobre mí", href: "#about", code: "01" },
  { label: "Proyectos", href: "#work", code: "02" },
  { label: "Precios", href: "#pricing", code: "03" },
  { label: "Contacto", href: "#contact", code: "04" },
]

const Navbar = ({ isLoaded = true }: NavbarProps) => {
  const navRef = useRef<HTMLElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isLoaded || !navRef.current) return

    gsap.fromTo(
      navRef.current,
      { y: -70, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.65,
        delay: 0.12,
        ease: "power3.out",
      }
    )
  }, [isLoaded])

  useEffect(() => {
    let ticking = false

    const update = () => {
      setScrolled(window.scrollY > 24)
      ticking = false
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const handleNavClick = (href: string) => {
    setIsOpen(false)

    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-[70] px-4 py-4 sm:px-6 md:px-10 lg:px-16 xl:px-24"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        <div
          className={`relative mx-auto flex max-w-[1500px] items-center justify-between overflow-hidden rounded-full border px-4 backdrop-blur-xl transition-[padding,background-color,border-color,box-shadow] duration-300 sm:px-5 ${
            scrolled
              ? "border-cyan-200/25 bg-[#030511]/90 py-2 shadow-[0_18px_80px_rgba(0,0,0,0.55)]"
              : "border-white/10 bg-white/[0.04] py-3 shadow-none"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.1),transparent_30%,transparent_72%,rgba(255,255,255,0.04))]" />

          <button
            type="button"
            onClick={() => handleNavClick("#")}
            className="group relative z-10 inline-flex items-center gap-3 text-white"
            aria-label="Ir al inicio"
          >
            <span
              className={`relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.055] transition-transform duration-300 ${
                scrolled ? "scale-90" : ""
              }`}
            >
              <span className="absolute h-2.5 w-2.5 rounded-full bg-cyan-200 shadow-[0_0_20px_rgba(165,243,252,0.85)]" />
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
          </button>

          <div className="relative z-10 hidden items-center md:flex">
            <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/20 p-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className={`group relative overflow-hidden rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] transition duration-300 hover:text-white ${
                    link.href === "#pricing"
                      ? "bg-cyan-300/[0.09] text-cyan-100"
                      : "text-white/55"
                  }`}
                >
                  <span className="absolute inset-0 scale-75 rounded-full bg-white/[0.07] opacity-0 transition duration-300 group-hover:scale-100 group-hover:opacity-100" />
                  <span className="relative z-10 inline-flex items-center gap-2">
                    <span className="text-white/28">{link.code}</span>
                    {link.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative z-[90] flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.065] text-white backdrop-blur-xl"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isOpen}
            >
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
        className={`fixed inset-0 z-[60] bg-[#030511] transition duration-300 md:hidden ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(99,102,241,0.24),transparent_36%),radial-gradient(circle_at_20%_80%,rgba(34,211,238,0.1),transparent_32%),radial-gradient(circle_at_90%_75%,rgba(217,70,239,0.15),transparent_32%)]" />
        <div className="absolute left-1/2 top-[18%] h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-300/10 blur-[70px]" />

        <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 pt-24">
          <div className="mb-8 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(103,232,249,0.95)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-white/55">
              Navigation
            </span>
          </div>

          <div className="space-y-3">
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                type="button"
                onClick={() => handleNavClick(link.href)}
                className={`flex w-full items-center justify-between overflow-hidden rounded-[28px] border px-5 py-5 text-left backdrop-blur-xl transition duration-300 ${
                  isOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                } ${
                  link.href === "#pricing"
                    ? "border-cyan-200/20 bg-cyan-300/[0.07]"
                    : "border-white/10 bg-white/[0.045]"
                }`}
                style={{ transitionDelay: isOpen ? `${index * 55 + 90}ms` : "0ms" }}
              >
                <span className="flex items-center gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/30">
                    {link.code}
                  </span>
                  <span className="text-4xl font-black uppercase tracking-[-0.06em] text-white">
                    {link.label}
                  </span>
                </span>

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/60">
                  ↗
                </span>
              </button>
            ))}
          </div>

          <div
            className={`mt-8 rounded-[28px] border border-white/10 bg-black/25 p-5 backdrop-blur-xl transition duration-300 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
            }`}
            style={{ transitionDelay: isOpen ? "330ms" : "0ms" }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">
              Cirotti / Creative Developer
            </p>
            <p className="mt-3 text-sm leading-6 text-white/56">
              Experiencias web, sistemas vivos, bots y productos digitales con identidad visual premium.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
