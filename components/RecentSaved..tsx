import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { Card } from "./ui/card";

export default async function SavedRecipeLeaderboard() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/");

  // Urutkan berdasarkan banyaknya savedBy
  const recipes = await prisma.recipe.findMany({
    select: {
      id: true,
      title: true,
      image: true,
      category: { select: { name: true } },
      _count: { select: { savedBy: true, comments: true } }
    },
    orderBy: { savedBy: { _count: "desc" } }, // Prisma: orderBy relation count
    take: 5
  });

  return (
    <Card className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Top Saved Recipes</h1>
      <table className="w-full table-auto border-collapse text-sm">
        <thead className="text-left">
          <tr>
            <th className="border-b p-2">#</th>
            <th className="border-b p-2">Recipe</th>
            <th className="border-b p-2">Category</th>
            <th className="border-b p-2">Saved</th>
            <th className="border-b p-2">Comments</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map((r, i) => (
            <tr key={r.id}>
              <td className="border-b p-2">{i + 1}</td>
              <td className="border-b p-2">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-14 overflow-hidden rounded">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-medium">{r.title}</span>
                </div>
              </td>
              <td className="border-b p-2">{r.category?.name ?? "-"}</td>
              <td className="border-b p-2">{r._count.savedBy}</td>
              <td className="border-b p-2">{r._count.comments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
