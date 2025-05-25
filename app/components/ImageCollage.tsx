"use client"

import Image from "next/image"
import { useState } from "react"

interface CollageImage {
  src: string
  alt: string
}

export default function ImageCollage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  // Mantenemos el mismo orden de imágenes pero eliminamos la propiedad views
  const images: CollageImage[] = [
    {
      src: "/images/viralizacion-2.png",
      alt: "Hombre con dinero",
    },
    {
      src: "/images/viralizacion-7.png",
      alt: "Reunión de equipo",
    },
    {
      src: "/images/viralizacion-4.png",
      alt: "Autos deportivos",
    },
    {
      src: "/images/viralizacion-5.png",
      alt: "Hombre en terraza",
    },
    {
      src: "/images/viralizacion-3.png",
      alt: "Fiesta con texto",
    },
    {
      src: "/images/viralizacion-8.png",
      alt: "Personas en auto",
    },
    {
      src: "/images/viralizacion-1.png",
      alt: "Mujer con plantas",
    },
    {
      src: "/images/viralizacion-6.png",
      alt: "Hombre con gorra",
    },
  ]

  return (
    <div className="grid grid-cols-4 grid-rows-2 h-full w-full">
      {images.map((image, index) => (
        <div
          key={index}
          className="relative overflow-hidden"
          style={{ height: "100%" }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            className={`object-cover transition-transform duration-500 ${
              hoveredIndex === index ? "scale-110" : "scale-100"
            }`}
            sizes="(max-width: 768px) 50vw, 25vw"
            unoptimized={true}
          />

          {/* Overlay simplificado sin mostrar números de vistas */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-60 transition-opacity duration-300 ${
              hoveredIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Se ha eliminado el contenido del overlay que mostraba las vistas */}
          </div>
        </div>
      ))}
    </div>
  )
}
