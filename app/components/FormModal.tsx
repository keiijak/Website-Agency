"use client"

import { useEffect, useState } from "react"
import { X, Calendar, ArrowLeft } from "lucide-react"

interface FormModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FormModal({ isOpen, onClose }: FormModalProps) {
  const [showCalendly, setShowCalendly] = useState(false)
  const calendlyUrl =
    "https://calendly.com/keiijakvisuals/30min?background_color=f5f5f5&text_color=1a1a1a&primary_color=e50914"

  // Cerrar modal con la tecla Escape
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      // Prevenir scroll cuando el modal está abierto
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleEscKey)
    }

    return () => {
      // Restaurar scroll cuando se desmonta
      document.body.style.overflow = "auto"
      window.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  // Resetear el estado cuando se cierra el modal
  useEffect(() => {
    if (!isOpen) {
      setShowCalendly(false)
    }
  }, [isOpen])

  const handleAgendarLlamada = () => {
    setShowCalendly(true)
  }

  const handleVolverAlFormulario = () => {
    setShowCalendly(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
          aria-label="Cerrar formulario"
        >
          <X className="w-8 h-8" />
        </button>

        {showCalendly ? (
          <>
            <div className="p-6 bg-[#E50914] text-white rounded-t-lg flex items-center">
              <button
                onClick={handleVolverAlFormulario}
                className="mr-4 p-2 hover:bg-[#B81D24] rounded-full transition-colors"
                aria-label="Volver al formulario"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h2 className="text-2xl font-bold">Agenda tu Llamada de Descubrimiento</h2>
                <p className="mt-2">Selecciona la fecha y hora que mejor te convenga</p>
              </div>
            </div>

            <div className="flex-grow overflow-auto">
              <iframe
                src={calendlyUrl}
                width="100%"
                height="100%"
                frameBorder="0"
                className="block w-full min-h-[600px]"
              >
                Cargando Calendly...
              </iframe>
            </div>
          </>
        ) : (
          <>
            <div className="p-6 bg-[#E50914] text-white rounded-t-lg">
              <h2 className="text-2xl font-bold">Aplicación para Desarrollo de Marca Personal</h2>
              <p className="mt-2">Completa este formulario para comenzar tu proceso de desarrollo de marca personal</p>
            </div>

            <div className="flex-grow overflow-auto">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScQj7tHdbdJ5OEORGfuY_q5I4x3pmR8V4pCmEDtXg_LnuRK0A/viewform?embedded=true"
                width="100%"
                height="100%"
                frameBorder="0"
                className="block w-full min-h-[500px]"
              >
                Cargando formulario...
              </iframe>
            </div>

            <div className="p-6 bg-gray-100 rounded-b-lg">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <p className="text-gray-700 font-bold text-xl mb-4 md:mb-0 md:mr-4">
                  Después de enviar el formulario, puedes agendar directamente tu llamada de descubrimiento:
                </p>
                <button
                  onClick={handleAgendarLlamada}
                  className="flex items-center bg-[#E50914] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#B81D24] transition-all duration-300 transform hover:scale-105 shadow-md whitespace-nowrap"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  <span className="inline-block">Agendar Llamada</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
