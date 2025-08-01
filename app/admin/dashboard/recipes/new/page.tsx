"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/upload-image";
import axiosInstance from "@/lib/axios";
import { RecipeDetailType } from "@/lib/types/type";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

const Page = () => {
  const [, setRecipes] = useState<RecipeDetailType[]>([]);
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

  const fetchData = async () => {
    const [recipesRes, categoryRes] = await Promise.all([
      axiosInstance.get("/api/recipes"),
      axiosInstance.get("/api/categories")
    ]);
    setRecipes(recipesRes.data.data);
    setCategories(categoryRes.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        prepTime: Number(formData.prepTime),
        cookTime: Number(formData.cookTime),
        servings: Number(formData.servings),
        rating: Number(formData.rating),
        ingredients: formData.ingredients.split(",").map((i) => i.trim()),
        instructions: formData.instructions.split(",").map((i) => i.trim()),
        tags: formData.tags.split(",").map((t) => t.trim())
      };
      const res = await axiosInstance.post("/api/recipes", payload);
      if (res.data.success) {
        toast.success("Recipe added!");
        fetchData();
        setFormData({
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
      }
    } catch (error) {
      console.error("Failed add recipe", error);
      toast.error("Failed to add recipe");
    }
  };
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard/recipes">
              Recipe
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create Recipe</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-2xl font-bold mb-6">Add New Recipe</h1>

      <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4 mb-12">
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

        {/* {formData.image && (
          <div className="col-span-2">
            <Image
              src={formData.image}
              alt="Preview"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
        )} */}

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
            <option
              key={c.id}
              value={c.id}
              className="text-black dark:text-white"
            >
              {c.name}
            </option>
          ))}
        </select>
        <Input
          type="number"
          name="prepTime"
          onChange={handleChange}
          placeholder="Prep Time (min)"
        />
        <Input
          type="number"
          name="cookTime"
          onChange={handleChange}
          placeholder="Cook Time (min)"
        />
        <Input
          type="number"
          name="servings"
          onChange={handleChange}
          placeholder="Servings"
        />
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Pilih tingkat kesulitan</option>
          <option value="Mudah">Mudah</option>
          <option value="Sedang">Sedang</option>
          <option value="Susah">Susah</option>
        </select>

        <Input
          type="number"
          step="0.1"
          name="rating"
          onChange={handleChange}
          placeholder="Rating (0–5)"
        />
        <Input
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="Bahan-bahan (Pisahkan dengan koma)"
          className="col-span-2"
        />
        <Input
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Langkah-langkah (Pisahkan dengan koma)"
          className="col-span-2"
        />
        <Input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Tags (Pisahkan dengan koma)"
          className="col-span-2"
        />
        <Button type="submit" className="col-span-2">
          Add Recipe
        </Button>
      </form>
    </div>
  );
};

export default Page;
