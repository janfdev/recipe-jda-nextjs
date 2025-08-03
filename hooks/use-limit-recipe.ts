import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { RecipeDetailType } from "@/lib/types/type";

export const useLimitRecipes = (limit: number) => {
  const [recipes, setRecipes] = useState<RecipeDetailType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/api/recipes");
        const data = limit ? res.data.data.slice(0, limit) : res.data.data;
        setRecipes(data);
      } catch (error) {
        console.error("Failed to load recipes: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [limit]);

  return {
    recipes,
    loading
  };
};
