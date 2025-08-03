"use client";
import { Heart, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

export default function RecipeActionButtons() {
  const pathname = usePathname();

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}${pathname}`);
    toast.success("Link berhasil disalin");
  };

  const handleSave = () => {
    toast.info("Fitur segera hadir");
  };

  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={handleSave}>
        <Heart className="h-4 w-4 mr-2 text-accent" />
        Save Recipe
      </Button>
      <Button variant="outline" onClick={handleShare}>
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>
    </div>
  );
}
