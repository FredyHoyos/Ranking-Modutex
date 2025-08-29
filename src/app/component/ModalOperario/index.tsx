"use client";

import React, { useState } from "react";
import {toast } from 'react-toastify';
import * as Yup from "yup";
import { ValidationError } from "yup";

interface ModalOperarioProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void; // ✅ para recargar lista
}

  const schema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es obligatorio"),
  numeroId: Yup.string().required("El número de identificación es obligatorio"),
  porcentaje: Yup.number()
    .required("El porcentaje es obligatorio")
    .min(0, "El porcentaje no puede ser menor a 0")
    .max(100, "El porcentaje no puede ser mayor a 100"),
  username: Yup.string().required("El usuario es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
});

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});



  const handleSubmit = async () => {

    try {
            setErrors({}); // resetear errores
    // Validar campos obligatorios
            await schema.validate(
          {
            nombre,
            numeroId,
            porcentaje: Number(porcentaje) || 0,
            username,
            password,
          },
          { abortEarly: false }
        );

      const res = await fetch("/api/operarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          numeroId,
          porcentaje: Number(porcentaje),
          username,
          password, // ⚠️ sin encriptar
        }),
      });

      if (!res.ok) {
                toast.error("Error actualizando operario.");
                return;
              }
      toast.success("Operario guardado con éxito");

      onSaved(); // ✅ refrescar lista
      onClose(); // cerrar modal
      setNombre("");
      setNumeroId("");
      setPorcentaje("");
      setUsername("");
      setPassword("");
    } catch (err: unknown) {
        if (err instanceof ValidationError) {
          const newErrors: { [key: string]: string } = {};
          err.inner.forEach((e: ValidationError) => {
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
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
            )}
            
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
            {errors.numeroId && (
              <p className="text-red-500 text-xs mt-1">{errors.numeroId}</p>
            )}
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
            {errors.porcentaje && (
              <p className="text-red-500 text-xs mt-1">{errors.porcentaje}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usuario*
            </label>
            <input
              type="text"
              value={username}
              placeholder="operario"
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 rounded w-full"
              autoComplete="off"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña*
            </label>
            <input
              type="password"
              value={password}
              placeholder="******"
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded w-full"
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
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
