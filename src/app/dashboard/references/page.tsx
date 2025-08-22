"use client";

import React, { useState, useEffect } from "react";
import TablaReferencias from "@/app/component/TablaReferencias";
import Link from "next/link";

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

export default function PageReferencias() {
  const [referencias, setReferencias] = useState<Referencia[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReferencias = async () => {
    try {
      const res = await fetch("/api/referencias");
      if (!res.ok) throw new Error("Error al obtener referencias");
      const data = await res.json();
      setReferencias(data);
    } catch (error) {
      console.error("Error cargando referencias:", error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarReferencia = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar esta referencia?")) return;
    try {
      const res = await fetch(`/api/referencias/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error eliminando referencia");
      fetchReferencias();
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar la referencia");
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
      fetchReferencias();
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar el estado");
    }
  };

  useEffect(() => {
    fetchReferencias();
  }, []);

  if (loading) return <p className="p-6">Cargando...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-orange-600">Referencias</h1>

        {/* 🚀 Ahora redirige a la page de creación */}
        <Link
          href="/dashboard/references/new"
          className="px-5 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          ➕ Agregar referencia
        </Link>
      </div>

      <TablaReferencias
        data={referencias}
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
