"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function LogosClientes() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  // Hardcoded image URLs to avoid any validation issues
  const logos = [
    {
      nombre: "Universidad del Sagrado Corazón",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sagrado%20corazon-81SWxs7lYyjD8jWBYIBGpKfruh1zV5.png",
      width: 300,
      height: 150,
    },
    {
      nombre: "Anette Espinet",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AnetteEspinetLogo_Gold-e1692461916172%20(1)-TjA97u8ZZpyMWi94KCZRoiUfQQvehb.png",
      width: 300,
      height: 150,
    },
    {
      nombre: "Bright Panel",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/images-fsqu4J3WOsgyayJ7wsY21u5gcjgxYC.png",
      width: 180,
      height: 180,
    },
    {
      nombre: "Chente",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chente.jpg-Vwq7aXiqoIQYhon1UFwVX2p5sZS6W4.jpeg",
      width: 180,
      height: 180,
    },
    // Updated UP Home Solution with actual logo
    {
      nombre: "UP Home Solution",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/UP-Home-Solution-logo-green-mj9cSL6nfmCNAVmuCfwNIGgcxkiePE.png", // Using direct blob URL instead of local path
      width: 300,
      height: 150,
      bgColor: "white",
    },
    // Updated Claro with actual logo
    {
      nombre: "Claro",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Claro.svg%20%281%29-ZFnRoe9Q7BeKG4N26H2I3jXd8TwIcP.png", // Using direct blob URL instead of local path
      width: 200,
      height: 200,
      bgColor: "transparent",
    },
  ]

  // Create a duplicate set of logos for seamless scrolling
  const allLogos = [...logos, ...logos, ...logos, ...logos]

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let position = 0
    const speed = 0.5 // Adjust speed as needed

    const scroll = () => {
      position -= speed

      // Reset position when we've scrolled the width of one set of logos
      if (position <= -(scrollContainer.scrollWidth / 4)) {
        position = 0
      }

      scrollContainer.style.transform = `translateX(${position}px)`
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  const handleImageError = (logoName: string) => {
    console.error(`Error loading logo for ${logoName}`)
    setImageErrors((prev) => ({
      ...prev,
      [logoName]: true,
    }))
  }

  return (
    <section id="clientes" className="py-20 overflow-hidden bg-[#F5F5F5]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-[#1A1A1A]">Confían en Nosotros</h2>

        <div className="relative w-full overflow-hidden">
          <div ref={scrollRef} className="flex space-x-24 whitespace-nowrap" style={{ willChange: "transform" }}>
            {allLogos.map((logo, index) => (
              <div key={index} className="flex-shrink-0 inline-flex items-center justify-center">
                <div
                  className="flex items-center justify-center rounded-md overflow-hidden shadow-md border border-gray-200 p-4"
                  style={{
                    width: `${logo.width}px`,
                    height: `${logo.height}px`,
                    backgroundColor: logo.bgColor || "transparent",
                  }}
                >
                  {imageErrors[logo.nombre] ? (
                    <div
                      className="w-full h-full flex items-center justify-center text-center p-2"
                      style={{
                        color:
                          logo.nombre === "Claro"
                            ? "#E20A17"
                            : logo.nombre === "UP Home Solution"
                              ? "#004D2E"
                              : "#1A1A1A",
                        fontWeight: "bold",
                        fontSize: "1.5rem",
                      }}
                    >
                      {logo.nombre}
                    </div>
                  ) : (
                    <Image
                      src={logo.logo || "/placeholder.svg"}
                      alt={`Logo de ${logo.nombre}`}
                      width={logo.width - 40} // Subtract padding to get actual image size
                      height={logo.height - 40}
                      className="object-contain"
                      onError={() => handleImageError(logo.nombre)}
                      unoptimized={true}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
