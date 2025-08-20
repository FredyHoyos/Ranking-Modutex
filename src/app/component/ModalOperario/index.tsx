"use client";

import React, { useState } from "react";

interface ModalOperarioProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void; // ✅ para recargar lista
}

export default function ModalOperario({
  isOpen,
  onClose,
  onSaved,
}: ModalOperarioProps) {
  const [nombre, setNombre] = useState("");
  const [numeroId, setNumeroId] = useState("");
  const [porcentaje, setPorcentaje] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!nombre || !numeroId || !username || !password) {
      alert("Todos los campos obligatorios deben ser completados");
      return;
    }

    try {
      const res = await fetch("/api/operarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          numeroId,
          porcentaje: parseInt(porcentaje) || 0,
          username,
          password, // ⚠️ sin encriptar
        }),
      });

      if (!res.ok) throw new Error("Error al guardar operario");

      onSaved(); // ✅ refrescar lista
      onClose(); // cerrar modal
      setNombre("");
      setNumeroId("");
      setPorcentaje("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error guardando operario:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-blue-600">
          Agregar Operario
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre*
            </label>
            <input
              type="text"
              value={nombre}
              placeholder="Juan Pérez"
              onChange={(e) => setNombre(e.target.value)}
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
              placeholder="123456789"
              onChange={(e) => setNumeroId(e.target.value)}
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
              placeholder="0"
              onChange={(e) => setPorcentaje(e.target.value)}
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
              placeholder="joperario"
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña*
            </label>
            <input
              type="text"
              value={password}
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
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
