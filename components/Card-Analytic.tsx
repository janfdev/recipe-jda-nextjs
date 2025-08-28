import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import prisma from "@/lib/prisma";
import {
  ChartBarStacked,
  MessageCircleHeart,
  TrendingUp,
  UserIcon,
  Utensils
} from "lucide-react";

export async function CardAnalytics() {
  const [totalUser, totalRecipes, totalComments, totalCategories] =
    await Promise.all([
      prisma.user.count(),
      prisma.recipe.count(),
      prisma.comment.count(),
      prisma.category.count()
    ]);

  const recipeStats = [
    { name: "Total User", value: totalUser, icon: UserIcon },
    { name: "Total Resep", value: totalRecipes, icon: Utensils },
    { name: "Total Komentar", value: totalComments, icon: MessageCircleHeart },
    { name: "Total Kategori", value: totalCategories, icon: ChartBarStacked }
  ];
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {recipeStats.map((stat) => (
        <Card key={stat.name} className="@container/card">
          <CardHeader className="flex flex-col">
            <CardDescription>
              <h2 className="text-lg mb-2">{stat.name}</h2>
            </CardDescription>
            <div className="flex gap-4 items-center">
              <div className="bg-primary/20 p-2 rounded-full text-primary">
                <stat.icon className="w-5 h-5" />
              </div>
              <CardTitle className="text-3xl font-semibold">
                {stat.value}
              </CardTitle>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Trending up this month <TrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
