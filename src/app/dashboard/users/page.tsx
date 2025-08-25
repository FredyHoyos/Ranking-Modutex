"use client";

import React, { useState, useEffect } from "react";
import TablaOperarios from "@/app/component/TablaOperarios";
import ModalOperario from "@/app/component/ModalOperario";
import ModalEditarOperario from "@/app/component/ModalEditarOperario";
import { toast } from "react-toastify";

// ✅ Tipo para la UI (tabla y modales)
interface OperarioUI {
  id: number;
  nombre: string;
  numeroId: string;
  porcentaje: number;
  username: string;
}

// ✅ Tipo que viene del backend
interface OperarioBackend {
  id: number;
  numeroId: string;
  porcentaje: number;
  user: {
    name: string;
    username: string;
  };
}

export default function PageOperarios() {
  const [operarios, setOperarios] = useState<OperarioUI[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOperario, setSelectedOperario] = useState<OperarioUI | null>(null);

  // 🔹 Obtener todos los operarios
  const fetchOperarios = async () => {
    try {
      const res = await fetch("/api/operarios");
      const data: OperarioBackend[] = await res.json();

      // 🔹 Transformar datos para que coincidan con la interfaz de la UI
      const formatted: OperarioUI[] = data.map((op) => ({
        id: op.id,
        numeroId: op.numeroId,
        porcentaje: op.porcentaje,
        nombre: op.user.name,
        username: op.user.username,
      }));

      setOperarios(formatted);
    } catch (error) {
      toast.error("Error cargando operarios");
    }
  };

  // 🔹 Eliminar operario
  const eliminarOperario = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar este operario?")) return;

    const toastId = toast.loading("Eliminando operario...");
    try {
      const res = await fetch(`/api/operarios/${id}`, { method: "DELETE" });
      if (!res.ok) {
        toast.update(toastId, { render: "Error eliminando operario", type: "error", isLoading: false, autoClose: 3000 });
        return;
      }
      fetchOperarios();
      toast.update(toastId, { render: "Operario eliminado con éxito", type: "success", isLoading: false, autoClose: 3000 });
    } catch {
      toast.update(toastId, { render: "No se pudo eliminar el operario", type: "error", isLoading: false, autoClose: 3000 });
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
          className="mb-4 px-5 py-3 bg-secondary text-white rounded-lg hover:bg-blue-600"
        >
          ➕ Agregar operario
        </button>
      </div>

      <TablaOperarios
        data={operarios}
        onEdit={(op) => {
          setSelectedOperario(op); // ya está en el formato de la UI
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
