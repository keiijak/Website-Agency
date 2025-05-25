"use client"

import { ErrorBoundary } from "react-error-boundary"
import dynamic from "next/dynamic"
import { useEffect } from "react"

// Import components that don't rely on browser APIs directly
import Header from "./components/Header"
import Hero from "./components/Hero"
import Resultados from "./components/Resultados"
import Servicios from "./components/Servicios"
import Testimonios from "./components/Testimonios"
import Footer from "./components/Footer"

// Dynamically import components that might cause issues
const LogosClientes = dynamic(() => import("./components/LogosClientes"), { ssr: false })
const Portafolio = dynamic(() => import("./components/Portafolio"), { ssr: false })
const ReservarLlamada = dynamic(() => import("./components/ReservarLlamada"), { ssr: false })

function ErrorFallback({ error, resetErrorBoundary }) {
  console.error("Caught an error:", error)
  return (
    <div role="alert" className="p-4 bg-red-100 border border-red-400 text-red-700">
      <h2 className="text-lg font-semibold mb-2">Something went wrong:</h2>
      <pre className="text-sm overflow-auto">{error.message}</pre>
      <button onClick={resetErrorBoundary} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        Try again
      </button>
    </div>
  )
}

export default function Home() {
  // Función para manejar los enlaces de anclaje desde el menú
  useEffect(() => {
    // Función para manejar los clics en enlaces de anclaje
    const handleHashChange = () => {
      const { hash } = window.location
      if (hash) {
        const id = hash.replace("#", "")
        const element = document.getElementById(id)
        if (element) {
          // Desplazarse al elemento con un pequeño offset
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: "smooth",
          })
        }
      }
    }

    // Ejecutar al cargar la página
    if (window.location.hash) {
      // Pequeño retraso para asegurar que todos los elementos estén cargados
      setTimeout(handleHashChange, 500)
    }

    // Escuchar cambios en el hash
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header />
      </ErrorBoundary>
      <main className="flex-grow">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Resultados />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Servicios />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Testimonios />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Portafolio />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <LogosClientes />
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <ReservarLlamada />
        </ErrorBoundary>
      </main>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Footer />
      </ErrorBoundary>
    </div>
  )
}
