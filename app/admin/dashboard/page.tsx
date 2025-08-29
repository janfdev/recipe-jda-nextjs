import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CardAnalytics } from "@/components/Card-Analytic";
import RecentComments from "@/components/RecentComments";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/");

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <CardAnalytics />
      <div className="px-4 lg:px-6">
        {/* <ChartAreaInteractive /> */}
        <RecentComments />
      </div>
    </div>
  );
}
