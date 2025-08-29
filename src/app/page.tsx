"use client";
import SignIn from "@/app/auth/Login/page";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-pink-100 via-orange-100 to-rose-200">
      <main className="flex flex-col md:flex-row items-center justify-start flex-grow w-full px-6 md:px-14">
        
                {/* 📌 Logo */}
        <div className="md:w-1/2 flex justify-center items-center p-7">
          <Image
            src="/modutex.png"
            alt="Modutex Logo"
            width={900}
            height={100}
            className="max-w-xs md:max-w-full h-auto object-contain"
            priority
          />
        </div>
        
        {/* 📌 Login */}
        <div className="flex justify-center items-center w-full md:w-1/2 mt-6 md:mt-0">
          <div className="w-full max-w-md">
            <SignIn />
          </div>
        </div>
      </main>

      {/* 📌 Footer */}
      <footer className="text-sm bg-white/40 backdrop-blur-md border border-white/50 shadow-md rounded-lg p-3 text-center">
        © {new Date().getFullYear()} <span className="font-bold">Modutex</span>. Hecho por Fredy Hoyos.
      </footer>
    </div>
  );
}
