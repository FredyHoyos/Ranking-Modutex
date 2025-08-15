"use client";

import React from "react";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

interface Referencia {
  id: number;
  referencia: number;
  op: number;
  operaciones: number;
  tiempo: number;
}

interface TablaReferenciasProps {
  data: Referencia[];
  onEdit: (ref: Referencia) => void;
  onDelete: (id: number) => void;
}

export default function TablaReferencias({ data, onEdit, onDelete }: TablaReferenciasProps) {
  if (data.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg text-center text-gray-500">
        No hay referencias registradas.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-orange-500 text-white text-sm uppercase tracking-wider">
            <th className="p-3 text-left">Referencia</th>
            <th className="p-3 text-left">OP</th>
            <th className="p-3 text-center"># Operaciones</th>
            <th className="p-3 text-center">Tiempo (min)</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((ref) => (
            <tr
              key={ref.id}
              className="border-b hover:bg-orange-50 transition-colors"
            >
              <td className="p-3">{ref.referencia}</td>
              <td className="p-3">{ref.op}</td>
              <td className="p-3 text-center">{ref.operaciones}</td>
              <td className="p-3 text-center">{ref.tiempo.toFixed(2)}</td>
              <td className="p-3 text-center flex justify-center gap-3">
                <button
                  onClick={() => onEdit(ref)}
                  className="cursor-pointer p-2 rounded hover:bg-orange-100 text-orange-600"
                  title="Editar"
                >
                  <Pencil1Icon className="w-6 h-6" />
                </button>
                <button
                  onClick={() => onDelete(ref.id)}
                  className="cursor-pointer p-2 rounded hover:bg-red-100 text-red-600"
                  title="Eliminar"
                >
                  <TrashIcon className="w-6 h-6" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
