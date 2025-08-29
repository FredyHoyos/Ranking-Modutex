"use client";

import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import {toast } from 'react-toastify';
import { ValidationError } from "yup";


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

interface OperarioUpdate {
  nombre: string;
  numeroId: string;
  porcentaje: number;
  username: string;
  password?: string;
}

const schema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es obligatorio"),
  numeroId: Yup.string().required("El número de ID es obligatorio"),
  porcentaje: Yup.number()
    .typeError("El porcentaje debe ser un número")
    .min(0, "El porcentaje no puede ser menor que 0")
    .max(100, "El porcentaje no puede ser mayor que 100")
    .required("El porcentaje es obligatorio"),
  username: Yup.string().required("El usuario es obligatorio"),
  password: Yup.string(), // opcional
});

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (operarioData) {
      setNombre(operarioData.nombre);
      setNumeroId(operarioData.numeroId);
      setPorcentaje(operarioData.porcentaje.toString());
      setUsername(operarioData.username);
      setPassword(""); // ⚠️ siempre vacío
      setErrors({});
    }
  }, [operarioData]);

  const handleSubmit = async () => {
      try {
        setErrors({}); // resetear errores

        // validar antes de enviar
        await schema.validate(
          {
            nombre,
            numeroId,
            porcentaje: Number(porcentaje),
            username,
            password,
          },
          { abortEarly: false }
        );

        // Construir objeto de actualización
        const updates: OperarioUpdate = {
          nombre,
          numeroId,
          porcentaje: Number(porcentaje) || 0,
          username,
        };

        if (password.trim() !== "") {
          updates.password = password;
        }

        let res: Response;
        try {
          res = await fetch(`/api/operarios/${operarioData?.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updates),
          });
        } catch {
          toast.error("Error al conectar con el servidor.");
          return;
        }

        if (!res.ok) {
          toast.error("Error actualizando operario.");
          return;
        }

        toast.success("Operario actualizado con éxito");
        onSaved();
        onClose();
      } catch (err) {
        if (err instanceof ValidationError) {
          const newErrors: { [key: string]: string } = {};
          err.inner.forEach((e) => {
            if (e.path) newErrors[e.path] = e.message;
          });
          setErrors(newErrors);
        } else {
          console.error(err);
          toast.error("Error guardando operario.");
        }
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
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
            )}
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
            {errors.numeroId && (
              <p className="text-red-500 text-sm mt-1">{errors.numeroId}</p>
            )}
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
            {errors.porcentaje && (
              <p className="text-red-500 text-sm mt-1">{errors.porcentaje}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usuario*
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="operario"
              className="border p-2 rounded w-full"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
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
