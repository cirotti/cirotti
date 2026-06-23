import { memo } from "react"
import {
  ArrowRight,
  BadgeCheck,
  Bot,
  Check,
  Code2,
  CreditCard,
  Database,
  Gauge,
  Globe2,
  Layers3,
  MessageCircle,
  PackageCheck,
  Search,
  ServerCog,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Star,
  Store,
  Zap,
  type LucideIcon,
} from "lucide-react"

type Plan = {
  icon: LucideIcon
  name: string
  badge?: string
  price: string
  description: string
  highlight?: boolean
  features: string[]
  ideal: string[]
}

const plans: Plan[] = [
  {
    icon: Globe2,
    name: "Presencia Profesional",
    price: "$90.000",
    description:
      "Para negocios que necesitan una presentación digital moderna, clara y confiable desde el primer vistazo.",
    features: [
      "Diseño personalizado según tu marca",
      "Página de inicio con estructura comercial",
      "Sección de servicios o información principal",
      "Botón directo a WhatsApp",
      "Formulario de contacto",
      "Mapa de ubicación integrado",
      "Enlaces a redes sociales",
      "Diseño responsive para celular, tablet y escritorio",
      "Optimización visual esencial",
      "Carga rápida y estructura limpia",
      "Configuración de favicon e identidad visual",
      "Publicación en hosting o plataforma acordada",
      "Soporte posterior al lanzamiento para ajustes de entrega",
    ],
    ideal: ["Servicios locales", "Profesionales", "Emprendimientos", "Negocios que recién comienzan"],
  },
  {
    icon: ServerCog,
    name: "Web Avanzada",
    badge: "Más solicitado",
    price: "$120.000",
    description:
      "Para marcas que necesitan una web más completa, con integraciones, automatización comercial, SEO inicial y una experiencia más premium.",
    highlight: true,
    features: [
      "Todo lo incluido en Presencia Profesional",
      "Diseño visual más avanzado y premium",
      "Animaciones e interacciones optimizadas",
      "Integración con APIs externas",
      "Automatizaciones comerciales iniciales",
      "Botones inteligentes hacia WhatsApp, redes o formularios",
      "Secciones comerciales más completas",
      "SEO inicial para mejorar presencia en Google",
      "Optimización de velocidad y rendimiento",
      "Copy comercial orientado a conversión",
      "Estructura preparada para futuras mejoras",
      "Diseño responsive avanzado",
      "Configuración Open Graph para compartir el link bonito",
      "Soporte posterior al lanzamiento para ajustes de entrega",
    ],
    ideal: ["Empresas", "Servicios técnicos", "Barberías", "Restaurantes", "Marcas que quieren verse más serias"],
  },
  {
    icon: ShoppingCart,
    name: "Ecommerce Profesional",
    price: "$240.000",
    description:
      "Una tienda online profesional para mostrar productos, generar confianza, recibir pedidos y preparar tu marca para vender por internet.",
    features: [
      "Diseño ecommerce personalizado",
      "Catálogo de productos",
      "Carrito de compras",
      "Páginas de producto detalladas",
      "Categorías de productos",
      "Gestión inicial de pedidos",
      "Panel administrativo para productos",
      "Control de stock inicial",
      "Integración con WhatsApp para ventas",
      "Métodos de pago según requerimiento",
      "SEO profesional para productos y categorías",
      "Optimización de títulos, descripciones y estructura",
      "Configuración de imágenes para compartir productos",
      "Diseño responsive completo",
      "Experiencia de compra clara y ordenada",
      "Preparada para crecer con nuevas funciones",
      "Soporte posterior al lanzamiento para ajustes de entrega",
    ],
    ideal: ["Tiendas de ropa", "Mueblerías", "Repostería", "Catálogos comerciales", "Negocios con productos físicos"],
  },
]

const extras = [
  [BadgeCheck, "Diseño a medida", "Nada genérico: cada web se adapta al negocio y su identidad."],
  [Gauge, "Optimización real", "Código limpio, secciones livianas y experiencia rápida en mobile."],
  [MessageCircle, "Soporte incluido", "Después de entregar, te acompaño con ajustes de lanzamiento y orientación."],
]

const custom = [
  [Code2, "Sistemas administrativos"],
  [Database, "Dashboards y bases de datos"],
  [Bot, "Bots y automatizaciones"],
  [CreditCard, "Integraciones de pago"],
  [PackageCheck, "Inventario avanzado"],
  [Layers3, "Plataformas a medida"],
]

