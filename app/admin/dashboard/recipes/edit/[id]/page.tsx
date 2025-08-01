"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/upload-image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

export default function EditRecipePage() {
  const { id } = useParams();
  const router = useRouter();

  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    categoryId: "",
    prepTime: 0,
    cookTime: 0,
    servings: 0,
    difficulty: "",
    rating: 0,
    ingredients: "",
    instructions: "",
    tags: ""
  });

  // Get data recipe by id
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [resRecipe, resCategories] = await Promise.all([
          axiosInstance.get(`/api/recipes/${id}`),
          axiosInstance.get(`/api/categories`)
        ]);

        const recipe = resRecipe.data.data;
        setCategories(resCategories.data.data);

        setFormData({
          title: recipe.title,
          image: recipe.image,
          description: recipe.description,
          categoryId: recipe.categoryID || "",
          prepTime: recipe.prepTime,
          cookTime: recipe.cookTime,
          servings: recipe.servings,
          difficulty: recipe.difficulty,
          rating: recipe.rating,
          ingredients: recipe.ingredients
            ?.map((i: { name: string }) => i.name)
            .join(", "),
          instructions: recipe.instructions
            ?.map((i: { step: string }) => i.step)
            .join(", "),
          tags: recipe.tags
            ?.map((t: { tag: { name: string } }) => t.tag.name)
            .join(", ")
        });

        setCategories(resCategories.data.data);
      } catch (error) {
        console.error("Failed to fetch recipe", error);
        toast.error("Failed to fetch recipe");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? 0 : Number(value)) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) return toast.error("Title is required");
    if (!formData.description.trim())
      return toast.error("Description is required");
    if (!formData.categoryId) return toast.error("Please select a category");
    if (formData.rating < 0 || formData.rating > 5)
      return toast.error("Rating must be between 0 and 5");

    try {
      const payload = {
        ...formData,
        prepTime: Number(formData.prepTime),
        cookTime: Number(formData.cookTime),
        servings: Number(formData.servings),
        rating: Number(formData.rating),
        ingredients: formData.ingredients.split(", ").map((i) => i.trim()),
        instructions: formData.instructions.split(", ").map((i) => i.trim()),
        tags: formData.tags.split(", ").map((t) => t.trim())
      };

      const res = await axiosInstance.patch(`/api/recipes/${id}`, payload);

      if (res.data.success) {
        toast.success("Recipe updated successfully");
        router.push("/admin/dashboard/recipes");
      }
    } catch (error) {
      console.error("Failed to update recipe", error);
      toast.error("Failed to update recipe");
    }
  };

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dasboard">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard/recipes">
              Recipes
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">
              Edit Recipe
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-bold mb-6">Edit Recipe</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-12">
        <Input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />

        <ImageUpload
          value={formData.image ? [formData.image] : []}
          onChange={(urls) =>
            setFormData((prev) => ({ ...prev, image: urls[0] || "" }))
          }
          folder="recipes"
          className="col-span-2"
        />

        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="col-span-2"
        />

        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <Input
          type="number"
          name="prepTime"
          value={formData.prepTime}
          onChange={handleChange}
          placeholder="Prep Time (min)"
        />
        <Input
          type="number"
          name="cookTime"
          value={formData.cookTime}
          onChange={handleChange}
          placeholder="Cook Time (min)"
        />
        <Input
          type="number"
          name="servings"
          value={formData.servings}
          onChange={handleChange}
          placeholder="Servings"
        />
        <Input
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          placeholder="Difficulty (Easy/Medium/Hard)"
        />
        <Input
          type="number"
          step="0.1"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating (0–5)"
        />

        <Input
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="Ingredients (comma separated)"
          className="col-span-2"
        />
        <Input
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Instructions (comma separated)"
          className="col-span-2"
        />
        <Input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Tags (comma separated)"
          className="col-span-2"
        />

        <Button type="submit" className="col-span-2">
          Update Recipe
        </Button>
      </form>
    </div>
  );
}
