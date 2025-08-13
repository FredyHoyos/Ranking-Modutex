"use client";

import { useSession, signOut } from "next-auth/react";
import { ExitIcon } from "@radix-ui/react-icons";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
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
              className="flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600 transition"
            >
              <ExitIcon /> Salir
            </button>
          </>
        )}
      </div>
    </header>
  );
}
