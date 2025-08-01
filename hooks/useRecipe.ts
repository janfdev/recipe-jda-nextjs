import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { RecipeDetailType } from "@/lib/types/type";

export const useRecipe = (id: string) => {
  const [recipe, setRecipe] = useState<RecipeDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get(`/api/recipes/${id}`);
        setRecipe(res.data.data);
      } catch (error) {
        console.error("Failed get data recipe: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  return { recipe, loading };
};
