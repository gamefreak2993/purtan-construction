"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SanityImageSource } from "@sanity/image-url";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImageGalleryProps {
  images: SanityImageSource[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null));
  const next = () => setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="bg-muted relative aspect-square cursor-pointer overflow-hidden rounded-md border transition-colors hover:border-primary"
          >
            <Image
              src={urlFor(image).width(600).height(600).url()}
              alt={`Gallery image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <Dialog open={lightboxIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
        <DialogContent className="max-w-[90vw] border-none bg-black/95 p-0 sm:max-w-[90vw]">
          <DialogTitle className="sr-only">
            Image {lightboxIndex !== null ? lightboxIndex + 1 : 0} of {images.length}
          </DialogTitle>
          {lightboxIndex !== null && (
            <div className="relative flex items-center justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 z-10 text-white hover:bg-white/20"
                onClick={prev}
                aria-label="Previous"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <div className="flex items-center justify-center p-4">
                <Image
                  src={urlFor(images[lightboxIndex]).width(1600).height(1200).url()}
                  alt={`Gallery image ${lightboxIndex + 1}`}
                  width={1600}
                  height={1200}
                  className="max-h-[80vh] w-auto object-contain"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 z-10 text-white hover:bg-white/20"
                onClick={next}
                aria-label="Next"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
              <div className="text-muted-foreground absolute bottom-2 text-sm">
                {lightboxIndex + 1} / {images.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
