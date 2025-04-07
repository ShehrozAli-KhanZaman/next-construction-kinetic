"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useTheme } from "@/context/ThemeContext"
import ClientWrapper from "@/components/ClientWrapper"

// Import icons
import {
  Building2,
  Brush,
  HardHat,
  Ruler,
  Wrench,
  PenTool,
  Maximize,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

// SectionWrapper component
const SectionWrapper = ({ children, className = "", id }) => {
  return (
    <section id={id} className={`py-10 md:py-14 w-full ${className}`}>
      <div className="container mx-auto px-4">{children}</div>
    </section>
  )
}

export default function ServicesPage() {
  const [expandedServices, setExpandedServices] = useState({})

  const toggleService = (id) => {
    setExpandedServices((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const services = [
    {
      id: "grey-structure",
      icon: <Building2 size={28} />,
      title: "Grey Structure Construction",
      shortDescription:
        "Professional development of durable structural frameworks.",
      longDescription:
        "We specialize in constructing robust grey structures that form the backbone of your building. Our team ensures proper foundation, columns, beams, slabs, and walls with attention to structural integrity and durability. We use premium materials and follow strict engineering standards to create structures designed to last generations.",
    },
    {
      id: "complete-construction",
      icon: <HardHat size={28} />,
      title: "Complete Construction",
      shortDescription:
        "End-to-end building solutions from foundation to finish.",
      longDescription:
        "Our complete construction service handles your project from conception to completion. We manage everything from initial planning and design to final finishing touches, including electrical systems, plumbing, HVAC, and interior work. Our comprehensive approach ensures a seamless building experience with consistent quality throughout every phase of construction.",
    },
    {
      id: "architectural-design",
      icon: <PenTool size={28} />,
      title: "Architectural Design",
      shortDescription:
        "Creative and functional designs tailored to your requirements.",
      longDescription:
        "Our architectural design services blend creativity with functionality to create spaces that reflect your vision and meet your practical needs. Our architects work closely with you to understand your requirements, preferences, and lifestyle before drafting designs that optimize space utilization, light, ventilation, and aesthetic appeal. We create detailed plans with 3D visualizations to help you envision your future space.",
    },
    {
      id: "interior-design",
      icon: <Brush size={28} />,
      title: "Interior Design",
      shortDescription: "Stylish and practical interior solutions.",
      longDescription:
        "Transform your space with our interior design expertise. We create harmonious environments that balance aesthetics with functionality, carefully selecting color schemes, materials, furniture, lighting, and decor elements that complement your lifestyle and preferences. Our designers stay updated with the latest trends while respecting timeless design principles to create interiors that remain relevant for years to come.",
    },
    {
      id: "renovation",
      icon: <Wrench size={28} />,
      title: "Renovation & Remodeling",
      shortDescription: "Breathe new life into existing spaces.",
      longDescription:
        "Our renovation services revitalize existing structures while preserving their core integrity. Whether you're looking to update outdated features, expand your living space, or completely transform your property's functionality and appearance, our team delivers quality craftsmanship and attention to detail. We handle everything from kitchen and bathroom remodels to whole-house renovations with minimal disruption to your daily life.",
    },
    {
      id: "consulting",
      icon: <Ruler size={28} />,
      title: "Construction Consulting",
      shortDescription: "Expert guidance for your construction projects.",
      longDescription:
        "Benefit from our extensive industry knowledge with our construction consulting services. We provide expert advice on project feasibility, budget optimization, material selection, regulatory compliance, and sustainable building practices. Our consultants help you navigate complex construction decisions, identify potential issues before they arise, and implement efficient solutions that save time and resources throughout your project lifecycle.",
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <ClientWrapper>
      <div className="bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/70 z-0"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-4 relative z-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Our Services
            </h1>
            <p className="text-lg text-white/80 max-w-xl mx-auto">
              Comprehensive construction solutions tailored to your needs
            </p>
          </motion.div>
        </section>

        {/* Services List */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block bg-primary/10 dark:bg-primary/20 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                  What We Offer
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Comprehensive Construction Solutions
                </h2>
                <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                  We provide a wide range of services to meet all your
                  construction and design needs, delivered with professionalism
                  and attention to detail.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-700 transition-all hover:shadow-lg hover:border-primary/20 dark:hover:border-primary/30">
                    <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center text-primary mb-5">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {service.shortDescription}
                    </p>

                    <div>
                      {expandedServices[service.id] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700 pt-4">
                          {service.longDescription}
                        </motion.div>
                      )}

                      <button
                        onClick={() => toggleService(service.id)}
                        className="mt-2 flex items-center text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors font-medium text-sm">
                        {expandedServices[service.id] ? (
                          <>
                            Read Less <ChevronUp size={16} className="ml-1" />
                          </>
                        ) : (
                          <>
                            Read More <ChevronDown size={16} className="ml-1" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-gray-50 dark:bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block bg-secondary/10 dark:bg-secondary/20 text-secondary px-4 py-1 rounded-full text-sm font-medium mb-4">
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                How We Work
              </h2>
              <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                Our streamlined process ensures quality results, clear
                communication, and satisfaction at every stage of your project.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 md:order-1">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-lg opacity-70"></div>
                  <Image
                    src="/images/processIllustration.webp"
                    alt="Our Construction Process"
                    width={600}
                    height={400}
                    className="rounded-xl shadow-lg relative"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 md:order-2">
                <div className="space-y-6">
                  {[
                    {
                      id: 1,
                      title: "Consultation & Planning",
                      description:
                        "We begin with understanding your vision, requirements, and budget to develop a comprehensive plan tailored to your needs.",
                    },
                    {
                      id: 2,
                      title: "Design & Development",
                      description:
                        "Our team creates detailed designs and proposals, incorporating your feedback to perfect the plans before construction begins.",
                    },
                    {
                      id: 3,
                      title: "Construction & Execution",
                      description:
                        "We implement the approved plans with precision, keeping you informed throughout the building process.",
                    },
                    {
                      id: 4,
                      title: "Quality Assurance & Handover",
                      description:
                        "We conduct thorough quality checks before project completion and provide comprehensive documentation during handover.",
                    },
                  ].map((step) => (
                    <div key={step.id} className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0 font-bold text-lg">
                        {step.id}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-white overflow-hidden relative">
              <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid-8"></div>

              <div className="absolute -top-20 -right-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Start Your Project?
                </h2>
                <p className="text-white/80 max-w-2xl mx-auto mb-8">
                  Contact us today to discuss your construction needs. Our team
                  is ready to bring your vision to life with quality
                  craftsmanship and professional service.
                </p>
                <a
                  href="/contact"
                  className="inline-block px-8 py-3 bg-white text-primary hover:bg-gray-100 font-medium rounded-lg shadow-lg transition-all">
                  Get a Free Consultation
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </ClientWrapper>
  )
}
