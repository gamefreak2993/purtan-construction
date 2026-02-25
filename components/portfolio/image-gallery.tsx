"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { SanityImageSource } from "@sanity/image-url";

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
            className="border-foreground/10 relative aspect-square cursor-pointer overflow-hidden border-2 transition-colors hover:border-amber-500"
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

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-10 text-white/80 hover:text-white"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 z-10 text-white/80 hover:text-white"
            aria-label="Previous"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 z-10 text-white/80 hover:text-white"
            aria-label="Next"
          >
            <ChevronRight className="h-10 w-10" />
          </button>
          <div className="relative max-h-[85vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={urlFor(images[lightboxIndex]).width(1600).height(1200).url()}
              alt={`Gallery image ${lightboxIndex + 1}`}
              width={1600}
              height={1200}
              className="max-h-[85vh] w-auto object-contain"
            />
          </div>
          <div className="absolute bottom-6 text-sm font-bold tracking-widest text-white/60">
            {lightboxIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
