export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-sm text-gray-600">
          julianmcancelo@gmail.com
        </span>
        <p className="text-sm text-gray-700 text-center">
          Julián Manuel Cancelo · Lanús, Buenos Aires · 2026
        </p>
        <span className="font-mono text-sm text-gray-600">
          Diseñado y construido por mí.
        </span>
      </div>
    </footer>
  )
}
