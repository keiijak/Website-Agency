"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, Instagram, Linkedin, ArrowRight, MapPin, Youtube } from "lucide-react"

export default function Footer() {
  const [emailHovered, setEmailHovered] = useState(false)
  const [phoneHovered, setPhoneHovered] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: "smooth",
      })
    }
  }

  return (
    <footer className="bg-gradient-to-b from-[#1A1A1A] to-black text-[#F5F5F5] pt-20 pb-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E50914] to-transparent opacity-70"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[#E50914] opacity-5"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-[#E50914] opacity-5"></div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Logo and description */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start">
            <div className="flex flex-col md:flex-row items-center md:items-center gap-0 mb-1">
              <div className="relative w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-full overflow-hidden shadow-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-jack-png-0mdpDFdQco1iMsBVcne6vCHyophgZy.png"
                  alt="KeiijaK Logo"
                  fill
                  className="object-cover"
                  onError={(e) => {
                    console.error("Error loading footer logo:", e)
                    ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=120&width=120"
                  }}
                />
              </div>
              <span className="text-3xl md:text-5xl font-bold md:ml-[-10px] bg-clip-text text-transparent bg-gradient-to-b from-[#E50914] via-[#C41220] to-[#8B0000]">
                KeiijaK
              </span>
            </div>

            {/* Iconos de redes sociales justo debajo del texto KeiijaK */}
            <div className="flex space-x-4 mb-6 md:mb-8 justify-center md:justify-start md:ml-[110px] -mt-1">
              <a
                href="https://www.instagram.com/keiijak/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-gray-700 hover:bg-[#E50914] transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@keiijak"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-gray-700 hover:bg-[#E50914] transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/jack-%C3%A1vila-2bb09125b/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center border border-gray-700 hover:bg-[#E50914] transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Espacio para mantener el diseño equilibrado */}
            <div className="mb-8"></div>
          </div>

          {/* Enlaces Rápidos */}
          <div className="md:col-span-3 text-center md:text-left">
            <h4 className="text-xl font-bold mb-6 relative inline-block">
              Enlaces Rápidos
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#E50914]"></span>
            </h4>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => scrollToSection("servicios")}
                  className="flex items-center group text-gray-300 hover:text-white transition-colors duration-300"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                  <span className="relative overflow-hidden">
                    Servicios
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E50914] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("resultados")}
                  className="flex items-center group text-gray-300 hover:text-white transition-colors duration-300"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                  <span className="relative overflow-hidden">
                    Resultados
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E50914] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("testimonios")}
                  className="flex items-center group text-gray-300 hover:text-white transition-colors duration-300"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                  <span className="relative overflow-hidden">
                    Testimonios
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E50914] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("portafolio")}
                  className="flex items-center group text-gray-300 hover:text-white transition-colors duration-300"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                  <span className="relative overflow-hidden">
                    Trabajos Recientes
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E50914] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("reservar-llamada")}
                  className="flex items-center group text-gray-300 hover:text-white transition-colors duration-300"
                >
                  <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300" />
                  <span className="relative overflow-hidden">
                    Reservar Llamada
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E50914] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contáctanos */}
          <div className="md:col-span-4 text-center md:text-left">
            <h4 className="text-xl font-bold mb-6 relative inline-block">
              Contáctanos
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-[#E50914]"></span>
            </h4>

            <div className="space-y-6">
              <a
                href="mailto:keiijakvisuals@gmail.com"
                className="flex items-start group"
                onMouseEnter={() => setEmailHovered(true)}
                onMouseLeave={() => setEmailHovered(false)}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 transition-colors duration-300 ${emailHovered ? "bg-[#E50914]" : "bg-[#2A2A2A]"}`}
                >
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white group-hover:text-[#E50914] transition-colors duration-300">
                    keiijakvisuals@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="tel:+17876105535"
                className="flex items-start group"
                onMouseEnter={() => setPhoneHovered(true)}
                onMouseLeave={() => setPhoneHovered(false)}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 transition-colors duration-300 ${phoneHovered ? "bg-[#E50914]" : "bg-[#2A2A2A]"}`}
                >
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Teléfono</p>
                  <p className="text-white group-hover:text-[#E50914] transition-colors duration-300">(787) 610-5535</p>
                </div>
              </a>

              <div className="flex items-start">
                <div className="w-10 h-10 rounded-lg bg-[#2A2A2A] flex items-center justify-center mr-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Ubicación</p>
                  <p className="text-white">San Juan, Puerto Rico</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} KeiijaK. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacidad"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
              >
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
