"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { PersonIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// 📌 Esquema de validación con Yup
const SigninSchema = Yup.object().shape({
  name: Yup.string().required("El nombre de usuario es obligatorio"),
  password: Yup.string()
    .min(4, "La contraseña debe tener mínimo 4 caracteres")
    .required("La contraseña es obligatoria"),
});

interface SigninFormInputs {
  name: string;
  password: string;
}

export default function SigninForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormInputs>({
    resolver: yupResolver(SigninSchema),
  });

  const onSubmit = async (data: SigninFormInputs) => {
    setIsLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      name: data.name,
      password: data.password,
    });

    if (result?.error) {
      alert(result.error);
    } else if (result?.ok) {
      window.location.href = "/dashboard";
    }

    setIsLoading(false);
  };

  return (
    <div className="rounded-xl flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/60 backdrop-blur-md border border-pink-200 shadow-lg rounded-2xl p-6 text-center w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-500 mb-6">
          Inicia Sesión
        </h2>

        {/* 👤 Nombre de usuario */}
        <label htmlFor="name" className="font-medium text-gray-700">
          Nombre de usuario
        </label>
        <div className="relative mt-1">
          <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-600" />
          <input
            id="name"
            type="text"
            placeholder="Nombre de usuario"
            autoComplete="username"
            {...register("name")}
            className="w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-pink-400 focus:border-pink-400 outline-none"
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}

        {/* 🔒 Password */}
        <label htmlFor="password" className="font-medium mt-4 block text-gray-700">
          Contraseña
        </label>
        <div className="relative mt-1">
          <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500" />
          <input
            id="password"
            type="password"
            placeholder="********"
            autoComplete="current-password"
            {...register("password")}
            className="w-full pl-10 pr-3 py-2 rounded-lg border focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}

        {/* 🚀 Botón */}
        <button
          type="submit"
          disabled={isLoading}
          className={`cursor-pointer w-full mt-6 py-2 px-4 rounded-lg font-semibold text-white transition-all ${
            isLoading
              ? "bg-orange-300 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-600 to-orange-500 hover:from-pink-500 hover:to-orange-600 shadow-md hover:shadow-xl"
          }`}
        >
          {isLoading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
}
