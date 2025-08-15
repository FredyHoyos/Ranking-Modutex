
// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";

export default async function DashboardPage() {
  // opcional: verificar sesión
  const session = await getServerSession(authOptions);
  if (!session) return <p>Acceso no autorizado</p>;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Bienvenido, {session.user?.name}</p>
    </div>
  );
}
