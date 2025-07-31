"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { cn } from "@/lib/utils";
import { ImageUploadProps } from "@/lib/types/type";

export function ImageUpload({
  value = [],
  onChange,
  folder = "general",
  className,
  disabled = false
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled) return;

      const filesToUpload = acceptedFiles.slice(0);

      if (filesToUpload.length === 0) {
        toast.error("Gambar belum terupload");
        return;
      }

      setIsUploading(true);
      const newUrls: string[] = [];

      try {
        for (const file of filesToUpload) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("folder", folder);

          setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData
          });

          if (!response.ok) {
            const error = await response.json();
            console.log("Upload error, response: ", error);
            throw new Error(error.error || "Upload failed");
          }

          const result = await response.json();
          newUrls.push(result.url);

          setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
        }

        onChange([...value, ...newUrls]);
        toast.success(`${newUrls.length} gambar berhasil terupload`);
      } catch (error) {
        console.error("Upload error", error);
        toast.error("Gagal mengupload gambar");
      } finally {
        setIsUploading(false);
        setUploadProgress({});
      }
    },
    [value, onChange, folder, disabled]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"]
    },
    disabled: disabled || isUploading
  });

  const removeImage = (index: number) => {
    if (disabled) return;
    const newUrls = value.filter((_, i) => i !== index);
    onChange(newUrls);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Card
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25",
          disabled && "opacity-50 cursor-not-allowed",
          isUploading && "pointer-events-none"
        )}
      >
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <input {...getInputProps()} />

          {isUploading ? (
            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground mb-4" />
          ) : (
            <Upload className="h-10 w-10 text-muted-foreground mb-4" />
          )}

          <div className="space-y-2">
            <p className="text-sm font-medium">
              {isUploading
                ? "Mengupload Gambar"
                : isDragActive
                ? "Lepaskan gambar disini"
                : "Drag & drop gambar atau klik untuk memilih"}
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, JPEG, WebP (max 5MB)
            </p>
          </div>

          {!isUploading && (
            <Button
              type="button"
              variant={"outline"}
              size={"sm"}
              className="mt-4"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Pilih Gambar
            </Button>
          )}
        </CardContent>
      </Card>

      {Object.keys(uploadProgress).length > 0 && (
        <div className="space-y-2">
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div key={fileName} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="truncate">{fileName}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <span
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview */}
      {/* Preview Images */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {value.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square overflow-hidden rounded-lg border">
                <img
                  src={url}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {!disabled && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
