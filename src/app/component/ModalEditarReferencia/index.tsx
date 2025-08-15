"use client";

import React, { useState, useEffect } from "react";

interface ModalEditarReferenciaProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  referenciaData: {
    id: number;
    referencia: number;
    op: number;
    operaciones: number;
    tiempo: number;
  } | null;
}

export default function ModalEditarReferencia({
  isOpen,
  onClose,
  onSaved,
  referenciaData,
}: ModalEditarReferenciaProps) {
  const [referencia, setReferencia] = useState("");
  const [op, setOp] = useState("");
  const [operaciones, setOperaciones] = useState("");
  const [tiempo, setTiempo] = useState("");

  useEffect(() => {
    if (referenciaData) {
      setReferencia(referenciaData.referencia.toString());
      setOp(referenciaData.op.toString());
      setOperaciones(referenciaData.operaciones.toString());
      setTiempo(referenciaData.tiempo.toString());
    }
  }, [referenciaData]);

  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/referencias/${referenciaData?.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referencia: parseInt(referencia),
          op: parseInt(op) || 0,
          operaciones: parseInt(operaciones),
          tiempo: parseFloat(tiempo),
        }),
      });

      if (!res.ok) throw new Error("Error actualizando referencia");

      onSaved(); // refrescar lista
      onClose(); // cerrar modal
    } catch (error) {
      console.error(error);
      alert("Error guardando referencia");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-orange-600">
          Editar Referencia
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="number"
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
            placeholder="Referencia"
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            value={op}
            onChange={(e) => setOp(e.target.value)}
            placeholder="OP"
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            value={operaciones}
            onChange={(e) => setOperaciones(e.target.value)}
            placeholder="Número de operaciones"
            className="border p-2 rounded w-full"
          />
          <input
            type="number"
            step="0.01"
            value={tiempo}
            onChange={(e) => setTiempo(e.target.value)}
            placeholder="Tiempo"
            className="border p-2 rounded w-full"
          />
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
