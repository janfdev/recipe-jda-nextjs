import React from "react";
import { Skeleton } from "../../ui/skeleton";
import { Card, CardContent } from "../../ui/card";

const RecipeDetailsSkeleton = () => {
  return (
    <section className="container mx-auto px-4 py-20 space-y-10">
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-9 w-1/3" />
            <Skeleton className="h-7 w-1/2" />

            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-5 w-1/3" />
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-16 rounded-md" />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Skeleton />
              <Skeleton />
            </div>
          </div>
        </div>

        <div className="relative">
          <Skeleton className="w-full h-[300px] rounded-lg" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="flex items-center space-x-3 p-4">
              <Skeleton className="h-[110px]" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card>
          <CardContent className="p-6 space-y-3">
            <Skeleton className="h-6 w-1/2" />
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </CardContent>
        </Card>
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-6 w-1/2" />
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default RecipeDetailsSkeleton;
