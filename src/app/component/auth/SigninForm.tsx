'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// 📌 Esquema de validación con Yup
const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
  password: Yup.string()
    .min(4, "La contraseña debe tener mínimo 4 caracteres")
    .required("La contraseña es obligatoria"),
});

interface SigninFormInputs {
  email: string;
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
      email: data.email,
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
    <div className="flex justify-center p-6 rounded-2xl items-center bg-gradient-to-br from-orange-100 to-yellow-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Inicia Sesión
        </h2>

        {/* 📧 Email */}
        <label htmlFor="email" className="text-gray-700 font-medium">
          Correo
        </label>
        <div className="relative mt-1">
          <EnvelopeClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            id="email"
            type="email"
            placeholder="email@domain.com"
            autoComplete="email"
            {...register("email")}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}

        {/* 🔒 Password */}
        <label
          htmlFor="password"
          className="text-gray-700 font-medium mt-4 block"
        >
          Contraseña
        </label>
        <div className="relative mt-1">
          <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            id="password"
            type="password"
            placeholder="********"
            autoComplete="current-password"
            {...register("password")}
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
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
              : "bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg"
          }`}
        >
          {isLoading ? "Cargando..." : "Iniciar Sesión"}
        </button>
      </form>
    </div>
  );
}
