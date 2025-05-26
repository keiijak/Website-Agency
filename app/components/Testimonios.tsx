"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function Testimonios() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonios = [
    {
      nombre: "Kevin Rodriguez",
      empresa: "Planificador Financiero",
      cita: "Desde que comencé a trabajar con KeiijaK he visto un aumento significativo en las estadísticas de mis redes sociales. Incluso he podido recopilar muchos clientes para mi negocio a través del contenido",
      foto: "/images/kevin-rodriguez.jpeg",
      objectPosition: "center top",
      bgColor: "#E50914",
    },
    {
      nombre: "Anette Espinet",
      empresa: "Financiera",
      cita: "El contenido que me ha creado KeiijaK ha sido de mucho valor para mis redes sociales. Me ha ayudado desde el desarollo de la idea hasta el resultado final. Totalmente lo recomiendo si quieres crecer tu audiencia en las redes sociales.",
      foto: "/images/anette-espinet-new.png",
      objectPosition: "center 80%",
      bgColor: "#FFD700",
      customBg: true,
      scale: "1.0",
    },
    {
      nombre: "Bengie Rivera",
      empresa: "Locutor",
      cita: "¡KeiijaK es la máquina de trabajo! Siempre puntual y su lente siempre está adelantado al momento perfecto, pues no se pierde ni un solo detalle todo queda captado en su cámara.",
      foto: "/images/bengie-rivera.jpeg",
      objectPosition: "center top",
      bgColor: "#3498db",
    },
    {
      nombre: "Edgardo Santiago",
      empresa: "Ventas en Industria Solar",
      cita: "Antes de comenzar a trabajar con KeiijaK, tenía 3,000 seguidores. Ahora, 3 meses después, tengo más de 13,000 seguidores. Gracias al contenido he podido generar unos $150,000 para mi negocio.",
      foto: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ed%205.jpg-4vw2jgdQjTqRxUmUrYZtpEC4HU9WK7.jpeg",
      objectPosition: "top 10% center",
      bgColor: "#B81D24",
    },
    {
      nombre: "Gerardo Londoño",
      empresa: "Renta de Carros Exóticos",
      cita: "Desde que comencé a trabajar con KeiijaK, he podido tener más de 300K vistas orgánicas para mis redes sociales, que me han ayudado a expandir mi marca personal y mi negocio.",
      foto: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2064.JPG-Bkt27O0cCN50psMCVYlAPXonOw0913.jpeg",
      objectPosition: "center top",
      scale: "1.7",
      bgColor: "#E50914",
    },
    {
      nombre: "Luz De León",
      empresa: "Artista Plástica",
      cita: "KeiijaK, me encantó el proceso, toda tu paciencia y dedicación. Que sea el principio de varios proyectos. ¡Gracias por todo!",
      foto: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Luz-1.jpg-3xyIlHy6kw4HAesBkeWiEdN4M7p7Ob.jpeg",
      objectPosition: "center 20%",
      bgColor: "#1A1A1A",
    },
  ]

  // Auto-rotate testimonials with 8 seconds interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonios.length)
    }, 8000) // Set to 8000 milliseconds (8 seconds)

    return () => clearInterval(interval)
  }, [testimonios.length])

  return (
    <section id="testimonios" className="py-20 bg-[#B81D24] overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-7xl md:text-8xl font-extrabold text-center mb-16 text-[#F5F5F5] tracking-tight leading-tight">
          Lo que Dicen Nuestros Clientes
        </h2>

        {/* Main Testimonial Display */}
        <div className="relative h-[500px] md:h-[400px] mb-12">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <div className="w-96 h-96 rounded-full bg-[#F5F5F5]"></div>
            <div className="absolute w-64 h-64 rounded-full bg-[#E50914] -top-10 -left-10"></div>
            <div className="absolute w-48 h-48 rounded-full bg-[#8C8C8C] bottom-10 -right-10"></div>
          </div>

          {/* Testimonials */}
          {testimonios.map((testimonio, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex flex-col md:flex-row items-center transition-all duration-1000 ${
                activeIndex === index
                  ? "opacity-100 translate-x-0"
                  : index < activeIndex
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
              }`}
            >
              {/* Photo */}
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl mb-8 md:mb-0 md:mr-12 flex-shrink-0 relative z-10">
                {testimonio.nombre === "Anette Espinet" ? (
                  <div className="absolute inset-0 bg-[#FFD700] flex items-center justify-center">
                    {/* Custom positioning for Anette's photo */}
                    <div className="absolute w-full h-full" style={{ top: "-50px" }}>
                      <Image
                        src={testimonio.foto || "/placeholder.svg"}
                        alt={`Foto de ${testimonio.nombre}`}
                        width={300}
                        height={400}
                        className="object-contain"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -30%)",
                          maxWidth: "none",
                          width: "auto",
                          height: "auto",
                          maxHeight: "110%",
                        }}
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=256&width=256"
                        }}
                      />
                    </div>
                  </div>
                ) : testimonio.customBg ? (
                  <div className="absolute inset-0 bg-[#FFD700] flex items-center justify-center">
                    <Image
                      src={testimonio.foto || "/placeholder.svg"}
                      alt={`Foto de ${testimonio.nombre}`}
                      fill
                      className="object-cover"
                      style={{
                        objectPosition: testimonio.objectPosition || "center",
                        transform: testimonio.scale ? `scale(${testimonio.scale})` : "none",
                      }}
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=256&width=256"
                      }}
                    />
                  </div>
                ) : (
                  <Image
                    src={testimonio.foto || "/placeholder.svg"}
                    alt={`Foto de ${testimonio.nombre}`}
                    fill
                    className="object-cover"
                    style={{
                      objectPosition: testimonio.objectPosition || "center",
                      transform: testimonio.scale ? `scale(${testimonio.scale})` : "none",
                    }}
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=256&width=256"
                    }}
                  />
                )}
              </div>

              {/* Quote */}
              <div className="max-w-2xl bg-white rounded-lg p-8 shadow-xl relative z-10">
                <svg className="absolute -top-6 left-10 w-12 h-12 text-white" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10,8V0H0v12c0,6.627,5.373,12,12,12V16H10V8z M30,8V0H20v12c0,6.627,5.373,12,12,12V16H30V8z" />
                </svg>

                <p className="text-xl italic text-[#1A1A1A] mb-6">"{testimonio.cita}"</p>

                <div className="flex items-center">
                  <div className="w-2 h-12 mr-4 rounded-full" style={{ backgroundColor: testimonio.bgColor }}></div>
                  <div>
                    <h3 className="text-xl font-bold text-[#E50914]">{testimonio.nombre}</h3>
                    <p className="text-[#1A1A1A]">{testimonio.empresa}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-3">
          {testimonios.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-[#F5F5F5] w-10" : "bg-[#F5F5F5] opacity-50"
              }`}
              aria-label={`Ver testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
