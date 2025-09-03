"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";

type CommentType = {
  id: string;
  content: string;
};

type EditDialogProps = {
  open: boolean;
  onClose: () => void;
  comment: CommentType | null;
  onUpdated: () => void;
};

export function EditCommentDialog({
  open,
  onClose,
  comment,
  onUpdated
}: EditDialogProps) {
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    if (comment) {
      setNewContent(comment.content);
    }
  }, [comment]);

  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!comment) return;

    setLoading(true);
    try {
      await axiosInstance.patch(`/api/user/me/comments/${comment.id}`, {
        content: newContent
      });
      toast.success("Komentar berhasil diubah");
      onUpdated();
      onClose();
    } catch (error) {
      console.error("Gagal update komentar", error);
      toast.error("Gagal mengubah komentar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Komentar</DialogTitle>
        </DialogHeader>

        <Textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="min-h-[100px]"
          placeholder="Tulis komentar..."
        />

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Mengupdate..." : "Update Komentar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
