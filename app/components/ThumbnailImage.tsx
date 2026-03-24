'use client'

import { useState } from 'react'
import ImageModal from './ImageModal'

export default function ThumbnailImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-16 h-16 text-gray-300 group-hover:text-blue-400 transition"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
    )
  }

  return (
    <ImageModal src={src} alt={alt} />
  )
}