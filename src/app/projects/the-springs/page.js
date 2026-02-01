"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  Building2,
  Home,
  Sparkles,
  DollarSign,
  CheckCircle2,
  Phone,
  MessageCircle,
} from "lucide-react"

const SECTION_IDS = [
  "overview",
  "location",
  "project",
  "units",
  "amenities",
  "investment",
  "why-choose",
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.4 },
}

const COLLAPSIBLE_SECTIONS = [
  "location",
  "project",
  "units",
  "amenities",
  "investment",
  "why-choose",
]

function CollapsibleSection({
  id,
  icon: Icon,
  title,
  children,
  image,
  images,
  imagePosition = "right",
  isOpen,
  onToggle,
}) {
  const hasSingleImage = !!image
  const hasImageGrid = images?.length > 0

  return (
    <motion.section
      id={id}
      {...fadeUp}
      className="mb-4"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            <Icon size={22} strokeWidth={1.5} />
          </div>
          <h2 className="text-lg md:text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h2>
        </div>
        <ChevronDown
          className={`shrink-0 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          size={22}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="border border-t-0 border-slate-200 dark:border-slate-800 rounded-b-xl bg-white dark:bg-slate-900/30 px-5 pb-5 pt-5">
              {hasSingleImage && (
                <>
                  {/* Mobile: image on top */}
                  <div className="relative w-full h-48 sm:h-64 mb-5 lg:hidden rounded-lg overflow-hidden">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                  {/* Desktop: side-by-side */}
                  <div className={`hidden lg:flex gap-6 items-start ${imagePosition === "left" ? "flex-row-reverse" : ""}`}>
                    <div className="flex-1 min-w-0 text-slate-600 dark:text-slate-400">
                      {children}
                    </div>
                    <div className="relative w-[45%] min-w-[280px] aspect-[4/3] rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="45vw"
                      />
                    </div>
                  </div>
                  {/* Mobile: text (shown when we have single image) */}
                  <div className="text-slate-600 dark:text-slate-400 lg:hidden">
                    {children}
                  </div>
                </>
              )}
              {hasImageGrid && !hasSingleImage && (
                <div className="mb-5">
                  <div className="grid grid-cols-2 gap-3 mb-5 rounded-lg overflow-hidden">
                    {images.map((src) => (
                      <div key={src} className="relative aspect-[4/3]">
                        <Image
                          src={src}
                          alt={title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 50vw, 336px"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    {children}
                  </div>
                </div>
              )}
              {!hasSingleImage && !hasImageGrid && (
                <div className="text-slate-600 dark:text-slate-400">
                  {children}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}

export default function TheSpringsProjectPage() {
  const [activeSection, setActiveSection] = useState(SECTION_IDS[0])
  const [openSections, setOpenSections] = useState(
    Object.fromEntries(COLLAPSIBLE_SECTIONS.map((id) => [id, false]))
  )

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    )
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 bg-gradient-to-b from-stone-50 via-slate-50/95 to-slate-100/90 dark:from-gray-950 dark:via-slate-950 dark:to-gray-900">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] md:h-[65vh] md:min-h-[560px] w-full overflow-hidden">
        <Image
          src="/images/Springs/Header-1.jpg"
          alt="The Springs Apartment Homes"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/20" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-4xl mx-auto w-full px-6 pb-16 md:pb-24">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-lg text-white hover:text-white transition-colors"
              >
                <ChevronLeft size={22} />
                Home
              </Link>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-emerald-400 text-xs font-medium tracking-widest uppercase mb-4">
                Orbit Housing / Orbit Developers
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
                The Springs Apartment Homes
              </h1>
              <p className="mt-2 text-lg md:text-xl text-white/80">
                Luxury Urban Living in Lahore
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Stats Bar */}
      <section className="sticky top-0 z-30 -mt-8 md:-mt-12 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/95 backdrop-blur-xl shadow-xl shadow-slate-200/50 dark:shadow-none p-4 md:p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Starting Price
                  </p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    PKR 17,000 – 20,000 <span className="text-slate-500 dark:text-slate-400 font-normal">/ sq ft</span>
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Location
                  </p>
                  <p className="text-base font-medium text-slate-900 dark:text-white">
                    Canal Bank Road, Lahore
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Developer
                  </p>
                  <p className="text-base font-medium text-slate-900 dark:text-white">
                    Orbit Housing
                  </p>
                </div>
              </div>
              <div className="flex gap-3 shrink-0">
                <a
                  href="https://wa.me/message/2HVNP5DPG5BOP1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors"
                >
                  <Phone size={16} />
                  Enquire Now
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-sm transition-colors"
                >
                  <ChevronLeft size={16} />
                  Back
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content + Sidebar */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Table of Contents - Desktop */}
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-32 space-y-1">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                On this page
              </p>
              {[
                { id: "overview", label: "Overview" },
                { id: "location", label: "Prime Location" },
                { id: "project", label: "Project Overview" },
                { id: "units", label: "Unit Types" },
                { id: "amenities", label: "Amenities" },
                { id: "investment", label: "Investment" },
                { id: "why-choose", label: "Why Choose" },
              ].map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`block py-2 text-sm transition-colors rounded-md px-2 -mx-2 ${activeSection === id
                    ? "text-emerald-600 dark:text-emerald-400 font-medium"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                >
                  {label}
                </a>
              ))}
            </div>
          </aside>

          {/* Article */}
          <article className="min-w-0 flex-1 max-w-3xl">
            {/* Overview */}
            <motion.section
              id="overview"
              {...fadeUp}
              className="mb-16"
            >
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[15px] md:text-base">
                The Springs Apartment Homes in Lahore is one of the city&apos;s most distinguished residential developments, reimagining modern apartment living with comfort, convenience, and community-centric design. Developed by Orbit Housing / Orbit Developers, this premium project harmonizes contemporary architecture, thoughtful planning, and lifestyle-driven amenities — all in a highly desirable location along Canal Bank Road (near DHA EME & Izmir Town) in Lahore, Pakistan.
              </p>
            </motion.section>

            {/* Collapsible Sections */}
            <CollapsibleSection
              id="location"
              icon={MapPin}
              title="Prime Location"
              image="/images/Springs/Springs-Canal-Project.jpg"
              isOpen={openSections.location}
              onToggle={() => toggleSection("location")}
            >
              <p className="leading-relaxed mb-0">
                Strategically located on Main Canal Road, Lahore, The Springs offers excellent connectivity to major civic and commercial centres including DHA, Thokar Niaz Baig, Metro Train routes, Ring Road links, and nearby retail, education, and healthcare facilities. The site&apos;s central positioning makes it a compelling choice for both residents seeking daily convenience and investors targeting high demand rental markets.
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              id="project"
              icon={Building2}
              title="Project Overview"
              image="/images/Springs/OutsideView.jpg"
              imagePosition="left"
              isOpen={openSections.project}
              onToggle={() => toggleSection("project")}
            >
              <p className="leading-relaxed mb-6">
                Spanning approximately 86 kanals of gated residential land, The Springs comprises five architecturally designed blocks that surround a landscaped central courtyard — nearly 50% of the site is allocated to open green space and lifestyle amenities.
              </p>
              <p className="leading-relaxed mb-0">
                This thoughtfully planned complex is designed to offer a balance of luxury, comfort, and community living. Its layout promotes social interaction while giving residents privacy and serene views of landscaped gardens and central water features.
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              id="units"
              icon={Home}
              title="Residential Options & Unit Types"
              images={[
                "/images/Springs/Hall.jpg",
                "/images/Springs/Kitchen.jpg",
                "/images/Springs/TvLo.jpg",
                "/images/Springs/KView.jpg",
              ]}
              isOpen={openSections.units}
              onToggle={() => toggleSection("units")}
            >
              <p className="leading-relaxed mb-8">
                The development includes a variety of modern apartment formats, catering to diverse living needs:
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "Studio Apartments",
                    desc: "Perfect for singles, young professionals, or frequent travelers looking for stylish, hotel-inspired living.",
                  },
                  {
                    title: "Suite Apartments",
                    desc: "Designed for distinguished comfort with premium finishes and thoughtful layouts.",
                  },
                  {
                    title: "1-, 2-, and 3-Bedroom Homes",
                    desc: "Ideal for families of all sizes, these units offer generous living spaces and flexible layouts suited for everyday life.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-5"
                  >
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
              <p className="leading-relaxed mt-6 mb-0">
                Each apartment is crafted with contemporary design, quality construction standards, and features that deliver both functionality and aesthetic appeal — from spacious balconies to efficient internal layouts.
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              id="amenities"
              icon={Sparkles}
              title="Exceptional Amenities"
              isOpen={openSections.amenities}
              onToggle={() => toggleSection("amenities")}
            >
              <p className="leading-relaxed mb-8">
                The Springs is much more than a residential address — it&apos;s a lifestyle destination with resort-style conveniences:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  "Royal Club with gym, pool, sauna & fitness",
                  "Cinema and entertainment zones",
                  "Restaurants, food courts & boutique shops",
                  "Landscaped courtyard & children's play areas",
                  "Open spaces for outdoor relaxation",
                  "Basement parking with dedicated spaces",
                  "Professional property management",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 py-2"
                  >
                    <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-500" size={18} />
                    <span className="text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </CollapsibleSection>

            <CollapsibleSection
              id="investment"
              icon={DollarSign}
              title="Investment & Ownership"
              isOpen={openSections.investment}
              onToggle={() => toggleSection("investment")}
            >
              <p className="leading-relaxed mb-6">
                The Springs offers flexible, investor-friendly payment plans for local buyers, overseas Pakistanis, and long-term investors. Pricing ranges from PKR 17,000 to PKR 20,000 per square foot, depending on unit size and view orientation.
              </p>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-6 mb-6">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                  Payment plans
                </p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <span className="font-semibold text-slate-900 dark:text-white w-24">3-year</span>
                    <span>
                      Possession after approximately 2 years
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <span className="font-semibold text-slate-900 dark:text-white w-24">5-year</span>
                    <span>
                      Extended flexibility with early possession
                    </span>
                  </div>
                </div>
              </div>
              <p className="leading-relaxed mb-0">
                Flexible terms, desirable location, strong rental potential, and resort-style amenities make this project appealing for both end-users and investors.
              </p>
            </CollapsibleSection>

            <CollapsibleSection
              id="why-choose"
              icon={CheckCircle2}
              title="Why The Springs"
              image="/images/Springs/Fb.jpg"
              imagePosition="right"
              isOpen={openSections["why-choose"]}
              onToggle={() => toggleSection("why-choose")}
            >
              <p className="leading-relaxed mb-8">
                Whether you&apos;re a first-time buyer, an investor seeking rental returns, or looking for a long-term home in Lahore&apos;s evolving real estate landscape:
              </p>
              <ul className="space-y-4 mb-0">
                {[
                  "Central yet peaceful location near key urban nodes",
                  "Diverse housing options for varied lifestyles",
                  "Luxury amenities typically found in high-end developments",
                  "Strong potential for appreciation and rental demand",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="shrink-0 text-emerald-500" size={20} />
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </CollapsibleSection>

            {/* CTA */}
            <motion.section
              {...fadeUp}
              className="rounded-2xl bg-slate-900 dark:bg-slate-800 p-8 md:p-10 text-center"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                Interested in The Springs?
              </h3>
              <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
                Get in touch for brochures, pricing details, and site visit arrangements.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://wa.me/message/2HVNP5DPG5BOP1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors"
                >
                  <MessageCircle size={18} />
                  Contact Us
                </a>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 font-medium transition-colors"
                >
                  Go Back
                  <ChevronLeft size={18} />
                </Link>
              </div>
            </motion.section>
          </article>
        </div>
      </div>
    </div>
  )
}
