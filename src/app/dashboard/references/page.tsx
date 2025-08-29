"use client";

import React, { useState} from "react";
import TablaReferencias from "@/app/component/TablaReferencias";
import Link from "next/link";
import { toast } from "react-toastify";
import useSWR from "swr";

interface Operacion {
  id: number;
  nombre: string;
  tiempo: number;
  maquina: string;
  referenciaId: number;
}

interface Referencia {
  id: number;
  referencia: number;
  op: number;
  operaciones: Operacion[];
  tiempo: number;
  mostrar: boolean;
}

// 🔹 Fetcher para SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PageReferencias() {
  const [search, setSearch] = useState(""); 

    // ✅ SWR maneja cache automáticamente
  const { data, error, mutate } = useSWR<Referencia[]>(
    "/api/referencias",
    fetcher,
    {
      revalidateOnFocus: false, // no refrescar al cambiar de pestaña
      dedupingInterval: Infinity, // cache "infinita"
      revalidateIfStale: false, // no refrescar solo por estar "viejo"
    }
  );

  // 🔹 Filtrar por nombre o numeroId
  const referenciasFiltrados = data?.filter(
    (re) =>
      re.referencia.toString().toLowerCase().includes(search.toLowerCase()) ||
      re.op.toString().toLowerCase().includes(search.toLowerCase()) 
  );


  const eliminarReferencia = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar esta referencia?")) return;
    try {
      const res = await fetch(`/api/referencias/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error eliminando referencia");

      toast.success("Referencia eliminada con éxito");

      mutate();

    } catch (error) {
      console.error(error);
      toast.error("No se pudo eliminar la referencia");
    }
  };

  const toggleMostrar = async (id: number, value: boolean) => {
    try {
      const res = await fetch(`/api/referencias/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mostrar: value }),
      });

      if (!res.ok) throw new Error("Error actualizando referencia");
      toast.success("Referencia actualizada con éxito");
      mutate();
    } catch{
      toast.error("No se pudo actualizar la referencia");
    }
  };

  if (error) return <div>Error cargando operarios</div>;
  if (!data) return <div>Cargando...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between md:items-center mb-6 md:flex-row flex-col items-start space-y-4">
        <h1 className="text-2xl font-bold text-orange-600">Referencias</h1>


        {/* 🔍 Input de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por referencia u op..."
          value={search}
          onChange={(e) => setSearch(e.target.value.trimStart())}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />


        {/* 🚀 Ahora redirige a la page de creación */}
        <Link
          href="/dashboard/references/new"
          className="px-5 py-3 bg-secondary text-white rounded-lg"
        >
          ➕ Agregar referencia
        </Link>
      </div>

      <TablaReferencias
        data={referenciasFiltrados ?? []}
        onEdit={(ref) => {
          // 🚀 En lugar de abrir modal, redirigimos a la page de edición
          window.location.href = `/dashboard/references/${ref.id}/edit`;
        }}
        onDelete={eliminarReferencia}
        onToggleMostrar={toggleMostrar}
      />
    </div>
  );
}
