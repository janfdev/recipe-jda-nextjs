"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ChefHat, Clock, Heart, Share2, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import axiosInstance from "@/lib/axios";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import { RecipeDetailType } from "@/lib/types/type";

// export type RecipeDetailType = {
//   id: string;
//   title: string;
//   description: string;
//   image: string | StaticImageData;
//   rating: number;
//   servings: number;
//   difficulty: string;
//   prepTime: number;
//   cookTime: number;
//   category?: { name: string };
//   tags?: { tag: { name: string } }[];
//   ingredients?: { name: string }[];
//   instructions?: { step: string }[];
// };

export type CommentTypes = {
  id: string;
  content: string;
  recipeId: string;
  userId: string;
  createdAt: string;
  user?: { name: string; image: string };
};

export default function RecipesDetail() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = useParams();
  const [recipe, setRecipe] = useState<RecipeDetailType | null>(null);
  const [comments, setComments] = useState<CommentTypes[]>([]);
  const [commentText, setCommentText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingComments, setLoadingComments] = useState<boolean>(false);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const fetchRecipe = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const recipeRes = await axiosInstance.get(`/api/recipes/${id}`);
      setRecipe(recipeRes.data.data);
    } catch (error) {
      console.error("Gagal mengambil data resep", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchComments = useCallback(async () => {
    if (!id) return;
    try {
      setLoadingComments(true);
      const commentRes = await axiosInstance.get(
        `/api/comments?recipeId=${id}`
      );
      setComments(commentRes.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data komentar", error);
    } finally {
      setLoadingComments(false);
    }
  }, [id]);

  useEffect(() => {
    fetchRecipe();
    fetchComments();
  }, [fetchRecipe, fetchComments]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
    return;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      return router.push("/login");
    }

    if (!commentText.trim()) return;

    try {
      await axiosInstance.post("/api/comments", {
        recipeId: recipe?.id,
        content: commentText
      });
      setCommentText("");
      toast.success("Komentar berhasil terupload");

      fetchComments();
    } catch (error) {
      console.error("Gagal kirim komentar", error);
      toast.error("Gagal mengirimkan komentar");
    }
  };

  return (
    <main className="py-4 px-4 min-h-screen flex flex-col max-w-7xl mx-auto bg-background">
      <Header />

      {loading ? (
        <section className="container mx-auto px-4 py-20 space-y-10">
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/2" />
            <Skeleton className="h-5 w-2/3" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Skeleton className="w-full h-[300px] rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-6 w-1/4" />
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-16 rounded-md" />
                ))}
              </div>
              <div className="flex gap-4 mt-4">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 space-y-3">
                <Skeleton className="h-6 w-1/2" />
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </CardContent>
            </Card>
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-6 w-1/2" />
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-4 w-full" />
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      ) : (
        recipe && (
          <section className="container mx-auto px-4 py-20">
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl capitalize md:text-4xl font-bold mb-4">
                    {recipe?.title}
                  </h1>
                  <p className="text-lg capitalize text-muted-foreground mb-4">
                    {recipe?.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(recipe?.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 font-semibold">
                        {recipe?.rating} / 5
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-primary mb-2">
                    Kategori: <strong>{recipe?.category?.name || "-"}</strong>
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {recipe?.tags?.map(
                      (tag: { tag: { name: string } }, index: number) => (
                        <Badge
                          key={`${index}-${tag.tag.name}`}
                          variant="secondary"
                        >
                          {tag.tag.name}
                        </Badge>
                      )
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button>
                      <Heart className="h-4 w-4 mr-2" />
                      Save Recipe
                    </Button>
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>

              {/* Recipe Image */}
              <div className="relative">
                <Image
                  src={recipe?.image}
                  alt={recipe?.title}
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-auto h-auto"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="flex items-center space-x-3 p-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Prep Time</p>
                    <p className="font-semibold">{recipe?.prepTime}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center space-x-3 p-4">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Cook Time</p>
                    <p className="font-semibold">{recipe?.cookTime}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center space-x-3 p-4">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Servings</p>
                    <p className="font-semibold">{recipe?.servings}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center space-x-3 p-4">
                  <ChefHat className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Difficulty</p>
                    <p className="font-semibold">{recipe?.difficulty}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Bahan dan Instruksi */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Bahan - bahan</h2>
                    <ul className="space-y-3">
                      {recipe?.ingredients?.map(
                        (item: { name: string }, index: number) => (
                          <li key={index} className="flex items-center">
                            <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                              {index + 1}
                            </span>
                            <span className="flex-1 ml-3">{item.name}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-6">Instruksi</h2>
                    <ol className="space-y-4">
                      {recipe?.instructions?.map(
                        (instruction: { step: string }, index: number) => (
                          <li key={index} className="flex space-x-4">
                            <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
                              {index + 1}
                            </span>
                            <p className="text-sm leading-relaxed pt-1">
                              {instruction.step}
                            </p>
                          </li>
                        )
                      )}
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Komentar */}
            <div className="w-full mt-10">
              <h1 className="text-xl font-semibold mb-4">Komentar</h1>

              <Card>
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-lg font-medium text-muted-foreground">
                    Resep:{" "}
                    <span className="text-foreground">{recipe?.title}</span>
                  </h2>

                  {loadingComments ? (
                    <div className="flex flex-col gap-2">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-6 w-full" />
                      ))}
                    </div>
                  ) : comments.length > 0 ? (
                    <div className="flex flex-col gap-4">
                      {comments.map((com) => (
                        <div
                          key={com.id}
                          className="flex items-center justify-between gap-x-2"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarFallback>
                                {com.user?.name?.[0] || com.user?.image}
                              </AvatarFallback>
                            </Avatar>
                            <span>{com.content}</span>
                          </div>
                          <p className="text-xs text-foreground/70">
                            {formatDate(com.createdAt)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Belum ada komentar
                    </p>
                  )}

                  {/* Form komentar */}
                  <form onSubmit={handleSubmit} className="pt-4 border-t">
                    <Textarea
                      placeholder="Tulis komentar kamu di sini..."
                      value={commentText}
                      onKeyDown={handleKeyDown}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="mb-2"
                    />
                    <Button type="submit" disabled={!commentText.trim()}>
                      Kirim Komentar
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </section>
        )
      )}
      <Footer />
    </main>
  );
}
