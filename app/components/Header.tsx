"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Función mejorada para el desplazamiento a secciones
  const scrollToSection = (sectionId: string) => {
    console.log(`Intentando desplazarse a la sección: #${sectionId}`)
    setIsMenuOpen(false)

    // Pequeño retraso para permitir que el menú se cierre primero
    setTimeout(() => {
      try {
        const section = document.getElementById(sectionId)
        if (section) {
          console.log(`Sección encontrada: #${sectionId}`)
          window.scrollTo({
            top: section.offsetTop - 100, // Restamos 100px para compensar la altura del header
            behavior: "smooth",
          })
        } else {
          console.error(
            `Elemento con ID "${sectionId}" no encontrado. IDs disponibles:`,
            Array.from(document.querySelectorAll("[id]"))
              .map((el) => `#${el.id}`)
              .join(", "),
          )
        }
      } catch (error) {
        console.error("Error al desplazarse:", error)
      }
    }, 300)
  }

  // Registrar todos los IDs disponibles en la página para depuración
  useEffect(() => {
    const logAvailableIds = () => {
      const elements = document.querySelectorAll("[id]")
      console.log(
        "IDs disponibles en la página:",
        Array.from(elements)
          .map((el) => `#${el.id}`)
          .join(", "),
      )
    }

    // Ejecutar después de que el DOM esté completamente cargado
    if (document.readyState === "complete") {
      logAvailableIds()
    } else {
      window.addEventListener("load", logAvailableIds)
      return () => window.removeEventListener("load", logAvailableIds)
    }
  }, [])

  return (
    <header className="bg-[#1A1A1A] shadow-md relative z-50">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center relative">
          <div className="relative w-[140px] h-[140px] rounded-full overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-jack-png-0mdpDFdQco1iMsBVcne6vCHyophgZy.png"
              alt="KeiijaK Logo"
              fill
              className="object-cover"
              onError={(e) => {
                console.error("Error loading logo:", e)
                ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=140&width=140"
              }}
            />
          </div>
          <span className="text-5xl font-bold ml-[-15px] bg-clip-text text-transparent bg-gradient-to-b from-[#E50914] via-[#C41220] to-[#8B0000]">
            KeiijaK
          </span>
        </Link>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="text-[#F5F5F5] focus:outline-none p-2 relative z-20"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="relative">
            <Menu className={`w-12 h-12 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <X
              className={`w-12 h-12 absolute top-0 left-0 transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0"}`}
            />
          </div>
        </button>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-10 transition-all duration-500 ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 h-full w-full md:w-96 bg-gradient-to-bl from-[#1A1A1A] to-[#2A2A2A] shadow-2xl transition-all duration-500 transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <nav className="container h-full flex flex-col justify-center px-8 py-20">
            <ul className="space-y-8">
              <li className="overflow-hidden">
                <button
                  onClick={() => scrollToSection("servicios")}
                  className={`text-[#F5F5F5] hover:text-[#E50914] text-3xl font-bold w-full text-left py-2 transition-all duration-500 transform ${
                    isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: "100ms" }}
                >
                  <span className="relative group">
                    Servicios
                    <span className="absolute -bottom-2 left-0 w-0 h-1 bg-[#E50914] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </button>
              </li>
              <li className="overflow-hidden">
                <button
                  onClick={() => scrollToSection("resultados")}
                  className={`text-[#F5F5F5] hover:text-[#E50914] text-3xl font-bold w-full text-left py-2 transition-all duration-500 transform ${
                    isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: "200ms" }}
                >
                  <span className="relative group">
                    Resultados
                    <span className="absolute -bottom-2 left-0 w-0 h-1 bg-[#E50914] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </button>
              </li>
              <li className="overflow-hidden">
                <button
                  onClick={() => scrollToSection("testimonios")}
                  className={`text-[#F5F5F5] hover:text-[#E50914] text-3xl font-bold w-full text-left py-2 transition-all duration-500 transform ${
                    isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: "300ms" }}
                >
                  <span className="relative group">
                    Testimonios
                    <span className="absolute -bottom-2 left-0 w-0 h-1 bg-[#E50914] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </button>
              </li>
              <li className="overflow-hidden">
                <button
                  onClick={() => scrollToSection("portafolio")}
                  className={`text-[#F5F5F5] hover:text-[#E50914] text-3xl font-bold w-full text-left py-2 transition-all duration-500 transform ${
                    isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: "400ms" }}
                >
                  <span className="relative group">
                    Trabajos Recientes
                    <span className="absolute -bottom-2 left-0 w-0 h-1 bg-[#E50914] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </button>
              </li>
              <li className="overflow-hidden">
                <button
                  onClick={() => scrollToSection("clientes")}
                  className={`text-[#F5F5F5] hover:text-[#E50914] text-3xl font-bold w-full text-left py-2 transition-all duration-500 transform ${
                    isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: "500ms" }}
                >
                  <span className="relative group">
                    Clientes
                    <span className="absolute -bottom-2 left-0 w-0 h-1 bg-[#E50914] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </button>
              </li>
              <li className="overflow-hidden mt-12">
                <button
                  onClick={() => scrollToSection("reservar-llamada")}
                  className={`bg-[#E50914] text-[#F5F5F5] px-8 py-4 rounded-full hover:bg-[#B81D24] text-xl font-bold w-full text-center transition-all duration-500 transform hover:scale-105 shadow-lg ${
                    isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: "600ms" }}
                >
                  Reservar Llamada
                </button>
              </li>
            </ul>

            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#E50914] opacity-5"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[#E50914] opacity-5"></div>
            <div className="absolute top-1/3 right-20 w-16 h-16 rounded-full bg-[#F5F5F5] opacity-5"></div>
          </nav>
        </div>
      </div>
    </header>
  )
}
