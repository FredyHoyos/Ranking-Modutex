"use client";

import React, { useState } from "react";

interface ModalReferenciaProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void; // ✅ ya no opcional
}

export default function ModalReferencia({ isOpen, onClose, onSaved }: ModalReferenciaProps) {
  const [referencia, setReferencia] = useState("");
  const [op, setOp] = useState("");
  const [operaciones, setOperaciones] = useState("");
  const [tiempo, setTiempo] = useState("");

  const handleSubmit = async () => {
    if (!referencia || !operaciones || !tiempo) {
      alert("Todos los campos obligatorios deben ser mayores a 0");
      return;
    }

    try {
      const res = await fetch("/api/referencias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referencia: parseInt(referencia),
          op: parseInt(op) || 0,
          operaciones: parseInt(operaciones),
          tiempo: parseFloat(tiempo),
        }),
      });

      if (!res.ok) throw new Error("Error al guardar");

      onSaved(); // ✅ recargar lista
      onClose(); // cerrar modal
      setReferencia("");
      setOp("");
      setOperaciones("");
      setTiempo("");
    } catch (error) {
      console.error("Error guardando referencia:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-orange-600">Agregar Referencia</h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Referencia*</label>
            <input
              type="number"
              value={referencia}
              placeholder="3456683"
              onChange={(e) => setReferencia(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">OP</label>
            <input
              type="number"
              value={op}
              placeholder="000000"
              onChange={(e) => setOp(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Número de operaciones*</label>
            <input
              type="number"
              value={operaciones}
              placeholder="14"
              onChange={(e) => setOperaciones(e.target.value)}
              className="border p-2 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tiempo*</label>
            <input
              type="number"
              step="0.01"
              value={tiempo}
              placeholder="7.34"
              onChange={(e) => setTiempo(e.target.value)}
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
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}
