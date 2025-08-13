"use client";
import React, { useState } from "react"
import ToggleText from "@/app/component/molecule/ToggleText"
import SignIn from '@/app/auth/Login/page'
import SignUp from '@/app/auth/Register/page'
export default function Home() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  }

  return (
    <div
      className="h-screen w-screen bg-cover bg-center"
    >
      <div className="h-full w-full flex flex-col justify-center items-center lg:ml-20 lg:max-w-sm">
        <p className="!text-fuchsia-600 text-4xl font-bold text-center">
          Bienvenid@
        </p>
        <div className="lg:mb-15 w-full max-w-xl flex flex-col items-center my-10 lg:my-0">
          {isSignUp ? <SignUp /> : <SignIn />}
          <ToggleText
            toggleForm={toggleForm}
            isSignUp={isSignUp}
          />
        </div>
      </div>
    </div>
  )
}