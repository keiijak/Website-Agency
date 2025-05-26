export default function Resultados() {
  const estadisticas = [
    { etiqueta: "Visualizaciones en Plataformas", valor: "15M+" },
    { etiqueta: "Seguidores Generados", valor: "50K+" },
    { etiqueta: "Clientes Atendidos", valor: "100+" },
    { etiqueta: "Piezas de Contenido Creadas", valor: "2,000+" },
  ]

  return (
    <section id="resultados" className="py-20 bg-[#1E1E1E]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-[#F5F5F5]">
          Nuestros Resultados Hablan por Sí Mismos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4">
          {estadisticas.map((estadistica, index) => (
            <div
              key={index}
              className="bg-[#E50914] p-6 rounded-lg shadow-lg text-center transform transition-transform hover:scale-105 duration-300 group cursor-pointer"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:scale-110 relative">
                <span className="relative inline-block animate-float">{estadistica.valor}</span>
              </div>
              <div className="text-base md:text-lg font-medium text-[#F0F0F0] transition-all duration-300 group-hover:text-white text-center">
                {estadistica.etiqueta}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
