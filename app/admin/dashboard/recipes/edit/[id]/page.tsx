"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";

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
import { Instruction, IngredientRow } from "../../new/page";

type Category = {
  id: string;
  name: string;
};

export default function EditRecipePage() {
  const { id } = useParams();
  const router = useRouter();

  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    categoryId: "",
    prepTime: "" as string | number,
    cookTime: "" as string | number,
    servings: "" as string | number,
    difficulty: "" as "" | "Mudah" | "Sedang" | "Sulit",
    rating: "" as string | number
  });

  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const [ingredients, setIngredients] = useState<IngredientRow[]>([
    {
      id: "ing-1",
      text: ""
    }
  ]);

  const [instructions, setInstructions] = useState<Instruction[]>([
    {
      id: "inst-1",
      step: 1,
      description: ""
    }
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
  const removeIngredient = (rowId: string) => {
    if (ingredients.length === 1) return;
    setIngredients((prev) => prev.filter((i) => i.id !== rowId));
  };
  const updateIngredient = (rowId: string, text: string) =>
    setIngredients((prev) =>
      prev.map((i) => (i.id === rowId ? { ...i, text } : i))
    );

  const addInstruction = () => {
    setInstructions((prev) => [
      ...prev,
      { id: `inst-${Date.now()}`, step: prev.length + 1, description: "" }
    ]);
  };
  const removeInstruction = (rowId: string) => {
    if (instructions.length === 1) return;
    const filtered = instructions.filter((i) => i.id !== rowId);
    // re-number steps
    setInstructions(filtered.map((it, idx) => ({ ...it, step: idx + 1 })));
  };
  const updateInstruction = (rowId: string, description: string) =>
    setInstructions((prev) =>
      prev.map((i) => (i.id === rowId ? { ...i, description } : i))
    );

  useEffect(() => {
    if (!id) return;

    const fetchAll = async () => {
      try {
        setIsLoadingPage(true);
        const [resRecipe, resCategories] = await Promise.all([
          axiosInstance.get(`/api/recipes/${id}`),
          axiosInstance.get(`/api/categories`)
        ]);

        const recipe = resRecipe.data?.data;
        const cats: Category[] = resCategories.data?.data || [];
        setCategories(cats);

        setFormData({
          title: recipe?.title || "",
          image: recipe?.image || "",
          description: recipe?.description || "",
          categoryId: recipe?.categoryID || recipe?.categoryId || "",
          prepTime: recipe?.prepTime ?? "",
          cookTime: recipe?.cookTime ?? "",
          servings: recipe?.servings ?? "",
          difficulty:
            (recipe?.difficulty as "Mudah" | "Sedang" | "Sulit" | "") || "",
          rating: recipe?.rating ?? ""
        });

        // Ingredient (array of object -> rows)
        const ingTexts: string[] =
          recipe?.ingredients?.map((i: { name?: string; text?: string }) =>
            (i?.name ?? i?.text ?? "").trim()
          ) || [];
        setIngredients(
          ingTexts.length
            ? ingTexts.map((t, idx) => ({ id: `ing-${idx + 1}`, text: t }))
            : [{ id: "ing-1", text: "" }]
        );

        // Instruction Rows (array of object -> rows)
        const instDescs: string[] =
          recipe?.instructions?.map(
            (i: { step?: string; description?: string }) =>
              (i?.description ?? i?.step ?? "").toString().trim()
          ) || [];
        setInstructions(
          instDescs.length
            ? instDescs.map((d, idx) => ({
                id: `inst-${idx + 1}`,
                step: idx + 1,
                description: d
              }))
            : [{ id: "inst-1", step: 1, description: "" }]
        );

        type Tag = { id: string; name: string };

        const tagNames: string[] =
          recipe?.tags?.map((t: Tag) => (t.name ? t.name : "").trim()) || [];
        setTags(tagNames.filter(Boolean));
      } catch (error) {
        console.error("Failed to fetch recipe", error);
        toast.error("Gagal mengambil resep");
      } finally {
        setIsLoadingPage(false);
      }
    };

    fetchAll();
  }, [id]);

  const disableSubmit = useMemo(() => {
    if (isSubmitting || isLoadingPage) return true;
    if (!formData.title.trim()) return true;
    if (!formData.description.trim()) return true;
    if (!formData.categoryId) return true;
    // rating optional: jika diisi harus 0..5
    if (
      formData.rating !== "" &&
      (Number(formData.rating) < 0 || Number(formData.rating) > 5)
    )
      return true;
    return false;
  }, [formData, isSubmitting, isLoadingPage]);

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    if (disableSubmit) return;

    try {
      setIsSubmitting(true);

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
        // kirim sebagai string[]
        ingredients: ingredients.map((i) => i.text.trim()).filter(Boolean),
        instructions: instructions
          .map((i) => i.description.trim())
          .filter(Boolean),
        tags
      };

      const res = await axiosInstance.patch(`/api/recipes/${id}`, payload);

      if (res.data?.success) {
        toast.success("Recipe updated successfully");
        router.replace("/admin/dashboard/recipes");
      } else {
        toast.error(res.data?.error || "Failed to update recipe");
      }
    } catch (error) {
      console.error("Failed to update recipe", error);
      toast.error("Failed to update recipe");
    } finally {
      setIsSubmitting(false);
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
              Recipes
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit Recipe</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="mt-3 mb-6 text-2xl font-bold">
        {isLoadingPage ? "Loading..." : "Edit Recipe"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                  disabled={isLoadingPage}
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
                  required
                  disabled={isLoadingPage}
                />
              </div>

              <div>
                <Label htmlFor="categoryId" className="mb-2">
                  Category <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={updateField("categoryId")}
                  disabled={isLoadingPage}
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
                  disabled={isLoadingPage}
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
                  disabled={isLoadingPage}
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
                  disabled={isLoadingPage}
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
                  disabled={isLoadingPage}
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
                  disabled={isLoadingPage}
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <Label>Tags</Label>
              <div className="mt-2 mb-2 flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTag())
                  }
                  disabled={isLoadingPage}
                />
                <Button
                  type="button"
                  onClick={addTag}
                  variant="outline"
                  disabled={isLoadingPage}
                >
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

        {/* Ingredients */}
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
                disabled={isLoadingPage}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Ingredient
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
                      disabled={isLoadingPage}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeIngredient(ing.id)}
                    disabled={ingredients.length === 1 || isLoadingPage}
                    aria-label="Remove ingredient"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Instructions</CardTitle>
              <Button
                type="button"
                onClick={addInstruction}
                variant="outline"
                size="sm"
                disabled={isLoadingPage}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Step
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {instructions.map((inst) => (
                <div key={inst.id} className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-secondary">
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
                      disabled={isLoadingPage}
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => removeInstruction(inst.id)}
                    variant="outline"
                    size="icon"
                    disabled={instructions.length === 1 || isLoadingPage}
                    className="mt-1"
                    aria-label="Remove step"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="cursor-pointer text-secondary"
            disabled={disableSubmit}
          >
            {isSubmitting ? "Updating..." : "Update Recipe"}
          </Button>
        </div>
      </form>
    </div>
  );
}
