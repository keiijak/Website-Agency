import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "KeiijaK - Creación de Contenido que Vende | Desarrollo de Marca Personal",
  description:
    "Ayudamos a desarrollar tu marca personal a través de la creación de contenido, generando prospectos potenciales para tu negocio. Servicios de video, estrategia y viralización.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
