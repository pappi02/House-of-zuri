"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-3 shadow-sm">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem]">
          <Image src={activeImage} alt={name} fill className="object-cover" />
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            aria-label={`Preview ${name}`}
            onClick={() => setActiveImage(image)}
            className={`relative h-20 w-20 overflow-hidden rounded-[1rem] border ${activeImage === image ? "border-stone-900" : "border-stone-200"}`}
          >
            <Image src={image} alt={`${name} thumbnail`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
