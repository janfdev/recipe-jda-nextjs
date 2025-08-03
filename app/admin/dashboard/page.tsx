import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import RecentComments from "@/components/admin/RecentComments";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/");

  const [totalRecipes, totalComments, totalCategories] = await Promise.all([
    prisma.recipe.count(),
    prisma.comment.count(),
    prisma.category.count()
  ]);

  const recipeStats = [
    { name: "Total Resep", value: totalRecipes },
    { name: "Total Komentar", value: totalComments },
    { name: "Total Kategori", value: totalCategories }
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid gap-4 md:grid-cols-3 grid-cols-1">
        {recipeStats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.value.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <RecentComments />
    </div>
  );
}
