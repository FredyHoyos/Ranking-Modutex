export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[url('/hilo.png')] h-screen w-screen bg-cover bg-center">
      <div className="h-full w-full flex flex-col justify-center items-center">
        <p className="!text-fuchsia-900 text-4xl font-bold text-center bg-amber-500/60 backdrop-blur-md border border-white shadow-lg rounded-lg p-4">
          Bienvenid@
        </p>

        <div className="lg:mb-15 w-full max-w-xl flex flex-col items-center my-10 lg:my-0">
          {children}
        </div>

        <footer className="text-sm mt-4 bg-white/30 backdrop-blur-md border border-white/40 shadow-lg rounded-lg p-4 text-center">
          © {new Date().getFullYear()} Modutex. Hecho por Fredy Hoyos.
        </footer>
      </div>
    </div>
  );
}
