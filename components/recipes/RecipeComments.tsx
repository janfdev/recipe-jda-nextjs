"use client";
import { useComments } from "@/hooks/useComments";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SpinnerCircle from "../spinner";
import { useRecipe } from "@/hooks/useRecipe";

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  user?: {
    name?: string;
    image?: string;
  };
};

export default function RecipeComments({ recipeId }: { recipeId: string }) {
  const { recipe } = useRecipe(recipeId);
  const { comments, loading, addComment, commentText, setCommentText } =
    useComments(recipeId) as {
      comments: Comment[];
      loading: boolean;
      addComment: () => void;
      commentText: string;
      setCommentText: (text: string) => void;
    };
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { data: session } = useSession();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const router = useRouter();

  const formatDateTime = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      setShowLoginModal(true);
      return;
    }

    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await addComment();
    } catch (error) {
      console.error("Upload komen error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full mt-10">
      <h1 className="text-xl font-semibold mb-4">Komentar</h1>
      <Card>
        <h2 className="font-semibold px-5 capitalize text-lg">
          Resep : {recipe?.title}
        </h2>
        <CardContent className="p-6 space-y-6">
          {loading ? (
            <div className="flex flex-col gap-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          ) : comments.length > 0 ? (
            <div className="flex flex-col gap-4 max-h-64 overflow-y-auto pr-2">
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
                    {formatDateTime(com.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-center text-muted-foreground">
              Belum ada komentar
            </p>
          )}

          <form
            onSubmit={(e) => handleSubmit(e)}
            onKeyDown={handleKeyDown}
            className="pt-4 border-t"
          >
            <Textarea
              placeholder="Tulis komentar disini"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="mb-2"
            />
            <Button type="submit" disabled={!commentText.trim()}>
              {submitting ? " Mengirim...." : "Kirim Komentar"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {submitting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <SpinnerCircle />
        </div>
      )}

      {/* Modal login */}
      <AlertDialog open={showLoginModal} onOpenChange={setShowLoginModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login Diperlukan</AlertDialogTitle>
            <p className="text-sm text-muted-foreground">
              Anda harus login terlebih dahulu untuk memberikan komentar
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
    </div>
  );
}
