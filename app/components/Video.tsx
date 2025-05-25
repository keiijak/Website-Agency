"use client"

import { useState, useRef } from "react"
import { Play, Pause } from "lucide-react"

interface VideoProps {
  src: string
  poster?: string
}

export default function Video({ src, poster }: VideoProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <video ref={videoRef} src={src} poster={poster} className="w-full rounded-lg shadow-lg" onClick={togglePlay}>
        Your browser does not support the video tag.
      </video>
      <button className="absolute bottom-4 right-4 bg-white bg-opacity-70 p-2 rounded-full" onClick={togglePlay}>
        {isPlaying ? <Pause className="w-6 h-6 text-blue-600" /> : <Play className="w-6 h-6 text-blue-600" />}
      </button>
    </div>
  )
}
