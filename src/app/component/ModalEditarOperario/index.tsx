"use client";

import React, { useState, useEffect } from "react";

interface ModalEditarOperarioProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  operarioData: {
    id: number;
    nombre: string;
    numeroId: string;
    porcentaje: number;
    username: string;
  } | null;
}

export default function ModalEditarOperario({
  isOpen,
  onClose,
  onSaved,
  operarioData,
}: ModalEditarOperarioProps) {
  const [nombre, setNombre] = useState("");
  const [numeroId, setNumeroId] = useState("");
  const [porcentaje, setPorcentaje] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (operarioData) {
      setNombre(operarioData.nombre);
      setNumeroId(operarioData.numeroId);
      setPorcentaje(operarioData.porcentaje.toString());
      setUsername(operarioData.username);
      setPassword(""); // ⚠️ siempre vacío
    }
  }, [operarioData]);

  const handleSubmit = async () => {
    try {
      // Construir objeto de actualización
      const updates: any = {
        nombre,
        numeroId,
        porcentaje: parseInt(porcentaje) || 0,
        username,
      };

      // Solo incluir password si se escribió algo
      if (password.trim() !== "") {
        updates.password = password;
      }

      const res = await fetch(`/api/operarios/${operarioData?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Error actualizando operario");

      onSaved(); // refrescar lista
      onClose(); // cerrar modal
    } catch (error) {
      console.error(error);
      alert("Error guardando operario");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-blue-600">
          Editar Operario
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre*
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del operario"
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de ID*
            </label>
            <input
              type="text"
              value={numeroId}
              onChange={(e) => setNumeroId(e.target.value)}
              placeholder="123456"
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Porcentaje
            </label>
            <input
              type="number"
              value={porcentaje}
              onChange={(e) => setPorcentaje(e.target.value)}
              placeholder="0"
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usuario*
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="joperario"
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Dejar vacío para no cambiar"
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
