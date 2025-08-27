"use client";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function IdleLogout({ timeout = 15 * 60 * 1000 }) {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        signOut(); // Cierra sesión automáticamente
      }, timeout);
    };

    // Eventos que reinician el temporizador
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    resetTimer(); // inicial

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [timeout]);

  return null;
}