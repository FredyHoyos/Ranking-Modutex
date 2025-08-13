"use client";

import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { EnvelopeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";

// ✅ Esquema de validación con Yup
const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo inválido")
    .required("El correo es obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener mínimo 6 caracteres")
    .required("La contraseña es obligatoria"),
});

export default function SigninForm() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex justify-center p-6 rounded-2xl items-center bg-gradient-to-br from-orange-100 to-yellow-200">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SigninSchema}
        onSubmit={async (values) => {
          setIsLoading(true);

          await signIn("credentials", {
            redirect: true,
            email: values.email,
            password: values.password,
            callbackUrl: `${window.location.origin}/dashboard`,
          });

          setIsLoading(false);
        }}
      >
        {({ handleChange, handleBlur, values }) => (
          <Form className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-100">
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
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
              />
            </div>
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs mt-1"
            />

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
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
              />
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-xs mt-1"
            />

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
          </Form>
        )}
      </Formik>
    </div>
  );
}
