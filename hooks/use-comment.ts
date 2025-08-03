import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axiosInstance from "@/lib/axios";

export const useComments = (recipeId: string) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/api/recipes/${recipeId}/comments`);
      setComments(res.data.data || []);
    } catch (error) {
      console.error("Failed get data comment : ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [recipeId]);

  const addComment = async () => {
    if (!session) return router.push("/login");
    if (!commentText.trim()) return;

    try {
      await axiosInstance.post(`/api/recipes/${recipeId}/comments`, {
        recipeId,
        content: commentText
      });
      setCommentText("");
      toast.success("Komentar berhasil terkirim");
      fetchComments();
    } catch (error) {
      console.error("Gagal mengirim komentar, error: ", error);
      toast.error("Gagal mengirim komentar");
    }
  };

  return {
    comments,
    loading,
    commentText,
    setCommentText,
    addComment
  };
};
