import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div>
      <h1>Welcome Admin</h1>
      <p>Email: {session.user?.email}</p>
      <p>Name: {session.user?.name}</p>
    </div>
  );
}
