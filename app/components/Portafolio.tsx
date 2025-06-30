"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
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
  const [mutedStates, setMutedStates] = useState<boolean[]>(elementosPortafolio.map(() => true))
  const [progress, setProgress] = useState<number[]>(elementosPortafolio.map(() => 0))
  const [videoErrors, setVideoErrors] = useState<boolean[]>(elementosPortafolio.map(() => false))
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(elementosPortafolio.map(() => null))

  const handleVideoError = useCallback((index: number) => {
    console.log(`Video ${index} failed to load, showing placeholder`)
    setVideoErrors((prev) => {
      const newErrors = [...prev]
      newErrors[index] = true
      return newErrors
    })
  }, [])

  const togglePlay = useCallback(
    async (index: number) => {
      const video = videoRefs.current[index]
      if (!video) return

      try {
        if (playingVideo === index) {
          video.pause()
          setPlayingVideo(null)
        } else {
          // Pause other videos
          if (playingVideo !== null && videoRefs.current[playingVideo]) {
            videoRefs.current[playingVideo]?.pause()
          }
          await video.play()
          setPlayingVideo(index)
        }
      } catch (error) {
        console.error(`Error playing video ${index}:`, error)
        handleVideoError(index)
      }
    },
    [playingVideo, handleVideoError],
  )

  const toggleMute = useCallback(
    (index: number) => {
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
    },
    [mutedStates],
  )

  const updateProgress = useCallback((index: number) => {
    const video = videoRefs.current[index]
    if (video && video.duration) {
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
      const video = videoRefs.current[index]
      const progressBar = event.currentTarget
      if (video && video.duration && progressBar) {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4">
          {elementosPortafolio.map((elemento, index) => (
            <div key={index} className="bg-black rounded-lg overflow-hidden shadow-md">
              <div className="aspect-[9/16] relative group">
                {videoErrors[index] ? (
                  // Fallback cuando el video falla
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E50914] to-[#B81D24] flex flex-col items-center justify-center p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Play className="w-8 h-8 text-[#E50914] ml-1" />
                      </div>
                      <h3 className="text-white font-bold text-xl mb-2">{elemento.titulo}</h3>
                      <p className="text-white text-sm opacity-80 mb-2">{elemento.vistas} visualizaciones</p>
                      <p className="text-white text-xs opacity-60">Video de muestra</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Video Element */}
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      className="absolute inset-0 w-full h-full object-cover"
                      loop
                      muted={mutedStates[index]}
                      playsInline
                      preload="metadata"
                      onError={() => handleVideoError(index)}
                      onTimeUpdate={() => updateProgress(index)}
                      onPlay={() => setPlayingVideo(index)}
                      onPause={() => {
                        if (playingVideo === index) {
                          setPlayingVideo(null)
                        }
                      }}
                      onEnded={() => {
                        setPlayingVideo(null)
                        setProgress((prev) => {
                          const newProgress = [...prev]
                          newProgress[index] = 0
                          return newProgress
                        })
                      }}
                    >
                      <source src={elemento.video} type="video/mp4" />
                      {/* Fallback para navegadores que no soportan video */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#E50914] to-[#B81D24] flex flex-col items-center justify-center p-6">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 mx-auto">
                            <Play className="w-8 h-8 text-[#E50914] ml-1" />
                          </div>
                          <h3 className="text-white font-bold text-xl mb-2">{elemento.titulo}</h3>
                          <p className="text-white text-sm opacity-80">{elemento.vistas} visualizaciones</p>
                        </div>
                      </div>
                    </video>

                    {/* Play/Pause Overlay - Solo se muestra cuando el video está cargado */}
                    <div
                      className={`absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-300 ${
                        playingVideo === index ? "opacity-0" : "opacity-100 group-hover:opacity-100"
                      }`}
                    >
                      <button
                        onClick={() => togglePlay(index)}
                        className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-300 transform hover:scale-110 shadow-lg"
                        aria-label={playingVideo === index ? "Pausar video" : "Reproducir video"}
                      >
                        {playingVideo === index ? (
                          <Pause className="w-8 h-8 text-[#E50914]" />
                        ) : (
                          <Play className="w-8 h-8 text-[#E50914] ml-1" />
                        )}
                      </button>
                    </div>

                    {/* Progress Bar - Solo se muestra cuando el video está cargado */}
                    <div
                      className="absolute bottom-0 left-0 w-full h-2 bg-black bg-opacity-50 cursor-pointer"
                      onClick={(e) => handleProgressBarClick(index, e)}
                    >
                      <div
                        className="h-full bg-[#E50914] transition-all duration-150 relative"
                        style={{ width: `${progress[index]}%` }}
                      >
                        {/* Círculo en el extremo de la barra de progreso */}
                        <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md border-2 border-[#E50914]"></div>
                      </div>
                    </div>

                    {/* Controls - Solo se muestran cuando el video está cargado */}
                    <div className="absolute bottom-4 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        className="p-2 bg-black bg-opacity-70 rounded-full hover:bg-opacity-90 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleMute(index)
                        }}
                        aria-label={mutedStates[index] ? "Activar sonido" : "Silenciar"}
                      >
                        {mutedStates[index] ? (
                          <VolumeX className="w-5 h-5 text-white" />
                        ) : (
                          <Volume2 className="w-5 h-5 text-white" />
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Video Info */}
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
