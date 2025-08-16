"use client";

import React, { useState, useEffect } from "react";
import TablaReferencias from "@/app/component/TablaReferencias";
import ModalReferencia from "@/app/component/ModalReferencia";
import ModalEditarReferencia from "@/app/component/ModalEditarReferencia";


interface Referencia {
  id: number;
  referencia: number;
  op: number;
  operaciones: number;
  tiempo: number;
  mostrar: boolean;
}

export default function PageReferencias() {
  const [referencias, setReferencias] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRef, setSelectedRef] = useState<Referencia | null>(null);

  const fetchReferencias = async () => {
    try {
      const res = await fetch("/api/referencias");
      const data = await res.json();
      setReferencias(data);
    } catch (error) {
      console.error("Error cargando referencias:", error);
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

    fetchReferencias(); // refresca la tabla
  } catch (error) {
    console.error(error);
    alert("No se pudo actualizar el estado");
  }
};


  useEffect(() => {
    fetchReferencias();
  }, []);

  return (
    <div className="p-6">
        <div className="flex justify-between md:items-center mb-6 md:flex-row flex-col items-start" >
            <h1 className="text-2xl font-bold mb-4 text-orange-600">Referencias</h1>

            <button
                onClick={() => setIsModalOpen(true)}
                className="mb-4 px-5 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
                ➕ Agregar referencia
            </button>
        </div>


      <TablaReferencias
      data={referencias}
      onEdit={(ref) => {
        setSelectedRef(ref);
        setIsEditModalOpen(true);
      }}
      onDelete={eliminarReferencia}
      onToggleMostrar={toggleMostrar} // 👈 acá
    />


      <ModalReferencia
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={fetchReferencias}
      />

      <ModalEditarReferencia
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSaved={fetchReferencias}
        referenciaData={selectedRef}
      />
    </div>
  );
}
