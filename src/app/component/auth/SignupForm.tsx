'use client'
import React, { useState } from 'react'
import { EnvelopeClosedIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import axios from 'axios'

// 📌 Definimos el esquema de validación con Yup
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .min(2, 'El nombre debe tener mínimo 2 caracteres'),
  email: Yup.string()
    .email('Correo inválido')
    .required('El correo es obligatorio'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener mínimo 6 caracteres')
    .required('La contraseña es obligatoria'),
})

interface SignupFormInputs {
  name: string
  email: string
  password: string
}

export default function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: yupResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      const res = await axios.post('/api/auth/register', data)
      console.log('Registro exitoso:', res.data)
    } catch (error) {
      console.error('Error al registrar:', error)
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <div className="flex justify-center p-6 rounded-2xl items-center bg-gradient-to-br from-orange-100 to-yellow-200">
      <form
        onSubmit={onSubmit}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Registrarse
        </h2>

        {/* Nombre */}
        <label htmlFor="name" className="text-gray-700 font-medium">
          Nombre
        </label>
        <div className="relative mt-1">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Escribe tu nombre"
                autoComplete="name"
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
              />
            )}
          />
          <PersonIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}

        {/* Email */}
        <label
          htmlFor="email"
          className="text-gray-700 font-medium mt-4 block"
        >
          Correo
        </label>
        <div className="relative mt-1">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="email"
                placeholder="email@domain.com"
                autoComplete="email"
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
              />
            )}
          />
          <EnvelopeClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}

        {/* Password */}
        <label
          htmlFor="password"
          className="text-gray-700 font-medium mt-4 block"
        >
          Contraseña
        </label>
        <div className="relative mt-1">
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="password"
                placeholder="********"
                autoComplete="current-password"
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none"
              />
            )}
          />
          <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">
            {errors.password.message}
          </p>
        )}

        {/* Botón */}
        <button
          type="submit"
          disabled={isLoading}
          className={`cursor-pointer w-full mt-6 py-2 px-4 rounded-lg font-semibold text-white transition-all ${
            isLoading
              ? 'bg-orange-300 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 shadow-md hover:shadow-lg'
          }`}
        >
          {isLoading ? 'Cargando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  )
}
