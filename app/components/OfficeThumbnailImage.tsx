'use client'

import { useState } from 'react'

export default function OfficeThumbnailImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  if (hasError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          className="w-16 h-16 text-gray-300 group-hover:text-indigo-400 transition"
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
    <>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover rounded cursor-pointer"
        onClick={() => setIsOpen(true)}
        onError={() => setHasError(true)}
      />
      {/* 放大弹窗 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={src}
              alt={alt}
              className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain"
              style={{ width: 'auto', height: 'auto' }}
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl bg-black/50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  )
}