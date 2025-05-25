"use client"

import type React from "react"

import { useState, useRef, useCallback, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

const elementosPortafolio = [
  {
    titulo: "Rediseño de Blog",
    video:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/no%20ando%20con%20amigos%20pobres-3ooBDwSaNBxz1zdg5CL6SsndEJZXUL.mp4",
    vistas: "+353K",
  },
  {
    titulo: "Serie de Videos",
    video:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video%20de%20los%20carrosmp4-cXVinxsuzaqqVEYaN40Vj2ov2ng7MZ.mp4",
    vistas: "+237K",
  },
  {
    titulo: "Campaña de Redes Sociales",
    video: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/campaign-video-fQCtx4OS9o84pxPtjmfy0yP1bSbV2U.mp4",
    vistas: "+230K",
  },
  {
    titulo: "Colaboración con Influencers",
    video:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Entrevista%20real%201%20(1)-bi8sFC2ckUnuif9T0DoSsaO8LkmR8Y.mp4",
    vistas: "+100K",
  },
]

export default function Portafolio() {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)
  const [mutedStates, setMutedStates] = useState<boolean[]>([])
  const [errors, setErrors] = useState<(string | null)[]>([])
  const [progress, setProgress] = useState<number[]>([])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const progressBarRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    setMutedStates(elementosPortafolio.map(() => true))
    setErrors(elementosPortafolio.map(() => null))
    setProgress(elementosPortafolio.map(() => 0))
  }, [])

  const handleError = useCallback((index: number, error: unknown) => {
    console.error(`Error in video ${index}:`, error)
    let errorMessage = "An unknown error occurred"
    if (error instanceof Error) {
      errorMessage = `Error: ${error.message}`
    } else if (typeof error === "string") {
      errorMessage = `Error: ${error}`
    } else if (error instanceof Event && error.type === "error") {
      const target = error.target as HTMLVideoElement
      errorMessage = `Error: ${target.error?.message || "Unknown video error"}`
    } else if (error && typeof error === "object") {
      errorMessage = `Error: ${JSON.stringify(error)}`
    }
    setErrors((prev) => {
      const newErrors = [...prev]
      newErrors[index] = errorMessage
      return newErrors
    })
  }, [])

  const togglePlay = useCallback(
    (index: number) => {
      try {
        const video = videoRefs.current[index]
        if (video) {
          if (playingVideo === index) {
            video.pause()
            setPlayingVideo(null)
          } else {
            video.play().catch((error) => {
              handleError(index, error)
            })
            setPlayingVideo(index)
          }
        }
      } catch (error) {
        handleError(index, error)
      }
    },
    [playingVideo, handleError],
  )

  const toggleMute = useCallback(
    (index: number) => {
      try {
        const video = videoRefs.current[index]
        if (video) {
          const newMutedState = !mutedStates[index]
          video.muted = newMutedState
          setMutedStates((prev) => {
            const newStates = [...prev]
            newStates[index] = newMutedState
            return newStates
          })
        }
      } catch (error) {
        handleError(index, error)
      }
    },
    [mutedStates, handleError],
  )

  const updateProgress = useCallback((index: number) => {
    const video = videoRefs.current[index]
    if (video) {
      const progressValue = (video.currentTime / video.duration) * 100
      setProgress((prev) => {
        const newProgress = [...prev]
        newProgress[index] = progressValue
        return newProgress
      })
    }
  }, [])

  const handleProgressBarClick = useCallback(
    (index: number, event: React.MouseEvent<HTMLDivElement>) => {
      const progressBar = progressBarRefs.current[index]
      const video = videoRefs.current[index]
      if (progressBar && video) {
        const rect = progressBar.getBoundingClientRect()
        const clickPosition = (event.clientX - rect.left) / rect.width
        video.currentTime = clickPosition * video.duration
        updateProgress(index)
      }
    },
    [updateProgress],
  )

  return (
    <section id="portafolio" className="py-20 bg-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#F5F5F5]">Trabajos Recientes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {elementosPortafolio.map((elemento, index) => (
            <div key={index} className="bg-black rounded-lg overflow-hidden shadow-md">
              <div className="aspect-[9/16] relative">
                {errors[index] ? (
                  <div className="absolute inset-0 bg-black flex items-center justify-center p-4">
                    <span className="text-[#F5F5F5] text-sm text-center">{errors[index]}</span>
                  </div>
                ) : (
                  <>
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={elemento.video}
                      className="absolute inset-0 w-full h-full object-cover"
                      loop
                      playsInline
                      muted={mutedStates[index]}
                      onError={(e) => handleError(index, e)}
                      onTimeUpdate={() => updateProgress(index)}
                    >
                      Your browser does not support the video tag.
                    </video>
                    <div
                      ref={(el) => (progressBarRefs.current[index] = el)}
                      className="absolute bottom-0 left-0 w-full h-2 bg-[#F5F5F5] cursor-pointer group"
                      onClick={(e) => handleProgressBarClick(index, e)}
                    >
                      <div className="relative h-full bg-[#B81D24]" style={{ width: `${progress[index]}%` }}>
                        {/* Círculo indicador de progreso */}
                        <div
                          className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md border-2 border-[#B81D24]"
                          style={{
                            opacity: playingVideo === index ? 1 : 0,
                            transition: "opacity 0.3s ease",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-2 flex space-x-2">
                      <button
                        className="p-2 bg-black bg-opacity-50 rounded-full transition-opacity duration-300 hover:bg-opacity-70"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleMute(index)
                        }}
                      >
                        {mutedStates[index] ? (
                          <VolumeX className="w-6 h-6 text-[#F5F5F5]" />
                        ) : (
                          <Volume2 className="w-6 h-6 text-[#F5F5F5]" />
                        )}
                      </button>
                      <button
                        className="p-2 bg-black bg-opacity-50 rounded-full transition-opacity duration-300 hover:bg-opacity-70"
                        onClick={() => togglePlay(index)}
                      >
                        {playingVideo === index ? (
                          <Pause className="w-6 h-6 text-[#F5F5F5]" />
                        ) : (
                          <Play className="w-6 h-6 text-[#F5F5F5]" />
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className="p-4 flex justify-between items-center bg-[#E50914]">
                <p className="text-2xl font-bold text-[#F5F5F5]">{elemento.vistas}</p>
                <p className="text-sm text-[#F5F5F5]">visualizaciones</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
