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
import { Trash2 } from "lucide-react";
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
      const res = await axiosInstance.get("/api/my-comments");
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
              My Comment
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
              <Card key={comment.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Image
                          src={comment.recipe?.image}
                          alt={comment.recipe.title}
                          width={50}
                          height={50}
                          className="rounded"
                        />
                        <Link
                          href={`/recipes/details/${comment.recipe.id}`}
                          className="hover:text-orange-600 transition-colors"
                        >
                          Resep : {comment.recipe.title}
                        </Link>
                      </CardTitle>
                      <p className="text-sm text-gray-500 mt-1">
                        Commented: {formatDateWithTime(comment.createdAt)}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        setSelectedComment(comment);
                        setEditOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={comment.user?.image || "/placeholder.svg"}
                        alt="Avatar"
                      />
                      <AvatarFallback>
                        {comment.user?.name?.charAt(0) || "?"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-gray-700 mb-3">{comment.content}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 text-orange-600"
                          onClick={() => {
                            setSelectedComment(comment);
                            setEditOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
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
