import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "KeiijaK - Creación de Contenido que Vende | Desarrollo de Marca Personal",
  description:
    "Ayudamos a desarrollar tu marca personal a través de la creación de contenido, generando prospectos potenciales para tu negocio. Servicios de video, estrategia y viralización.",
  generator: "v0.dev",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-jack-png-0mdpDFdQco1iMsBVcne6vCHyophgZy.png",
    shortcut:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-jack-png-0mdpDFdQco1iMsBVcne6vCHyophgZy.png",
    apple: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-jack-png-0mdpDFdQco1iMsBVcne6vCHyophgZy.png",
  },
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
