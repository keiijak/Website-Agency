"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { FileText, Video, TrendingUp, ArrowRight, Check } from "lucide-react"
import FormModal from "./FormModal"
import ImageCollage from "./ImageCollage"

export default function Servicios() {
  const [activeService, setActiveService] = useState(0)
  const [hoveredButton, setHoveredButton] = useState<number | null>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const [showModal, setShowModal] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Handle scroll snap on mobile
  useEffect(() => {
    const handleScroll = () => {
      if (servicesRef.current) {
        const scrollPosition = servicesRef.current.scrollLeft
        const cardWidth = servicesRef.current.offsetWidth
        const newActiveIndex = Math.round(scrollPosition / cardWidth)
        if (newActiveIndex !== activeService) {
          setActiveService(newActiveIndex)
        }
      }
    }

    const currentRef = servicesRef.current
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", handleScroll)
      }
    }
  }, [activeService])

  // Función para manejar el clic en "Conoce más"
  const handleConoceMas = () => {
    setShowModal(true)
  }

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false)
  }

  const servicios = [
    {
      titulo: "Plan Estratégico",
      descripcion: "Análisis del nicho del cliente y desarrollo de contenido orgánico optimizado para su audiencia.",
      icon: <FileText className="w-10 h-10" />,
      color: "#FF0000", // Rojo más brillante
      textColor: "#F5F5F5",
      imagen: "/images/plan-estrategico.jpeg",
      beneficios: [
        "Contenido personalizado para tu marca",
        "Ideación de Contenido",
        "Estrategia basada en datos de audiencia",
        "Estructura de Videos que trae resultados",
      ],
    },
    {
      titulo: "Creación de Contenido",
      descripcion: "Grabación y edición para crear videos que generen clientes de forma orgánica.",
      icon: <Video className="w-10 h-10" />,
      color: "#BB0000", // Rojo de brillo medio
      textColor: "#F5F5F5",
      imagen: "/images/creacion-de-contenido.jpeg",
      beneficios: [
        "Equipo de cámaras y luces",
        "Edición de alta calidad",
        "Efectos visuales impactantes",
        "Narrativa audiovisual efectiva",
      ],
    },
    {
      titulo: "Viralización",
      descripcion: "Aplicación de estrategias para maximizar el alcance y engagement en redes sociales.",
      icon: <TrendingUp className="w-10 h-10" />,
      color: "#770000", // Rojo menos brillante
      textColor: "#F5F5F5",
      useCollage: true, // Indicador para usar el componente de collage
      beneficios: [
        "Mayor alcance orgánico",
        "Aumento de engagement",
        "Técnicas de tendencias virales",
        "Análisis de resultados detallado",
      ],
    },
  ]

  const scrollToService = (index: number) => {
    if (servicesRef.current) {
      const cardWidth = servicesRef.current.offsetWidth
      servicesRef.current.scrollTo({
        left: cardWidth * index,
        behavior: "smooth",
      })
      setActiveService(index)
    }
  }

  return (
    <>
      <section id="servicios" ref={sectionRef} className="py-20 bg-[#1A1A1A] overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-extrabold text-center mb-12 md:mb-20 text-[#F5F5F5] tracking-tight leading-tight px-4">
            Servicio de Marca Personal
          </h2>

          {/* Service Navigation */}
          <div className="flex justify-center mb-12 md:mb-16 px-4">
            <div className="flex space-x-2 md:space-x-8 overflow-x-auto scrollbar-hide max-w-full">
              {servicios.map((servicio, index) => (
                <button
                  key={index}
                  onClick={() => scrollToService(index)}
                  onMouseEnter={() => setHoveredButton(index)}
                  onMouseLeave={() => setHoveredButton(null)}
                  className="relative group flex-shrink-0"
                >
                  {/* Número encima del botón */}
                  <div
                    className="absolute -top-6 md:-top-10 left-1/2 transform -translate-x-1/2 w-6 h-6 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-xl font-bold"
                    style={{
                      backgroundColor: activeService === index || hoveredButton === index ? servicio.color : "#1A1A1A",
                      color: "#F5F5F5",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    {index + 1}
                  </div>

                  <div
                    className={`px-3 py-2 md:px-10 md:py-5 rounded-full transition-all duration-300 transform text-sm md:text-xl font-bold whitespace-nowrap ${
                      activeService === index || hoveredButton === index
                        ? "scale-105 md:scale-110 shadow-xl"
                        : "shadow-md hover:shadow-lg"
                    }`}
                    style={{
                      backgroundColor: activeService === index || hoveredButton === index ? servicio.color : "white",
                      color: activeService === index || hoveredButton === index ? servicio.textColor : "#1A1A1A",
                      minWidth: "fit-content",
                    }}
                  >
                    <span className="font-bold">{servicio.titulo}</span>
                  </div>
                  {activeService === index && (
                    <div
                      className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-6 md:w-8 md:h-8 rotate-45"
                      style={{ backgroundColor: servicio.color }}
                    ></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Services Horizontal Scroll */}
          <div
            ref={servicesRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {servicios.map((servicio, index) => (
              <div key={index} className="w-full flex-shrink-0 snap-center px-4" style={{ minWidth: "100%" }}>
                <div
                  className="rounded-3xl overflow-hidden shadow-2xl min-h-[600px] md:min-h-[550px] h-auto flex flex-col md:flex-row transform transition-all duration-500"
                  style={{
                    backgroundColor: servicio.color,
                    transform: activeService === index ? "scale(1.02)" : "scale(1)",
                  }}
                >
                  {/* Service Content */}
                  <div className="md:w-1/2 p-6 md:p-12 flex flex-col justify-center relative z-10">
                    {index === 0 || index === 1 ? (
                      // Contenido para Plan Estratégico y Creación de Contenido
                      <>
                        <div className="flex items-center mb-6 md:mb-8">
                          {index === 0 ? (
                            <FileText className="w-8 h-8 md:w-10 md:h-10 text-white" />
                          ) : (
                            <Video className="w-8 h-8 md:w-10 md:h-10 text-white" />
                          )}
                        </div>

                        <h3
                          className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight break-words"
                          style={{ color: servicio.textColor }}
                        >
                          {servicio.titulo}
                        </h3>

                        <p
                          className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 leading-relaxed"
                          style={{ color: servicio.textColor }}
                        >
                          {servicio.descripcion}
                        </p>

                        <div className="mb-6 md:mb-8">
                          <h4
                            className="text-base md:text-lg font-semibold mb-3 md:mb-4"
                            style={{ color: servicio.textColor }}
                          >
                            Beneficios:
                          </h4>
                          <ul className="space-y-2 md:space-y-3">
                            {servicio.beneficios.map((beneficio, i) => (
                              <li key={i} className="flex items-start">
                                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                                  <Check className="w-3 h-3 md:w-4 md:h-4" style={{ color: servicio.color }} />
                                </div>
                                <span
                                  className="text-sm md:text-base leading-relaxed"
                                  style={{ color: servicio.textColor }}
                                >
                                  {beneficio}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-auto">
                          <button
                            onClick={handleConoceMas}
                            className="flex items-center font-bold text-base md:text-lg group bg-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            style={{ color: servicio.color }}
                          >
                            <span>Conoce más</span>
                            <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-2" />
                          </button>
                        </div>
                      </>
                    ) : (
                      // Contenido para Viralización
                      <>
                        <div className="flex items-center mb-6 md:mb-8">
                          <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-white" />
                        </div>

                        <h3
                          className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight break-words"
                          style={{ color: servicio.textColor }}
                        >
                          {servicio.titulo}
                        </h3>

                        <p
                          className="text-base md:text-lg lg:text-xl mb-6 md:mb-8 leading-relaxed"
                          style={{ color: servicio.textColor }}
                        >
                          {servicio.descripcion}
                        </p>

                        <div className="mb-6 md:mb-8">
                          <h4
                            className="text-base md:text-lg font-semibold mb-3 md:mb-4"
                            style={{ color: servicio.textColor }}
                          >
                            Beneficios:
                          </h4>
                          <ul className="space-y-2 md:space-y-3">
                            {servicio.beneficios.map((beneficio, i) => (
                              <li key={i} className="flex items-start">
                                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                                  <Check className="w-3 h-3 md:w-4 md:h-4" style={{ color: servicio.color }} />
                                </div>
                                <span
                                  className="text-sm md:text-base leading-relaxed"
                                  style={{ color: servicio.textColor }}
                                >
                                  {beneficio}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-auto">
                          <button
                            onClick={handleConoceMas}
                            className="flex items-center font-bold text-base md:text-lg group bg-white px-4 py-2 md:px-6 md:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            style={{ color: servicio.color }}
                          >
                            <span>Conoce más</span>
                            <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:translate-x-2" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Service Image */}
                  <div
                    className="md:w-1/2 h-64 md:h-auto relative flex items-center justify-center p-0"
                    style={{ backgroundColor: servicio.color }}
                  >
                    <div className="relative w-full h-full overflow-hidden">
                      {servicio.useCollage ? (
                        // Usar el componente de collage para Viralización
                        <ImageCollage />
                      ) : (
                        // Usar imagen normal para otros servicios
                        <Image
                          src={servicio.imagen || "/placeholder.svg"}
                          alt={servicio.titulo}
                          fill
                          className="object-cover"
                          quality={90}
                          priority={activeService === index}
                          sizes="(max-width: 768px) 100vw, 50vw"
                          onError={(e) => {
                            console.error("Error loading image:", e)
                            ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=500&width=500"
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots (Mobile Only) */}
          <div className="flex justify-center mt-12 md:hidden">
            {servicios.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToService(index)}
                className={`w-4 h-4 mx-2 rounded-full transition-all duration-300 ${
                  activeService === index ? "bg-[#F5F5F5] w-10" : "bg-[#F5F5F5] opacity-30"
                }`}
                aria-label={`Ver servicio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal del Formulario */}
      <FormModal isOpen={showModal} onClose={closeModal} />
    </>
  )
}
