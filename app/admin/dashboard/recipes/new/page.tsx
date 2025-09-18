"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";
import { RecipeDetailType } from "@/lib/types/type";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus, X } from "lucide-react";
import { ImageUpload } from "@/components/ui/upload-image";

export type Instruction = { id: string; step: number; description: string };
export type IngredientRow = { id: string; text: string };

const Page = () => {
  const [, setRecipes] = useState<RecipeDetailType[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    categoryId: "",
    prepTime: "" as string | number,
    cookTime: "" as string | number,
    servings: "" as string | number,
    difficulty: "" as "" | "Mudah" | "Sedang" | "Susah",
    rating: "" as string | number
  });

  const [ingredients, setIngredients] = useState<IngredientRow[]>([
    { id: "ing-1", text: "" }
  ]);

  const [instructions, setInstructions] = useState<Instruction[]>([
    { id: "inst-1", step: 1, description: "" }
  ]);

  const updateField =
    <K extends keyof typeof formData>(key: K) =>
    (val: string | number) =>
      setFormData((prev) => ({ ...prev, [key]: val }));

  const onDomChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  > = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch awal
  const fetchData = async () => {
    try {
      const [recipesRes, categoryRes] = await Promise.all([
        axiosInstance.get("/api/recipes"),
        axiosInstance.get("/api/categories")
      ]);
      setRecipes(recipesRes.data.data);
      setCategories(categoryRes.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Gagal memuat data awal");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Tags ---
  const addTag = () => {
    const t = newTag.trim();
    if (!t) return;
    if (!tags.includes(t)) setTags((prev) => [...prev, t]);
    setNewTag("");
  };
  const removeTag = (tag: string) =>
    setTags((prev) => prev.filter((t) => t !== tag));

  const addIngredient = () =>
    setIngredients((prev) => [...prev, { id: `ing-${Date.now()}`, text: "" }]);

  const removeIngredient = (id: string) => {
    if (ingredients.length === 1) return;
    setIngredients((prev) => prev.filter((i) => i.id !== id));
  };

  const updateIngredient = (id: string, text: string) =>
    setIngredients((prev) =>
      prev.map((i) => (i.id === id ? { ...i, text } : i))
    );

  const addInstruction = () => {
    const newId = `inst-${Date.now()}`;
    setInstructions((prev) => [
      ...prev,
      { id: newId, step: prev.length + 1, description: "" }
    ]);
  };
  const removeInstruction = (id: string) => {
    if (instructions.length === 1) return;
    const filtered = instructions.filter((i) => i.id !== id);
    setInstructions(filtered.map((it, idx) => ({ ...it, step: idx + 1 })));
  };

  const updateInstruction = (id: string, description: string) =>
    setInstructions((prev) =>
      prev.map((i) => (i.id === id ? { ...i, description } : i))
    );

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title.trim(),
        image: formData.image,
        description: formData.description.trim(),
        categoryId: formData.categoryId,
        prepTime: formData.prepTime === "" ? 0 : Number(formData.prepTime),
        cookTime: formData.cookTime === "" ? 0 : Number(formData.cookTime),
        servings: formData.servings === "" ? 0 : Number(formData.servings),
        difficulty: formData.difficulty,
        rating: formData.rating === "" ? 0 : Number(formData.rating),
        ingredients: ingredients.map((i) => i.text.trim()).filter(Boolean), // string[]
        instructions: instructions
          .map((i) => i.description.trim())
          .filter(Boolean),
        tags
      };

      const res = await axiosInstance.post("/api/recipes", payload);
      if (res.data?.success) {
        toast.success("Recipe added!");
        setFormData({
          title: "",
          image: "",
          description: "",
          categoryId: "",
          prepTime: "",
          cookTime: "",
          servings: "",
          difficulty: "",
          rating: ""
        });
        setTags([]);
        setNewTag("");
        setIngredients([{ id: "ing-1", text: "" }]);
        setInstructions([{ id: "inst-1", step: 1, description: "" }]);
        fetchData();
      } else {
        toast.error(res.data?.error || "Failed to add recipe");
      }
    } catch (error) {
      console.error("Failed add recipe", error);
      toast.error("Failed to add recipe");
    }
  };

  return (
    <div className="px-6 py-4">
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

      <h1 className="text-2xl font-bold mb-6 mt-3">Create New Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="title">
                  Recipe Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={onDomChange}
                  placeholder="Enter recipe title"
                  required
                  className="mt-2"
                />
              </div>

              <div className="md:col-span-2">
                <ImageUpload
                  value={formData.image ? [formData.image] : []}
                  onChange={(urls) => updateField("image")(urls[0] || "")}
                  folder="recipes"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={onDomChange}
                  placeholder="Brief description of your recipe"
                  rows={3}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="categoryId" className="mb-2">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={updateField("categoryId")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="difficulty" className="mb-2">
                  Difficulty Level <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(v) => updateField("difficulty")(v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mudah">Mudah</SelectItem>
                    <SelectItem value="Sedang">Sedang</SelectItem>
                    <SelectItem value="Sulit">Sulit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="prepTime">
                  Prep Time (minutes) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="prepTime"
                  name="prepTime"
                  type="number"
                  value={String(formData.prepTime)}
                  onChange={onDomChange}
                  placeholder="15"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="cookTime">
                  Cook Time (minutes) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="cookTime"
                  name="cookTime"
                  type="number"
                  value={String(formData.cookTime)}
                  onChange={onDomChange}
                  placeholder="60"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="servings">
                  Servings <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="servings"
                  name="servings"
                  type="number"
                  value={String(formData.servings)}
                  onChange={onDomChange}
                  placeholder="4"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="rating">Rating (0–5)</Label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  step="0.1"
                  value={String(formData.rating)}
                  onChange={onDomChange}
                  placeholder="4.5"
                  className="mt-2"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label>Tags</Label>
              <div className="flex gap-2 mb-2 mt-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTag())
                  }
                />
                <Button type="button" onClick={addTag} variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-destructive"
                      aria-label={`remove ${tag}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ingredients (string list) */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                Ingredients <span className="text-red-500">*</span>
              </CardTitle>
              <Button
                type="button"
                onClick={addIngredient}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Ingredient
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ingredients.map((ing, idx) => (
                <div key={ing.id} className="flex items-end gap-3">
                  <div className="flex-1">
                    <Label className="mb-2" htmlFor={`ing-${ing.id}`}>
                      Ingredient #{idx + 1}
                    </Label>
                    <Input
                      id={`ing-${ing.id}`}
                      value={ing.text}
                      required
                      onChange={(e) => updateIngredient(ing.id, e.target.value)}
                      placeholder="e.g. 2 cloves garlic, minced"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeIngredient(ing.id)}
                    disabled={ingredients.length === 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructions (step + description, submit as string[]) */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Instructions</CardTitle>
              <Button
                type="button"
                onClick={addInstruction}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Step
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {instructions.map((inst) => (
                <div key={inst.id} className="flex gap-3 items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-secondary rounded-full flex items-center justify-center text-sm font-medium mt-1">
                    {inst.step}
                  </div>
                  <div className="flex-1">
                    <Textarea
                      value={inst.description}
                      onChange={(e) =>
                        updateInstruction(inst.id, e.target.value)
                      }
                      placeholder="Describe this step..."
                      rows={3}
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => removeInstruction(inst.id)}
                    variant="outline"
                    size="icon"
                    disabled={instructions.length === 1}
                    className="mt-1"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="submit" className="cursor-pointer text-secondary">
            Create Recipe
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
