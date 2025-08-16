"use client";

import { useSession, signOut } from "next-auth/react";
import { ExitIcon } from "@radix-ui/react-icons";

export default function Navbar() {
  const { data: session } = useSession();

  return (
  <header className="pl-16 bg-white shadow-md px-6 py-3 flex flex-col md:flex-row justify-between items-start">
      {/* 📌 Título o breadcrumb */}
      <h1 className="text-xl font-bold text-gray-800">Panel de Control</h1>

      {/* 📌 Usuario y logout */}
      <div className="flex items-center gap-4">
        {session?.user && (
          <>
            <span className="text-gray-600">
              Hola, <strong>{session.user.name || "Usuario"}</strong>
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="cursor-pointer flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600 transition hover:bg-amber-100 px-2 py-1 rounded"
            >
              <ExitIcon /> Salir
            </button>
          </>
        )}
      </div>
    </header>
  );
}
