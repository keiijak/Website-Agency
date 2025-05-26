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
  const [videosLoaded, setVideosLoaded] = useState<boolean[]>([])
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const progressBarRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    setMutedStates(elementosPortafolio.map(() => true))
    setErrors(elementosPortafolio.map(() => null))
    setProgress(elementosPortafolio.map(() => 0))
    setVideosLoaded(elementosPortafolio.map(() => false))
  }, [])

  const handleError = useCallback((index: number, error: unknown) => {
    console.error(`Error in video ${index}:`, error)
    let errorMessage = "Video no disponible"
    if (error instanceof Error) {
      errorMessage = `Error: ${error.message}`
    } else if (error instanceof Event && error.type === "error") {
      const target = error.target as HTMLVideoElement
      errorMessage = `Error: ${target.error?.message || "Error de video"}`
    }
    setErrors((prev) => {
      const newErrors = [...prev]
      newErrors[index] = errorMessage
      return newErrors
    })
  }, [])

  const handleVideoLoaded = useCallback((index: number) => {
    console.log(`Video ${index} loaded successfully`)
    setVideosLoaded((prev) => {
      const newLoaded = [...prev]
      newLoaded[index] = true
      return newLoaded
    })
  }, [])

  const togglePlay = useCallback(
    async (index: number) => {
      console.log(`Attempting to toggle play for video ${index}`)
      try {
        const video = videoRefs.current[index]
        if (!video) {
          console.error(`Video ${index} ref is null`)
          return
        }

        if (playingVideo === index) {
          console.log(`Pausing video ${index}`)
          video.pause()
          setPlayingVideo(null)
        } else {
          console.log(`Playing video ${index}`)
          // Pause any other playing video first
          if (playingVideo !== null) {
            const currentlyPlaying = videoRefs.current[playingVideo]
            if (currentlyPlaying) {
              currentlyPlaying.pause()
            }
          }

          try {
            await video.play()
            setPlayingVideo(index)
            console.log(`Video ${index} started playing successfully`)
          } catch (playError) {
            console.error(`Error playing video ${index}:`, playError)
            handleError(index, playError)
          }
        }
      } catch (error) {
        console.error(`Error in togglePlay for video ${index}:`, error)
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
          console.log(`Video ${index} muted state changed to: ${newMutedState}`)
        }
      } catch (error) {
        console.error(`Error toggling mute for video ${index}:`, error)
        handleError(index, error)
      }
    },
    [mutedStates, handleError],
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
      const progressBar = progressBarRefs.current[index]
      const video = videoRefs.current[index]
      if (progressBar && video && video.duration) {
        const rect = progressBar.getBoundingClientRect()
        const clickPosition = (event.clientX - rect.left) / rect.width
        video.currentTime = clickPosition * video.duration
        updateProgress(index)
      }
    },
    [updateProgress],
  )

  // Handle video end
  const handleVideoEnd = useCallback((index: number) => {
    console.log(`Video ${index} ended`)
    setPlayingVideo(null)
    setProgress((prev) => {
      const newProgress = [...prev]
      newProgress[index] = 0
      return newProgress
    })
  }, [])

  return (
    <section id="portafolio" className="py-20 bg-[#1A1A1A]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#F5F5F5]">Trabajos Recientes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4">
          {elementosPortafolio.map((elemento, index) => (
            <div key={index} className="bg-black rounded-lg overflow-hidden shadow-md">
              <div className="aspect-[9/16] relative">
                {errors[index] ? (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E50914] to-[#B81D24] flex flex-col items-center justify-center p-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 mx-auto">
                        <Play className="w-8 h-8 text-[#E50914]" />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2">{elemento.titulo}</h3>
                      <p className="text-white text-sm opacity-80">{errors[index]}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Loading indicator */}
                    {!videosLoaded[index] && (
                      <div className="absolute inset-0 bg-[#1A1A1A] flex items-center justify-center z-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E50914]"></div>
                      </div>
                    )}

                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={elemento.video}
                      className="absolute inset-0 w-full h-full object-cover"
                      loop
                      playsInline
                      muted={mutedStates[index]}
                      preload="metadata"
                      onError={(e) => {
                        console.error(`Video ${index} error event:`, e)
                        handleError(index, e)
                      }}
                      onTimeUpdate={() => updateProgress(index)}
                      onLoadedData={() => {
                        console.log(`Video ${index} loaded data`)
                        handleVideoLoaded(index)
                      }}
                      onCanPlay={() => {
                        console.log(`Video ${index} can play`)
                        handleVideoLoaded(index)
                      }}
                      onEnded={() => handleVideoEnd(index)}
                      onPlay={() => {
                        console.log(`Video ${index} play event`)
                        setPlayingVideo(index)
                      }}
                      onPause={() => {
                        console.log(`Video ${index} pause event`)
                        if (playingVideo === index) {
                          setPlayingVideo(null)
                        }
                      }}
                      style={{
                        opacity: videosLoaded[index] ? 1 : 0,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      Your browser does not support the video tag.
                    </video>

                    {/* Progress bar */}
                    <div
                      ref={(el) => (progressBarRefs.current[index] = el)}
                      className="absolute bottom-0 left-0 w-full h-2 bg-[#F5F5F5] cursor-pointer group"
                      onClick={(e) => handleProgressBarClick(index, e)}
                    >
                      <div className="relative h-full bg-[#B81D24]" style={{ width: `${progress[index]}%` }}>
                        <div
                          className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md border-2 border-[#B81D24]"
                          style={{
                            opacity: playingVideo === index ? 1 : 0,
                            transition: "opacity 0.3s ease",
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="absolute bottom-4 right-2 flex space-x-1 md:space-x-2">
                      <button
                        className="p-1.5 md:p-2 bg-black bg-opacity-50 rounded-full transition-opacity duration-300 hover:bg-opacity-70"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleMute(index)
                        }}
                        aria-label={mutedStates[index] ? "Unmute" : "Mute"}
                      >
                        {mutedStates[index] ? (
                          <VolumeX className="w-5 h-5 md:w-6 md:h-6 text-[#F5F5F5]" />
                        ) : (
                          <Volume2 className="w-5 h-5 md:w-6 md:h-6 text-[#F5F5F5]" />
                        )}
                      </button>
                      <button
                        className="p-1.5 md:p-2 bg-black bg-opacity-50 rounded-full transition-opacity duration-300 hover:bg-opacity-70"
                        onClick={(e) => {
                          e.stopPropagation()
                          togglePlay(index)
                        }}
                        aria-label={playingVideo === index ? "Pause" : "Play"}
                      >
                        {playingVideo === index ? (
                          <Pause className="w-5 h-5 md:w-6 md:h-6 text-[#F5F5F5]" />
                        ) : (
                          <Play className="w-5 h-5 md:w-6 md:h-6 text-[#F5F5F5]" />
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
