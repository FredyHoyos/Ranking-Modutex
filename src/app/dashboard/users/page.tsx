"use client";

import React, { useState, useEffect } from "react";
import TablaOperarios from "@/app/component/TablaOperarios";
import ModalOperario from "@/app/component/ModalOperario";
import ModalEditarOperario from "@/app/component/ModalEditarOperario";

interface Operario {
  id: number;
  nombre: string;
  numeroId: string;
  porcentaje: number;
  username: string;
  password: string;
}

export default function PageOperarios() {
  const [operarios, setOperarios] = useState<Operario[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOperario, setSelectedOperario] = useState<Operario | null>(null);

  // 🔹 Obtener todos los operarios
  const fetchOperarios = async () => {
    try {
      const res = await fetch("/api/operarios");
      const data = await res.json();
      setOperarios(data);
    } catch (error) {
      console.error("Error cargando operarios:", error);
    }
  };

  // 🔹 Eliminar operario
  const eliminarOperario = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar este operario?")) return;

    try {
      const res = await fetch(`/api/operarios/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error eliminando operario");
      fetchOperarios();
    } catch (error) {
      console.error(error);
      alert("No se pudo eliminar el operario");
    }
  };

  // 🔹 Editar porcentaje u otros campos
  const actualizarOperario = async (id: number, updates: Partial<Operario>) => {
    try {
      const res = await fetch(`/api/operarios/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Error actualizando operario");

      fetchOperarios(); // refrescar lista
    } catch (error) {
      console.error(error);
      alert("No se pudo actualizar el operario");
    }
  };

  useEffect(() => {
    fetchOperarios();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between md:items-center mb-6 md:flex-row flex-col items-start">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">Operarios</h1>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          ➕ Agregar operario
        </button>
      </div>

      <TablaOperarios
        data={operarios}
        onEdit={(op) => {
          setSelectedOperario(op);
          setIsEditModalOpen(true);
        }}
        onDelete={eliminarOperario}
      />

      <ModalOperario
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={fetchOperarios}
      />

      <ModalEditarOperario
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSaved={fetchOperarios}
        operarioData={selectedOperario}
      />
    </div>
  );
}
