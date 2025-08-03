"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

type Comment = {
  id: string;
  content: string;
  createdAt: string;
  user?: { name?: string; image?: string };
  recipe?: { title: string };
};

export default function RecentComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get("/api/admin/comments");
        console.log(res.data.data);
        setComments(res.data.data);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Komentar Terbaru Pengguna</CardTitle>
        <CardDescription>
          Umpan balik terbaru dari pengguna website ini{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div
                key={i}
                className="flex items-start space-x-4 p-4 border rounded-lg"
              >
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
            ))
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-start space-x-4 p-4 border rounded-lg"
              >
                <Avatar>
                  <AvatarImage
                    src={comment.user?.image}
                    alt={comment.user?.name}
                  />
                  <AvatarFallback>{comment.user?.name?.[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{comment.user?.name}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {comment.content}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Resep : {comment.recipe?.title}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center">
              Belum ada komentar
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
