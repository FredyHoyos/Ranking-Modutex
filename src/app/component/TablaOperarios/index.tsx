"use client";

import React from "react";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";

interface Operario {
  id: number;
  nombre: string;
  numeroId: string;
  porcentaje: number;
  username: string;
}

interface TablaOperariosProps {
  data: Operario[];
  onEdit: (op: Operario) => void;
  onDelete: (id: number) => void;
}

export default function TablaOperarios({
  data,
  onEdit,
  onDelete,
}: TablaOperariosProps) {
  if (data.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg text-center text-gray-500">
        No hay operarios registrados.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-primary text-white text-sm uppercase tracking-wider">
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Número ID</th>
            <th className="p-3 text-center">% de trabajo</th>
            <th className="p-3 text-left">Usuario</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((op) => (
            <tr
              key={op.id}
              className="border-b hover:bg-blue-50 transition-colors"
            >
              <td className="p-3">{op.nombre}</td>
              <td className="p-3">{op.numeroId}</td>
              <td className="p-3 text-center">{op.porcentaje}%</td>
              <td className="p-3">{op.username}</td>
              <td className="p-3 text-center flex justify-center gap-3">
                <button
                  onClick={() => onEdit(op)}
                  className="cursor-pointer p-2 rounded hover:bg-blue-100 text-blue-600"
                  title="Editar"
                >
                  <Pencil1Icon className="w-6 h-6" />
                </button>
                <button
                  onClick={() => onDelete(op.id)}
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
