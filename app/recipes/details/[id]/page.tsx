import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RecipeDetailComponent from "@/components/recipes/RecipeDetail";
import RecipeComments from "@/components/recipes/RecipeComments";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export type CommentTypes = {
  id: string;
  content: string;
  recipeId: string;
  userId: string;
  createdAt: string;
  user?: { name: string; image: string };
};

export default async function RecipesDetails({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  const recipe = await prisma.recipe.findUnique({
    where: { id: id },
    include: {
      _count: {
        select: { savedBy: true }
      },
      category: true,
      tags: {
        include: { tag: true }
      },
      ingredients: true,
      instructions: true
    }
  });

  if (!recipe) return <div>Resep tidak ditemukan</div>;

  const savedByMe = session?.user?.id
    ? !!(await prisma.savedRecipe.findUnique({
        where: {
          userId_recipeId: {
            userId: session?.user?.id,
            recipeId: id
          }
        },
        select: { id: true }
      }))
    : false;

  return (
    <main className="py-4 px-4 min-h-screen flex flex-col mx-auto bg-background">
      <Header />
      <section className="container mx-auto py-12 px-4 max-w-7xl">
        <RecipeDetailComponent
          id={id}
          recipeId={id}
          initialSaved={savedByMe}
          initialCount={recipe._count.savedBy}
        />
        <RecipeComments recipeId={id} />
      </section>
      <Footer />
    </main>
  );
}
