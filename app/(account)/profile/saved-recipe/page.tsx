"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Users as UsersIcon, Search, Heart } from "lucide-react";

export default async function SavedRecipesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const rows = await prisma.savedRecipe.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      recipe: {
        select: {
          id: true,
          title: true,
          image: true,
          _count: { select: { savedBy: true } }
        }
      }
    }
  });

  const total = rows.length;
  const isEmpty = total === 0;

  return (
    <div className="container mx-auto px-5 py-10">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resep Disimpan</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Koleksi resep favorit Anda. Simpan, buka lagi, dan masak kapan pun.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-sm">
            {total} tersimpan
          </Badge>
          <Link href="/">
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="h-4 w-4" /> Jelajahi Resep
            </Button>
          </Link>
        </div>
      </div>

      <Separator className="mb-8" />

      {isEmpty ? (
        <EmptyState />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rows
            .filter((r) => r.recipe)
            .map(({ recipe }) => (
              <Card
                key={recipe!.id}
                className="group overflow-hidden border-muted/60 bg-card transition hover:border-foreground/20 hover:shadow-lg"
              >
                <Link href={`/recipes/details/${recipe!.id}`} className="block">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/40">
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-muted/40 to-transparent [background-size:200%_100%]" />
                    <Image
                      src={recipe.image}
                      alt={recipe!.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="pointer-events-none absolute left-3 top-3 z-10">
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-1 bg-background/80 backdrop-blur"
                      >
                        <UsersIcon className="h-3.5 w-3.5" />{" "}
                        {recipe!._count.savedBy}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="p-4">
                    <CardTitle className="line-clamp-1 text-base font-semibold">
                      {recipe!.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex items-center justify-between gap-2 px-4 pb-4">
                    <div className="text-xs text-muted-foreground">
                      Klik untuk lihat detail
                    </div>
                    <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                  </CardContent>
                </Link>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <Card className="mx-auto max-w-2xl border-dashed">
      <CardHeader className="flex items-center gap-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Heart className="h-6 w-6 text-muted-foreground" />
        </div>
        <CardTitle className="mt-2 text-2xl">
          Belum ada resep yang disimpan
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <p className="text-muted-foreground">
          Simpan resep favorit Anda dengan menekan tombol{" "}
          <span className="font-medium">Save</span> pada halaman detail resep.
        </p>
        <Link href="/">
          <Button className="gap-2 text-secondary">
            <Search className="h-4 w-4" /> Temukan Resep
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
