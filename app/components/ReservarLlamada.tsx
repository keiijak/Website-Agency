"use client"

export default function ReservarLlamada() {
  const calendlyUrl =
    "https://calendly.com/keiijakvisuals/30min?background_color=f5f5f5&text_color=1a1a1a&primary_color=e50914"

  return (
    <section id="reservar-llamada" className="py-20 bg-[#1A1A1A] text-[#F5F5F5]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-7xl md:text-8xl font-extrabold mb-6 tracking-tight leading-tight">
          ¿Listo para Elevar tu Contenido?
        </h2>

        <p className="text-xl mb-8">
          Completa este breve formulario para ayudarnos a entender mejor tus necesidades antes de agendar una llamada.
        </p>

        <div className="mx-auto max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLScQj7tHdbdJ5OEORGfuY_q5I4x3pmR8V4pCmEDtXg_LnuRK0A/viewform?embedded=true"
            width="100%"
            height="700"
            frameBorder="0"
            className="block w-full"
          >
            Cargando formulario...
          </iframe>
        </div>

        <div className="mt-12 p-8 bg-[#E50914] text-[#F5F5F5] rounded-lg max-w-4xl mx-auto shadow-xl animate-pulse">
          <p className="font-bold text-2xl mb-4">¡IMPORTANTE! DESPUÉS DE ENVIAR EL FORMULARIO:</p>
          <p className="font-medium text-xl mb-6">
            Haz clic en el botón de abajo para agendar tu llamada de descubrimiento
          </p>
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#E50914] px-10 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            AGENDAR MI LLAMADA AHORA →
          </a>
        </div>

        <div className="mt-8 text-sm opacity-70">
          <p>
            Nota: Si tienes problemas con el formulario, por favor contáctanos directamente a keiijakvisuals@gmail.com
          </p>
        </div>
      </div>
    </section>
  )
}
