"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { RecipeDetailType } from "@/lib/types/type";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Ellipsis, Pencil, Plus, Trash } from "lucide-react";
import Link from "next/link";

export default function AdminRecipesPage() {
  const [recipes, setRecipes] = useState<RecipeDetailType[]>([]);
  const [, setCategories] = useState<{ id: string; name: string }[]>([]);

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

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this recipe?")) return;
    try {
      const res = await axiosInstance.delete(`/api/recipes/${id}`);

      if (!res.data.success) {
        throw new Error(res.data.error || "Failed to delete");
      }
      setRecipes((prev) => prev.filter((item) => item.id !== id));
      toast.success("Deleted successfully");
      fetchData();
    } catch (err) {
      toast.error("Failed to delete");
      console.error("Delete error:", err);
    }
  };

  return (
    <main className="container py-7 px-10 flex flex-col gap-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/dashboard">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">Recipes</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-end">
        <Link href="recipes/new">
          <Button className="cursor-pointer">
            <Plus />
            <span className="md:block hidden">Create New Recipe</span>
          </Button>
        </Link>
      </div>
      <div className="w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">No</TableHead>
              <TableHead className="text-center">Title</TableHead>
              <TableHead className="text-center">Image</TableHead>
              <TableHead className="text-center">Description</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recipes.map((r, index) => (
              <TableRow key={index + 1} className="text-center">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-medium pl-4">{r.title}</TableCell>
                <TableCell className="flex items-center justify-center">
                  <Image
                    src={r.image}
                    alt={r.title}
                    width={50}
                    height={50}
                    className="w-auto h-auto rounded"
                  />
                </TableCell>
                <TableCell>
                  <p className="font-semibold">{r.description}</p>
                </TableCell>
                <TableCell className="flex items-center justify-center gap-x-5">
                  <Link href={`recipes/edit/${r.id}`}>
                    <Button size={"icon"} className="cursor-pointer">
                      <Pencil className="text-white" />
                    </Button>
                  </Link>
                  <Button
                    className="cursor-pointer"
                    onClick={() => handleDelete(r.id)}
                    variant={"destructive"}
                    size={"icon"}
                  >
                    <Trash />
                  </Button>
                  <Link href={`recipes/details/${r.id}`}>
                    <Button size={"icon"} className="cursor-pointer">
                      <Ellipsis className="text-white" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
