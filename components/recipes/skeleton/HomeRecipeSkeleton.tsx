import React from "react";
import { Skeleton } from "../../ui/skeleton";

const HomeRecipeSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {[...Array(8)].map((_, recipe) => (
        <div
          key={recipe}
          className="group flex cursor-pointer flex-col bg-card p-6 rounded-xl shadow-sm transition-all "
        >
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="w-10 h-5" />
            <Skeleton className="w-10 h-5" />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <Skeleton className="w-full h-36 rounded-lg" />
            <Skeleton className="w-32 h-5" />
            <Skeleton className="w-52 h-5" />
          </div>
          <div className="mt-auto pt-4 flex items-center text-xs font-medium">
            <span className="text-primary group-hover:text-accent-foreground transition-colors flex gap-2 items-center">
              <Skeleton className="w-20 h-5" />
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeRecipeSkeleton;