const Pricing = memo(() => {
  return (
    <section
      id="pricing"
      className="relative isolate overflow-hidden bg-[#030511] px-5 py-24 text-white sm:px-6 md:py-32 lg:px-10 xl:px-20"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.16),transparent_30%),radial-gradient(circle_at_85%_18%,rgba(99,102,241,0.18),transparent_32%),radial-gradient(circle_at_55%_92%,rgba(217,70,239,0.14),transparent_34%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:76px_76px] opacity-[0.12]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(3,5,17,0.92)_78%)]" />
        <div className="absolute left-1/2 top-0 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-cyan-300/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-[1560px]">
        <div className="mx-auto mb-14 max-w-5xl text-center md:mb-20">
          <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5 text-cyan-200" />
            <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-cyan-100/60">
              Inversión / Cirotti
            </span>
          </div>

          <h2 className="text-[clamp(3rem,8vw,8.8rem)] font-black uppercase leading-[0.78] tracking-[-0.105em]">
            Precios claros.
            <span className="block bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-transparent">
              Presencia real.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/58 md:text-lg">
            Elige el tipo de proyecto que necesitas. Cada propuesta se adapta al negocio,
            pero estos son los planes base para comenzar con una presencia digital seria.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3 xl:gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon

            return (
              <article
                key={plan.name}
                className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-5 backdrop-blur-2xl transition duration-300 hover:-translate-y-2 md:rounded-[2.4rem] md:p-6 ${
                  plan.highlight
                    ? "border-cyan-200/30 bg-white/[0.085] shadow-[0_35px_140px_rgba(34,211,238,0.16)]"
                    : "border-white/10 bg-white/[0.045] shadow-[0_30px_110px_rgba(0,0,0,0.32)] hover:border-white/20 hover:bg-white/[0.065]"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute right-5 top-5 rounded-full border border-cyan-200/20 bg-cyan-300/[0.08] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-100/80">
                    {plan.badge}
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_0%,rgba(34,211,238,0.17),transparent_34%),radial-gradient(circle_at_90%_100%,rgba(217,70,239,0.14),transparent_36%)]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-white/36">
                      Servicio
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.045em] text-white md:text-3xl">
                      {plan.name}
                    </h3>
                    <p className="mt-4 min-h-[72px] text-sm leading-7 text-white/58">
                      {plan.description}
                    </p>
                  </div>

                  <div className="my-7 rounded-[1.7rem] border border-white/10 bg-black/25 p-5">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
                      Desde
                    </p>
                    <div className="mt-2 flex items-end gap-2">
                      <span className="text-[clamp(2.6rem,5vw,4.4rem)] font-black leading-none tracking-[-0.08em] text-white">
                        {plan.price}
                      </span>
                      <span className="pb-2 text-sm font-medium text-white/45">CLP</span>
                    </div>
                  </div>

                  <div className="mb-7">
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
                      Incluye
                    </p>
                    <div className="grid gap-3">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex gap-3 text-sm leading-6 text-white/64">
                          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cyan-200/20 bg-cyan-300/[0.08] text-cyan-100">
                            <Check className="h-3 w-3" />
                          </span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto border-t border-white/10 pt-5">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
                      Ideal para
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {plan.ideal.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-white/55"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {extras.map(([Icon, title, text]) => {
            const ExtraIcon = Icon as LucideIcon

            return (
              <div
                key={title as string}
                className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl"
              >
                <ExtraIcon className="mb-4 h-4 w-4 text-white/65" />
                <h3 className="text-sm font-semibold text-white/90">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-white/52">{text as string}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-6 overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 p-5 backdrop-blur-2xl md:rounded-[2.4rem] md:p-7 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5">
                <Store className="h-3.5 w-3.5 text-fuchsia-200" />
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
                  Proyectos avanzados
                </span>
              </div>

              <h3 className="max-w-2xl text-[clamp(2.2rem,5vw,5rem)] font-black uppercase leading-[0.82] tracking-[-0.09em]">
                ¿Necesitas algo más grande?
              </h3>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/58 md:text-base">
                También desarrollo sistemas administrativos, dashboards, plataformas,
                integraciones, bots y soluciones a medida. Estos proyectos se cotizan según
                funciones, complejidad y tiempo de desarrollo.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {custom.map(([Icon, label]) => {
                const CustomIcon = Icon as LucideIcon

                return (
                  <div
                    key={label as string}
                    className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/65">
                      <CustomIcon className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-medium text-white/72">{label as string}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-[2rem] border border-cyan-200/15 bg-cyan-300/[0.045] p-5 backdrop-blur-xl md:flex-row md:items-center md:justify-between md:p-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-100/55">
              Comencemos
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
              Cuéntame tu idea y te digo qué plan se adapta mejor.
            </h3>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-4 text-sm font-bold text-[#030511] transition hover:scale-[1.02] active:scale-[0.98]"
          >
            Solicitar cotización
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-6 text-white/38">
          Los valores pueden variar según cantidad de secciones, funciones especiales,
          integraciones, contenido, dominio, hosting o requerimientos adicionales. El soporte incluido considera ajustes de entrega, orientación y correcciones menores posteriores al lanzamiento.
        </p>
      </div>
    </section>
  )
})

Pricing.displayName = "Pricing"

export default Pricing
