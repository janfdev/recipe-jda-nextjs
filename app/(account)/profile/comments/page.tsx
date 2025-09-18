"use client";

import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Pencil, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { EditCommentDialog } from "@/components/dialog/EditCommentDialog";
import { DeleteCommentDialog } from "@/components/dialog/DeleteCommentDialog";
import axiosInstance from "@/lib/axios";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

export type MyCommentType = {
  id: string;
  content: string;
  createdAt: string;
  recipe: { id: string; title: string; image: string };
  user: { name?: string; image?: string };
};

export default function MyComment() {
  const [comments, setComments] = useState<MyCommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedComment, setSelectedComment] = useState<MyCommentType | null>(
    null
  );
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const formatDateWithTime = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  };

  const fetchMyComments = async () => {
    try {
      const res = await axiosInstance.get("/api/user/me/comments");
      setComments(res.data.data);
    } catch (error) {
      console.error("Gagal fetch komentar sendiri", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyComments();
  }, []);

  return (
    <div className="max-w-5xl mx-7 mt-7">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-semibold">
              Komentar Saya
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex flex-col gap-4 mt-4">
        <span>
          <h1>Total Komentar : {comments.length}</h1>
        </span>
        <div className="space-y-6">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <Skeleton className="h-4 w-40 mb-2" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-4 w-60" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : comments.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center">
              Belum ada komentar
            </p>
          ) : (
            comments.map((comment) => (
              <Card
                key={comment.id}
                className="overflow-hidden border bg-card hover:shadow-md transition-shadow"
              >
                <div className="p-4 md:p-5">
                  <div className="grid gap-4 md:grid-cols-[160px_1fr] items-start">
                    <div className="relative">
                      <Link href={`/recipes/details/${comment.recipe.id}`}>
                        <Image
                          src={comment.recipe?.image}
                          alt={comment.recipe.title}
                          width={160}
                          height={120}
                          className="rounded-md object-cover w-full h-[120px]"
                        />
                      </Link>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <CardTitle className="text-base md:text-lg leading-tight">
                            <Link
                              href={`/recipes/details/${comment.recipe.id}`}
                              className="hover:text-primary transition-colors line-clamp-2"
                            >
                              Resep: {comment.recipe.title}
                            </Link>
                          </CardTitle>
                          <p className="text-xs md:text-sm text-muted-foreground mt-1">
                            Komentar tanggal:{" "}
                            {formatDateWithTime(comment.createdAt)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-2"
                            onClick={() => {
                              setSelectedComment(comment);
                              setEditOpen(true);
                            }}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="hidden sm:inline">Edit</span>
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setSelectedComment(comment);
                              setDeleteOpen(true);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={comment.user?.image || "/placeholder.svg"}
                            alt={comment.user?.name || "Avatar"}
                          />
                          <AvatarFallback>
                            {comment.user?.name?.charAt(0) || "?"}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <h2 className="text-sm font-medium text-foreground">
                            {comment.user.name}
                          </h2>

                          <p className="text-sm md:text-[15px] leading-relaxed text-foreground mt-1">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      <EditCommentDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        comment={selectedComment}
        onUpdated={fetchMyComments}
      />
      <DeleteCommentDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        commentId={selectedComment?.id ?? null}
        onDeleted={fetchMyComments}
      />
    </div>
  );
}
