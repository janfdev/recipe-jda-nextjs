"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { toast } from "react-toastify";
import { useState } from "react";

type DeleteDialogProps = {
  open: boolean;
  onClose: () => void;
  commentId: string | null;
  onDeleted: () => void;
};

export function DeleteCommentDialog({
  open,
  onClose,
  commentId,
  onDeleted
}: DeleteDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!commentId) return;

    setLoading(true);
    try {
      await axiosInstance.delete(`/api/my-comments/${commentId}`);
      toast.success("Komentar berhasil dihapus");
      onDeleted();
      onClose();
    } catch (error) {
      console.error("Gagal menghapus komentar", error);
      toast.error("Gagal menghapus komentar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Komentar</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground mb-4">
          Apakah kamu yakin ingin menghapus komentar ini? Tindakan ini tidak
          dapat dibatalkan.
        </p>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Menghapus..." : "Hapus Komentar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
