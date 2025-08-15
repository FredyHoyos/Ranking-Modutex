'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { PersonIcon , LockClosedIcon } from "@radix-ui/react-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";


// 📌 Esquema de validación con Yup
const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .required("El nombre de usuario es obligatorio"),
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
    
    <div className="rounded-xl flex justify-center p-6 items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="led-border bg-white/50 backdrop-blur-md border border-white/40 shadow-lg rounded-lg p-4 text-center w-full max-w-md "
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Inicia Sesión
        </h2>

        {/* 📧 User */}
        <label htmlFor="user" className=" font-medium">
          Nombre de usuario
        </label>
        <div className="relative mt-1">
          <PersonIcon  className="absolute left-3 top-1/2 -translate-y-1/2 " />
          <input
            id="user"
            type="string"
            placeholder="Nombre de usuario"
            autoComplete="email"
            {...register("email")}
            className="w-full pl-10 pr-3 py-2 rounded-lg border  focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}

        {/* 🔒 Password */}
        <label
          htmlFor="password"
          className=" font-medium mt-4 block"
        >
          Contraseña
        </label>
        <div className="relative mt-1">
          <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 " />
          <input
            id="password"
            type="password"
            placeholder="********"
            autoComplete="current-password"
            {...register("password")}
            className="w-full pl-10 pr-3 py-2 rounded-lg border  focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
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
