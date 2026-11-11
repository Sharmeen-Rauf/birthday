"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  width,
  height,
  fill,
  className = "",
  priority = false,
  sizes,
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [hasError, setHasError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Fallback: if it was .jpg or .png, try .svg
      if (imgSrc.endsWith(".jpg") || imgSrc.endsWith(".png")) {
        const svgFallback = imgSrc.replace(/\.(jpg|png)$/, ".svg");
        setImgSrc(svgFallback);
      }
    }
  };

  return (
    <div className={`relative overflow-hidden ${fill ? "w-full h-full" : ""}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#10101C] animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#8B5CF6]/30 border-t-[#8B5CF6] rounded-full animate-spin" />
        </div>
      )}
      {fill ? (
        <Image
          src={imgSrc}
          alt={alt}
          fill
          sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
          priority={priority}
          className={`${className} transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
          onError={handleError}
          unoptimized={imgSrc.endsWith(".svg")}
        />
      ) : (
        <Image
          src={imgSrc}
          alt={alt}
          width={width || 600}
          height={height || 800}
          priority={priority}
          className={`${className} transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsLoading(false)}
          onError={handleError}
          unoptimized={imgSrc.endsWith(".svg")}
        />
      )}
    </div>
  );
};
