'use client'

import { useState } from 'react'

export default function ImageModal({ src, alt }: { src: string; alt: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* 缩略图 */}
      <div className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            const parent = e.currentTarget.parentElement
            if (parent) {
              const fallback = parent.querySelector('.fallback-icon')
              if (fallback) fallback.classList.remove('hidden')
            }
          }}
        />
      </div>

      {/* 弹窗 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={src}
              alt={alt}
              className="w-full h-full object-contain"
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