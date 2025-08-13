"use client";

import Link from "next/link";
import { HomeIcon, BarChartIcon, PersonIcon, GearIcon } from "@radix-ui/react-icons";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg p-4">
      <h2 className="text-2xl font-bold text-orange-500 mb-6">Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/dashboard" className="flex items-center gap-2 hover:text-orange-500">
          <HomeIcon /> Inicio
        </Link>
        <Link href="/dashboard/analytics" className="flex items-center gap-2 hover:text-orange-500">
          <BarChartIcon /> Analíticas
        </Link>
        <Link href="/dashboard/users" className="flex items-center gap-2 hover:text-orange-500">
          <PersonIcon /> Usuarios
        </Link>
        <Link href="/dashboard/settings" className="flex items-center gap-2 hover:text-orange-500">
          <GearIcon /> Configuración
        </Link>
      </nav>
    </aside>
  );
}
