"use client";

import { useRecipe } from "@/hooks/use-recipe";
import { AlarmClockCheck, ChefHat, Clock, Star, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import RecipeDetailsSkeleton from "./skeleton/RecipeDetailsSkeleton";
import { Heart, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { useState, useTransition } from "react";
import axiosInstance from "@/lib/axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type RecipeDetail = {
  id: string;
  recipeId: string;
  initialSaved: boolean;
  initialCount: number;
};

type PropsSaveRecipe = {
  recipeId: string;
  initialSaved: boolean;
  initialCount: number;
};

export default function RecipeDetailComponent({
  id,
  recipeId,
  initialSaved,
  initialCount
}: RecipeDetail) {
  const pathname = usePathname();
  const { recipe, loading } = useRecipe(id);

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}${pathname}`);
    toast.success("Link berhasil disalin");
  };

  if (loading) return <RecipeDetailsSkeleton />;

  if (!recipe) return <p>Resep tidak ditemukan</p>;

  return (
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
                <span className="ml-2 font-semibold">{recipe?.rating} / 5</span>
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
                    className="lowercase"
                  >
                    #{tag.tag.name}
                  </Badge>
                )
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <SaveRecipeButton
                recipeId={recipeId}
                initialSaved={initialSaved}
                initialCount={initialCount}
              />
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Recipe Image */}
        <div className="relative">
          <Image
            src={recipe.image}
            alt={recipe?.title}
            width={1000}
            height={1000}
            className="rounded-lg object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="flex flex-col justify-center items-center p-2">
            <div className="rounded-full p-2 bg-primary/20 mb-3">
              <Clock className="h-7 w-7 text-primary" />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="text-sm text-muted-foreground">Waktu Persiapan</p>
              <p className="font-semibold">{recipe?.prepTime} Menit</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col justify-center items-center p-2">
            <div className="rounded-full p-2 bg-primary/20 mb-3">
              <AlarmClockCheck className="h-7 w-7 text-primary" />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="text-sm text-muted-foreground">Waktu Masak</p>
              <p className="font-semibold">{recipe?.cookTime}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col justify-center  items-center p-4">
            <div className="rounded-full p-2 bg-primary/20 mb-3">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="text-sm text-muted-foreground">Porsi</p>
              <p className="font-semibold">{recipe?.servings}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col justify-center items-center p-4">
            <div className="rounded-full p-2 bg-primary/20 mb-3">
              <ChefHat className="h-7 w-7 text-primary" />
            </div>
            <div className="flex flex-col gap-2 items-center">
              <p className="text-sm text-muted-foreground">Kesulitan</p>
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
    </section>
  );
}

export function SaveRecipeButton({
  recipeId,
  initialSaved,
  initialCount
}: PropsSaveRecipe) {
  const [saved, setSaved] = useState(initialSaved);
  const [count, setCount] = useState(initialCount);
  const { data: session } = useSession();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggleSave = () => {
    if (!session) {
      setShowLoginModal(true);
      return;
    }
    startTransition(async () => {
      const nextSaved = !saved;
      const nextCount = count + (nextSaved ? 1 : -1);

      // Optimistic Update
      setSaved(nextSaved);
      setCount(nextCount);

      try {
        const res = await axiosInstance.request({
          url: `/api/recipes/${recipeId}/save`,
          method: nextSaved ? "POST" : "DELETE"
        });

        const data = res.data;
        toast.success(nextSaved ? "Tersimpan" : "Resep Batal disimpan");

        if (typeof data.saved === "boolean") setSaved(data.saved);
        if (typeof data.savedCount === "number") setCount(data.savedCount);
      } catch (err: unknown) {
        console.error("Save error:", err);
        // rollback
        setSaved(!nextSaved);
        setCount(count);
      }
    });
  };

  return (
    <>
      <Button
        disabled={isPending}
        onClick={toggleSave}
        variant={saved ? "default" : "secondary"}
      >
        <Heart
          className={`mr-2 h-4 w-4 ${saved ? "fill-current text-red-500" : ""}`}
        />
        {saved ? "Disimpan" : "Simpan Resep"} - {count}
      </Button>

      <AlertDialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login Diperlukan</AlertDialogTitle>
            <p className="text-sm text-muted-foreground">
              Anda harus login terlebih dahulu untuk menyimpan resep
            </p>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowLoginModal(false)}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => router.push("/login")}>
              Login
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
