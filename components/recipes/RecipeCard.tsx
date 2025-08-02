import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { RecipeDetailType } from "@/lib/types/type";

export default function RecipeCard({ recipe }: { recipe: RecipeDetailType }) {
  const formatDateWithTime = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  };

  return (
    <Link
      key={recipe.id}
      href={`/recipes/details/${recipe.id}`}
      className="group flex cursor-pointer flex-col bg-card p-6 rounded-xl shadow-sm transition-all hover:shadow-md hover:translate-y-[-4px] hover:bg-accent hover:text-accent-foreground border border-transparent hover:border-accent-foreground/10"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-muted-foreground">
          {recipe.category?.name}
        </span>
        <span className="text-xs text-muted-foreground">
          {formatDateWithTime(recipe.date)}
        </span>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <Image
          src={recipe.image}
          alt={recipe.title}
          width={500}
          height={300}
          className="w-auto h-auto rounded-lg"
        />
        <h3 className="font-semibold text-lg mb-2 group-hover:text-accent-foreground transition-colors">
          {recipe.title}
        </h3>
        <p className="text-sm text-muted-foreground group-hover:text-accent-foreground/80 transition-colors">
          {recipe.description}
        </p>
      </div>
      <div className="mt-auto pt-4 flex items-center text-xs font-medium">
        <span className="text-primary group-hover:text-accent-foreground transition-colors flex gap-2 items-center">
          <p>Baca Resep</p>
          <ChevronRight
            className="group-hover:translate-x-1 transition-all"
            size={13}
          />
        </span>
      </div>
    </Link>
  );
}
