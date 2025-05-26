"use client"

import { useRef, useEffect, useState } from "react"
import FormModal from "./FormModal"

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Function to handle video loading and playing
    const setupVideo = async () => {
      if (!videoRef.current) return

      try {
        // Set direct blob URL instead of relative path
        videoRef.current.src =
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video%20for%20the%20websitemp4%20%281%29-N8CLwjc8cewi1uqeGBl2OrcmNoJlaJ.mp4"

        // Wait for the video to be loaded before trying to play
        videoRef.current.addEventListener(
          "loadeddata",
          async () => {
            try {
              // Only try to play if the component is still mounted
              if (videoRef.current) {
                await videoRef.current.play()
              }
            } catch (error) {
              console.error("Error playing video:", error instanceof Error ? error.message : String(error))
              setVideoError(true)
            }
          },
          { once: true },
        )

        // Handle loading errors
        videoRef.current.addEventListener(
          "error",
          (e) => {
            const videoElement = e.target as HTMLVideoElement
            console.error(
              "Video loading error:",
              videoElement.error
                ? `Code: ${videoElement.error.code}, Message: ${videoElement.error.message}`
                : "Unknown error",
            )
            setVideoError(true)
          },
          { once: true },
        )

        // Start loading the video
        videoRef.current.load()
      } catch (error) {
        console.error("Video setup error:", error instanceof Error ? error.message : String(error))
        setVideoError(true)
      }
    }

    setupVideo()

    // Cleanup function
    return () => {
      if (videoRef.current) {
        // Remove all event listeners
        videoRef.current.onloadeddata = null
        videoRef.current.onerror = null

        // Stop the video and clear the source
        videoRef.current.pause()
        videoRef.current.removeAttribute("src")
        videoRef.current.load()
      }
    }
  }, [])

  // Función para abrir el modal con el formulario
  const handleComienzaAhora = () => {
    setShowModal(true)
  }

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <>
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Video or Fallback */}
        <div className="absolute inset-0 w-full h-full">
          {!videoError ? (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              poster="/placeholder.svg?height=1080&width=1920"
              muted
              loop
              playsInline
            >
              {/* Source is set dynamically in the useEffect */}
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="absolute inset-0 bg-[#1A1A1A]"></div>
          )}
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-[#1A1A1A] opacity-90"></div>
        </div>

        {/* Hero Content */}
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-extrabold mb-6 md:mb-10 text-[#F5F5F5] drop-shadow-lg leading-tight tracking-tight">
            Crea Contenido que Vende
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 text-[#F5F5F5] max-w-3xl mx-auto drop-shadow-md px-4">
            Ayudamos a desarollar tu marca personal a través de la creación contenido, generando prospectos potenciales
            para tu negocio.
          </p>
          <button
            onClick={handleComienzaAhora}
            className="bg-[#E50914] text-[#F5F5F5] px-6 py-3 md:px-8 md:py-4 rounded-full text-base md:text-lg font-semibold hover:bg-[#B81D24] inline-block transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Comienza Ahora
          </button>
        </div>
      </section>

      {/* Modal del Formulario */}
      <FormModal isOpen={showModal} onClose={closeModal} />
    </>
  )
}
