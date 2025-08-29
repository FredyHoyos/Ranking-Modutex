"use client";

import React, { useState} from "react";
import TablaOperarios from "@/app/component/TablaOperarios";
import ModalOperario from "@/app/component/ModalOperario";
import ModalEditarOperario from "@/app/component/ModalEditarOperario";
import { toast } from "react-toastify";
import useSWR from "swr";


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

// 🔹 Fetcher para SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PageOperarios() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedOperario, setSelectedOperario] = useState<OperarioUI | null>(null);
  const [search, setSearch] = useState(""); 

    // ✅ SWR maneja cache automáticamente
  const { data, error, mutate } = useSWR<OperarioBackend[]>(
    "/api/operarios",
    fetcher,
    {
      revalidateOnFocus: false, // no refrescar al cambiar de pestaña
      dedupingInterval: Infinity, // cache "infinita"
      revalidateIfStale: false, // no refrescar solo por estar "viejo"
    }
  );

  // 🔹 Transformar datos solo si existen
  const operarios: OperarioUI[] =
    data?.map((op) => ({
      id: op.id,
      numeroId: op.numeroId,
      porcentaje: op.porcentaje,
      nombre: op.user.name,
      username: op.user.username,
    })) || [];


   // 🔹 Filtrar por nombre o numeroId
  const operariosFiltrados = operarios.filter(
    (op) =>
      op.nombre.toLowerCase().includes(search.toLowerCase()) ||
      op.numeroId.toLowerCase().includes(search.toLowerCase()) ||
      op.username.toLowerCase().includes(search.toLowerCase())
  );

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

      toast.success("Operario eliminado con éxito");
      //Invalida cache y vuelve a cargar
      mutate();

      toast.update(toastId, { render: "Operario eliminado con éxito", type: "success", isLoading: false, autoClose: 3000 });
    } catch {
      toast.update(toastId, { render: "No se pudo eliminar el operario", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

    if (error) return <div>Error cargando operarios</div>;
    if (!data) return <div>Cargando...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between md:items-center mb-6 md:flex-row flex-col items-start space-y-4">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">Operarios</h1>


        {/* 🔍 Input de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por nombre o número ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value.trimStart())}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />


        <button
          onClick={() => setIsModalOpen(true)}
          className="mb-4 px-5 py-3 bg-secondary text-white rounded-lg hover:bg-blue-600"
        >
          ➕ Agregar operario
        </button>
      </div>

      <TablaOperarios
        data={operariosFiltrados}
        onEdit={(op) => {
          setSelectedOperario(op); // ya está en el formato de la UI
          setIsEditModalOpen(true);
        }}
        onDelete={eliminarOperario}
      />

      <ModalOperario
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaved={() => mutate()}
      />

      <ModalEditarOperario
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSaved={() => mutate()}
        operarioData={selectedOperario}
      />
    </div>
  );
}
