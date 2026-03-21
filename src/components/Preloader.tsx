import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

const FINAL_WORD = "CIROTTI";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
const STATUS_STEPS = [
  "Inicializando experiencia",
  "Sincronizando interfaces",
  "Cargando identidad visual",
  "Preparando lanzamiento",
];

const Preloader = ({ onComplete }: PreloaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelTopRef = useRef<HTMLDivElement>(null);
  const panelBottomRef = useRef<HTMLDivElement>(null);

  const bgRef = useRef<HTMLDivElement>(null);
  const glowMainRef = useRef<HTMLDivElement>(null);
  const glowSecondaryRef = useRef<HTMLDivElement>(null);

  const ringWrapRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const lineOuterRef = useRef<HTMLDivElement>(null);
  const lineInnerRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);

  const orbit1Ref = useRef<HTMLDivElement>(null);
  const orbit2Ref = useRef<HTMLDivElement>(null);
  const orbit3Ref = useRef<HTMLDivElement>(null);

  const particlesRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const noiseRef = useRef<HTMLDivElement>(null);

  const [count, setCount] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      let scrambleInterval: ReturnType<typeof setInterval> | null = null;
      let statusInterval: ReturnType<typeof setInterval> | null = null;
      let scrambleIteration = 0;
      let finished = false;

      gsap.set(lineInnerRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(
        [
          badgeRef.current,
          titleRef.current,
          subtitleRef.current,
          statusRef.current,
          counterRef.current,
          lineOuterRef.current,
          ringWrapRef.current,
        ],
        {
          opacity: 0,
          y: 22,
        }
      );

      gsap.set([glowMainRef.current, glowSecondaryRef.current], {
        opacity: 0,
        scale: 0.75,
      });

      gsap.set(centerRef.current, {
        opacity: 0,
        scale: 0.82,
      });

      gsap.set(pulseRef.current, {
        scale: 0.5,
        opacity: 0,
      });

      gsap.set(particlesRef.current?.children || [], {
        opacity: 0,
        scale: 0,
      });

      const intro = gsap.timeline();

      intro
        .to(glowMainRef.current, {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: "power4.out",
        })
        .to(
          glowSecondaryRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.9"
        )
        .to(
          ringWrapRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "expo.out",
          },
          "-=0.85"
        )
        .to(
          centerRef.current,
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "expo.out",
          },
          "-=0.65"
        )
        .to(
          pulseRef.current,
          {
            opacity: 0.5,
            scale: 1.4,
            duration: 1.1,
            ease: "power2.out",
          },
          "-=0.7"
        )
        .to(
          badgeRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.8"
        )
        .to(
          titleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: "power4.out",
          },
          "-=0.45"
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.55"
        )
        .to(
          [lineOuterRef.current, counterRef.current, statusRef.current],
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.06,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          particlesRef.current?.children || [],
          {
            opacity: 0.9,
            scale: 1,
            stagger: 0.03,
            duration: 0.6,
            ease: "back.out(2)",
          },
          "-=0.55"
        );

      if (!reducedMotion) {
        gsap.to(glowMainRef.current, {
          x: 34,
          y: -20,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(glowSecondaryRef.current, {
          x: -28,
          y: 18,
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(bgRef.current, {
          scale: 1.04,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(centerRef.current, {
          scale: 1.045,
          duration: 1.9,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(pulseRef.current, {
          scale: 1.8,
          opacity: 0.05,
          duration: 1.8,
          repeat: -1,
          ease: "power2.out",
        });

        gsap.to(ringWrapRef.current, {
          rotate: 360,
          duration: 18,
          repeat: -1,
          ease: "none",
        });

        gsap.to(orbit2Ref.current, {
          rotate: -360,
          transformOrigin: "center center",
          duration: 12,
          repeat: -1,
          ease: "none",
        });

        gsap.to(scanRef.current, {
          xPercent: 165,
          duration: 1.5,
          repeat: -1,
          ease: "none",
        });

        gsap.to(gridRef.current, {
          yPercent: 10,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(noiseRef.current, {
          opacity: 0.22,
          duration: 0.16,
          repeat: -1,
          yoyo: true,
          ease: "steps(2)",
        });

        gsap.to(particlesRef.current?.children || [], {
          y: "random(-18, 18)",
          x: "random(-14, 14)",
          opacity: "random(0.35, 1)",
          duration: "random(1.8, 3.4)",
          repeat: -1,
          yoyo: true,
          stagger: {
            each: 0.04,
            from: "random",
          },
          ease: "sine.inOut",
        });
      }

      scrambleInterval = setInterval(() => {
        if (!titleRef.current) return;

        titleRef.current.innerText = FINAL_WORD.split("")
          .map((_, index) => {
            if (index < scrambleIteration) return FINAL_WORD[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");

        if (scrambleIteration >= FINAL_WORD.length) {
          if (scrambleInterval) clearInterval(scrambleInterval);
          titleRef.current.innerText = FINAL_WORD;
        }

        scrambleIteration += 1 / 2.5;
      }, 34);

      statusInterval = setInterval(() => {
        setStatusIndex((prev) => (prev + 1) % STATUS_STEPS.length);
      }, 680);

      const proxy = { value: 0 };

      const loadTl = gsap.timeline({
        delay: 0.15,
        onComplete: () => {
          if (finished) return;
          finished = true;

          const exit = gsap.timeline({
            onComplete: () => {
              onComplete();
            },
          });

          exit
            .to(
              [badgeRef.current, statusRef.current, counterRef.current, subtitleRef.current],
              {
                opacity: 0,
                y: -16,
                duration: 0.34,
                stagger: 0.04,
                ease: "power3.in",
              },
              0
            )
            .to(
              lineOuterRef.current,
              {
                opacity: 0,
                y: -10,
                scaleX: 0.96,
                duration: 0.35,
                ease: "power3.in",
              },
              0.03
            )
            .to(
              [ringWrapRef.current, centerRef.current, glowMainRef.current, glowSecondaryRef.current, particlesRef.current],
              {
                opacity: 0,
                scale: 1.08,
                duration: 0.55,
                ease: "power3.inOut",
              },
              0.05
            )
            .to(
              titleRef.current,
              {
                opacity: 0,
                y: -30,
                letterSpacing: "-0.04em",
                duration: 0.42,
                ease: "power4.in",
              },
              0.08
            )
            .to(
              panelTopRef.current,
              {
                yPercent: -100,
                duration: 1.05,
                ease: "expo.inOut",
              },
              0.24
            )
            .to(
              panelBottomRef.current,
              {
                yPercent: 100,
                duration: 1.05,
                ease: "expo.inOut",
              },
              0.24
            )
            .to(
              containerRef.current,
              {
                opacity: 0,
                duration: 0.2,
                pointerEvents: "none",
              },
              0.94
            );
        },
      });

      loadTl.to(proxy, {
        value: 100,
        duration: reducedMotion ? 1.2 : 3.35,
        ease: "power2.inOut",
        onUpdate: () => {
          setCount(Math.min(100, Math.floor(proxy.value)));
        },
      });

      loadTl.to(
        lineInnerRef.current,
        {
          scaleX: 1,
          duration: reducedMotion ? 1.2 : 3.35,
          ease: "power2.inOut",
        },
        0
      );

      return () => {
        if (scrambleInterval) clearInterval(scrambleInterval);
        if (statusInterval) clearInterval(statusInterval);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const formattedCount = String(count).padStart(2, "0");

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#02040a]"
    >
      <div
        ref={panelTopRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#02040a]"
      />
      <div
        ref={panelBottomRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#02040a]"
      />

      <div ref={bgRef} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.15),transparent_22%),radial-gradient(circle_at_82%_18%,rgba(217,70,239,0.14),transparent_24%),radial-gradient(circle_at_50%_78%,rgba(99,102,241,0.22),transparent_30%)]" />

        <div
          ref={gridRef}
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "52px 52px",
            maskImage:
              "radial-gradient(circle at center, black 28%, transparent 84%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black 28%, transparent 84%)",
          }}
        />

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            background:
              "repeating-linear-gradient(to bottom, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 2px, transparent 7px)",
          }}
        />

        <div
          ref={noiseRef}
          className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-soft-light"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cg fill='white' fill-opacity='0.08'%3E%3Ccircle cx='14' cy='18' r='1'/%3E%3Ccircle cx='64' cy='23' r='1'/%3E%3Ccircle cx='116' cy='41' r='1'/%3E%3Ccircle cx='35' cy='88' r='1'/%3E%3Ccircle cx='89' cy='72' r='1'/%3E%3Ccircle cx='144' cy='118' r='1'/%3E%3Ccircle cx='52' cy='136' r='1'/%3E%3Ccircle cx='78' cy='102' r='1'/%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div
        ref={glowMainRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400/25 via-indigo-500/18 to-fuchsia-500/24 blur-[135px]"
      />
      <div
        ref={glowSecondaryRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-white/10 via-cyan-300/8 to-fuchsia-300/10 blur-[100px]"
      />

      <div
        ref={particlesRef}
        className="pointer-events-none absolute inset-0"
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-full bg-white/80"
            style={{
              width: i % 3 === 0 ? "5px" : "3px",
              height: i % 3 === 0 ? "5px" : "3px",
              left: `${8 + ((i * 11) % 84)}%`,
              top: `${12 + ((i * 13) % 72)}%`,
              boxShadow:
                i % 2 === 0
                  ? "0 0 22px rgba(103,232,249,0.8)"
                  : "0 0 22px rgba(244,114,182,0.65)",
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
          <div
            ref={ringWrapRef}
            className="relative mb-10 flex h-[190px] w-[190px] items-center justify-center sm:h-[230px] sm:w-[230px]"
          >
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 230 230"
              fill="none"
            >
              <circle
                cx="115"
                cy="115"
                r="90"
                stroke="rgba(255,255,255,0.09)"
                strokeWidth="1.1"
              />
              <circle
                cx="115"
                cy="115"
                r="73"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
              <circle
                cx="115"
                cy="115"
                r="102"
                stroke="url(#ringGradient)"
                strokeOpacity="0.95"
                strokeWidth="2.2"
                strokeDasharray="170 470"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="ringGradient" x1="22" y1="18" x2="208" y2="208">
                  <stop offset="0%" stopColor="#67e8f9" />
                  <stop offset="48%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#e879f9" />
                </linearGradient>
              </defs>
            </svg>

            <div
              ref={orbit1Ref}
              className="absolute left-[12%] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(103,232,249,0.95)]"
            />
            <div ref={orbit2Ref} className="absolute inset-0">
              <div className="absolute left-1/2 top-[8.5%] h-2 w-2 -translate-x-1/2 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.9)]" />
            </div>
            <div
              ref={orbit3Ref}
              className="absolute bottom-[12%] right-[14%] h-2.5 w-2.5 rounded-full bg-fuchsia-300 shadow-[0_0_22px_rgba(244,114,182,0.95)]"
            />

            <div
              ref={pulseRef}
              className="absolute h-[90px] w-[90px] rounded-full border border-cyan-200/20"
            />

            <div
              ref={centerRef}
              className="relative flex h-[78px] w-[78px] items-center justify-center rounded-full border border-white/12 bg-white/8 backdrop-blur-2xl sm:h-[94px] sm:w-[94px]"
            >
              <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-cyan-300/25 via-white/12 to-fuchsia-400/24 blur-md" />
              <div className="absolute inset-[22%] rounded-full border border-white/10" />
              <div className="relative h-4 w-4 rounded-full bg-white shadow-[0_0_34px_rgba(255,255,255,0.95)]" />
            </div>
          </div>

          <div
            ref={badgeRef}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl"
          >
            <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.95)]" />
            <span className="text-[10px] uppercase tracking-[0.34em] text-white/62 sm:text-[11px]">
              Premium portfolio launch
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-[clamp(3.2rem,10vw,8.4rem)] font-black uppercase leading-none tracking-[-0.11em] text-white"
          >
            CIROTTI
          </h1>

          <p
            ref={subtitleRef}
            className="mt-4 max-w-2xl text-sm leading-relaxed text-white/56 sm:text-base md:text-lg"
          >
            Preparando una experiencia visual de alto impacto con motion, detalle,
            presencia y una identidad digital pensada para impresionar desde el primer segundo.
          </p>

          <div className="mt-10 flex w-full max-w-xl items-center gap-4 sm:gap-5">
            <div
              ref={lineOuterRef}
              className="relative h-[10px] flex-1 overflow-hidden rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))]" />
              <div
                ref={lineInnerRef}
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-cyan-300 via-white to-fuchsia-400 shadow-[0_0_35px_rgba(125,211,252,0.42)]"
                style={{ width: "100%" }}
              >
                <div
                  ref={scanRef}
                  className="absolute inset-y-0 left-[-35%] w-[35%] skew-x-[-20deg] bg-white/55 blur-[8px]"
                />
              </div>
            </div>

            <span
              ref={counterRef}
              className="min-w-[56px] text-right font-mono text-sm tracking-[0.18em] text-white/74 sm:text-base"
            >
              {formattedCount}%
            </span>
          </div>

          <p
            ref={statusRef}
            className="mt-5 text-[11px] uppercase tracking-[0.34em] text-white/38 sm:text-xs"
          >
            {STATUS_STEPS[statusIndex]}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white/38 sm:text-[11px]">
              Creative code
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white/38 sm:text-[11px]">
              Motion design
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white/38 sm:text-[11px]">
              Premium launch
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;