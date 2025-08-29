"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { TrashIcon } from "@radix-ui/react-icons";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface Operacion {
  nombre: string;
  tiempo: number | "";
  precio: number | "";
  maquina: string;
}

export default function EditarReferenciaPage() {
  const router = useRouter();
  const params = useParams(); // 👈 obtiene el id de la URL
  const id = params?.id as string;

  const [referencia, setReferencia] = useState("");
  const [op, setOp] = useState("");
  const [tiempo, setTiempo] = useState("");
  const [precio, setPrecio] = useState("");
  const [operaciones, setOperaciones] = useState<Operacion[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos al montar
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/referencias/${id}`);
      const data = await res.json();

      setReferencia(String(data.referencia));
      setOp(String(data.op));
      setTiempo(String(data.tiempo));
      setPrecio(String(data.precio));
      setOperaciones(data.operaciones || []);
      setLoading(false);
    };

    if (id) fetchData();
  }, [id]);

  const addOperacion = () =>
    setOperaciones([...operaciones, { nombre: "", tiempo: "", precio: "", maquina: "" }]);

  const removeOperacion = (i: number) =>
    setOperaciones(operaciones.filter((_, idx) => idx !== i));

  const updateOperacion = (
    i: number,
    field: keyof Operacion,
    value: string
  ) => {
    const nuevas = [...operaciones];
    if (field === "tiempo" || field === "precio") {
      nuevas[i][field] = value === "" ? "" : Number(value);
    } else {
      nuevas[i][field] = value;
    }
    setOperaciones(nuevas);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      referencia: Number(referencia),
      op: Number(op),
      tiempo: Number(tiempo),
      precio: Number(precio),
      operaciones,
    };

    
  try {
      const res = await fetch(`/api/referencias/${id}`, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "No se pudo actualizar la referencia");
      }

      toast.success("Referencia actualizada con éxito");
      await mutate("/api/referencias");

      router.push("/dashboard/references");
    } catch (error: unknown) {
      toast.error(
        typeof error === "object" && error !== null && "message" in error
          ? String((error as { message?: string }).message)
          : "Error al actualizar la referencia"
      );
    }
  };

  if (loading) return <p className="p-6">Cargando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Editar Referencia</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <input
            value={referencia}
            onChange={(e) => setReferencia(e.target.value)}
            placeholder="Referencia"
            className="border p-2 rounded-md"
            required
          />
          <input
            value={op}
            onChange={(e) => setOp(e.target.value)}
            placeholder="OP"
            className="border p-2 rounded-md"
            required
          />
          <input
            value={tiempo}
            onChange={(e) => setTiempo(e.target.value)}
            placeholder="Tiempo de Referencia (min)"
            type="number"
            className="border p-2 rounded-md"
            required
          />
        </div>

        <div>
          <h2 className="font-semibold mb-2">Operaciones</h2>
          <div className="flex gap-32 font-medium mb-2">
            <h2>Nombre Operación*</h2>
            <h2>Tiempo (min)*</h2>
            <h2>Precio*</h2>
            <h2>Máquina</h2>
          </div>
          {operaciones.map((operacion, i) => (
            <div key={i} className="flex flex-wrap gap-2 mb-2">
              <input
                value={operacion.nombre}
                onChange={(e) => updateOperacion(i, "nombre", e.target.value)}
                placeholder={`Operación ${i + 1}`}
                className="border p-2 rounded-md"
                required
              />
              <input
                type="number"
                value={operacion.tiempo}
                onChange={(e) => updateOperacion(i, "tiempo", e.target.value)}
                placeholder="Tiempo (min)"
                className="border p-2 rounded-md"
                required
              />
              <input
                type="number"
                value={operacion.precio}
                onChange={(e) => updateOperacion(i, "precio", e.target.value)}
                placeholder="Precio"
                className="border p-2 rounded-md"
                required
              />
              <input
                value={operacion.maquina}
                onChange={(e) => updateOperacion(i, "maquina", e.target.value)}
                placeholder="Máquina"
                className="border p-2 rounded-md"
              />
              <button
                type="button"
                onClick={() => removeOperacion(i)}
                className="p-2 text-red-600 hover:bg-red-100 rounded flex items-center justify-center"
                title="Eliminar operación"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addOperacion}
            className="cursor-pointer bg-secondary text-white px-4 py-1 rounded"
          >
            + Agregar Operación
          </button>
        </div>

        <button
          type="submit"
          className="cursor-pointer bg-primary text-white px-4 py-2 rounded"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
