import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CardAnalytics } from "@/components/Card-Analytic";
import RecentComments from "@/components/RecentComments";
import SavedRecipeLeaderboard from "@/components/RecentSaved.";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/");

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <CardAnalytics />
      <div className="grid px-5 grid-cols-1 md:grid-cols-2 gap-3">
        <SavedRecipeLeaderboard />
        <RecentComments />
      </div>
    </div>
  );
}
