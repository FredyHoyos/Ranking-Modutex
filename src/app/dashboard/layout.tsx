// src/app/dashboard/layout.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import Sidebar from "@/app/component/Sidebar";
import Navbar from "@/app/component/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-gray-100">
        {/* 📌 Sidebar */}
        <Sidebar />

        {/* 📌 Contenido principal */}
        <div className="flex flex-col flex-1">
          <Navbar />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SessionProvider>
  );
}
