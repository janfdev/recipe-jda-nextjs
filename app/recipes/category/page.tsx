"use client";
import { useEffect, useState } from "react";
import { CategoryTypes } from "@/lib/types/type";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CategoryPage() {
  const [categorys, setCategorys] = useState<CategoryTypes[]>([]);
  const [newName, setNewName] = useState<string>("");

  useEffect(() => {
    fetch("/api/categorys")
      .then((res) => res.json())
      .then(setCategorys);
  }, []);

  const addCategory = async () => {
    if (!newName) {
      alert("Input nama harus diisi");
      return;
    } else {
      {
        const res = await fetch("/api/categorys", {
          method: "POST",
          body: JSON.stringify({ name: newName })
        });
        const data = await res.json();
        setCategorys([...categorys, data]);
        setNewName("");
      }
    }
  };

  const editCategory = async (id: number) => {
    const editName = prompt("Masukkan nama baru");
    if (!editName) return;
    const res = await fetch(`/api/categorys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: editName })
    });

    const data = await res.json();
    setCategorys((prev) => prev.map((item) => (item.id === id ? data : item)));
  };

  const deleteCategory = async (id: number) => {
    const yes = confirm("Apakah anda yakin?");
    if (yes) {
      await fetch("/api/categorys", {
        method: "DELETE",
        body: JSON.stringify({ id })
      });
      setCategorys(categorys.filter((item) => item.id !== id));
    }
    return;
  };

  return (
    <main>
      <h1>List Category Page</h1>
      <ul className="mt-4">
        {categorys.map((item, index) => (
          <li key={index}>
            {item.name}
            <Button onClick={() => editCategory(item.id)}>Edit</Button>
            <Button
              variant={"destructive"}
              className="rounded border border-blue-500"
              onClick={() => deleteCategory(item.id)}
            >
              <X />
            </Button>
          </li>
        ))}
      </ul>

      <input
        type="text"
        className="mt-4 border p-2"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button
        onClick={addCategory}
        className="ml-2 bg-blue-500 text-white px-4 py-2"
      >
        Tambah
      </button>
    </main>
  );
}
