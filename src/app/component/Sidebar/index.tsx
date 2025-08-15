"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HomeIcon, BarChartIcon, PersonIcon, GearIcon, Link2Icon, HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón hamburguesa visible solo en móvil */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-orange-500 text-white rounded shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <Cross1Icon className="w-6 h-6"/> : <HamburgerMenuIcon className="w-6 h-6"/>}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white shadow-lg p-4 z-40 pt-16
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:block
        `}
      >
        <h2 className="text-2xl font-bold text-orange-500 mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 hover:text-orange-500" onClick={() => setIsOpen(false)}>
            <HomeIcon /> Inicio
          </Link>
          <Link href="/dashboard/analytics" className="flex items-center gap-2 hover:text-orange-500" onClick={() => setIsOpen(false)}>
            <BarChartIcon /> Analíticas
          </Link>
          <Link href="/dashboard/users" className="flex items-center gap-2 hover:text-orange-500" onClick={() => setIsOpen(false)}>
            <PersonIcon /> Operarios
          </Link>
          <Link href="/dashboard/references" className="flex items-center gap-2 hover:text-orange-500" onClick={() => setIsOpen(false)}>
            <Link2Icon /> Referencias
          </Link>
          <Link href="/dashboard/settings" className="flex items-center gap-2 hover:text-orange-500" onClick={() => setIsOpen(false)}>
            <GearIcon /> Configuración
          </Link>
        </nav>
      </aside>

      {/* Fondo oscuro al abrir en móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
