"use client";

import { useEffect, useState } from "react";
import { CategoryTypes, LoadingState } from "@/lib/types/type";
import { X, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import axiosInstance from "@/lib/axios";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [newName, setNewName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<LoadingState>({
    fetch: false,
    add: false,
    edit: false,
    delete: false
  });

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading((prev) => ({ ...prev, fetch: true }));
      try {
        const res = await axiosInstance.get("/api/categories");
        if (!res.data.success) throw new Error("Failed to fetch");
        const { data } = res.data;
        setCategories(data);
      } catch (error) {
        console.log(error);
        toast.error("Error");
      } finally {
        setIsLoading((prev) => ({ ...prev, fetch: false }));
      }
    };

    fetchCategories();
  }, []);

  const addCategory = async () => {
    if (!newName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setIsLoading((prev) => ({ ...prev, add: true }));
    try {
      const res = await axiosInstance.post("/api/categories", {
        name: newName.trim()
      });

      if (!res.data.success) throw new Error("Failed to add category");

      const { data } = res.data;
      setCategories((prev) => [...prev, data]);
      setNewName("");
      toast.success("Add category success");
    } catch (error) {
      console.log(error);
      toast.error("API ERROR");
    } finally {
      setIsLoading((prev) => ({ ...prev, add: false }));
    }
  };

  const editCategory = async (id: string, currentName: string) => {
    const editName = prompt("Enter new name", currentName);
    if (!editName?.trim()) return;

    setIsLoading((prev) => ({ ...prev, edit: true }));
    try {
      const res = await axiosInstance.patch(`/api/categories/${id}`, {
        name: editName.trim()
      });

      if (!res.data.success) throw new Error("Failed to update category");

      const { data } = res.data;
      setCategories((prev) =>
        prev.map((item) => (item.id === id ? data : item))
      );
      toast.success("Category updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update category");
    } finally {
      setIsLoading((prev) => ({ ...prev, edit: false }));
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    setIsLoading((prev) => ({ ...prev, delete: true }));
    try {
      const res = await axiosInstance.delete(`/api/categories/${id}`, {});

      if (!res.data.success) throw new Error("Failed to delete category");

      setCategories((prev) => prev.filter((item) => item.id !== id));
      toast.success("Category deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete category");
    } finally {
      setIsLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  return (
    <>
      <main className="container md:max-w-6xl max-w-3xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Category Management</h1>

        <div className="flex gap-2 mb-6">
          <Input
            type="text"
            placeholder="Enter category name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCategory()}
            disabled={isLoading.add}
          />
          <Button
            onClick={addCategory}
            disabled={!newName.trim() || isLoading.add}
          >
            {isLoading.add ? "Adding..." : "Add Category"}
          </Button>
        </div>

        {isLoading.fetch ? (
          <div>Loading categories...</div>
        ) : (
          <ul className="space-y-2">
            {categories?.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <span className="font-medium">{item.name}</span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => editCategory(item.id, item.name)}
                    disabled={isLoading.edit}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteCategory(item.id)}
                    disabled={isLoading.delete}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
