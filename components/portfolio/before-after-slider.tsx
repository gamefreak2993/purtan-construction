"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url";

interface BeforeAfterSliderProps {
  before: SanityImageSource;
  after: SanityImageSource;
  caption?: string;
}

export function BeforeAfterSlider({ before, after, caption }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [containerWidth, setContainerWidth] = useState<number | string>("100%");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setContainerWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const beforeUrl = urlFor(before).width(1200).height(800).url();
  const afterUrl = urlFor(after).width(1200).height(800).url();

  return (
    <div className="space-y-2">
      <div
        ref={containerRef}
        className="border-foreground/10 relative aspect-[3/2] cursor-col-resize overflow-hidden border-2 select-none"
        onMouseMove={handleMouseMove}
        onMouseDown={(e) => handleMove(e.clientX)}
        onTouchMove={handleTouchMove}
        onTouchStart={(e) => handleMove(e.touches[0].clientX)}
      >
        {/* After (full background) */}
        <Image src={afterUrl} alt="After" fill className="object-cover" />

        {/* Before (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
          <Image
            src={beforeUrl}
            alt="Before"
            fill
            className="object-cover"
            style={{ maxWidth: "none", width: containerWidth }}
          />
        </div>

        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 z-10 w-1 -translate-x-1/2 bg-amber-500"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg">
            <ChevronLeftRight className="h-5 w-5" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 z-10 bg-black/70 px-2 py-1 text-xs font-bold tracking-widest text-white uppercase">
          Before
        </div>
        <div className="absolute top-3 right-3 z-10 bg-black/70 px-2 py-1 text-xs font-bold tracking-widest text-white uppercase">
          After
        </div>
      </div>
      {caption && <p className="text-muted-foreground text-sm">{caption}</p>}
    </div>
  );
}

function ChevronLeftRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="7,9 4,12 7,15" />
      <polyline points="17,9 20,12 17,15" />
    </svg>
  );
}
