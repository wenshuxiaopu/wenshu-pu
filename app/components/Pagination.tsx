'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Pagination({ currentPage, totalPages, baseUrl }: { currentPage: number; totalPages: number; baseUrl: string }) {
  const [jumpPage, setJumpPage] = useState('')

  const buildUrl = (page: number) => {
    return `${baseUrl}?page=${page}`
  }

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault()
    const page = parseInt(jumpPage)
    if (page >= 1 && page <= totalPages) {
      window.location.href = buildUrl(page)
    }
  }

  return (
    <div className="flex justify-center items-center gap-3 mt-8 flex-wrap">
      <Link
        href={buildUrl(1)}
        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
      >
        首页
      </Link>
      <Link
        href={buildUrl(currentPage - 1)}
        className={`px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}`}
      >
        上一页
      </Link>
      <span className="text-sm text-gray-600">
        第 {currentPage} / {totalPages} 页
      </span>
      <Link
        href={buildUrl(currentPage + 1)}
        className={`px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50 ${currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}`}
      >
        下一页
      </Link>
      <Link
        href={buildUrl(totalPages)}
        className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
      >
        末页
      </Link>

      <form onSubmit={handleJump} className="flex items-center gap-2">
        <input
          type="number"
          value={jumpPage}
          onChange={(e) => setJumpPage(e.target.value)}
          min="1"
          max={totalPages}
          className="w-16 px-2 py-1 border border-gray-300 rounded-lg text-sm text-center"
          placeholder="页"
        />
        <button
          type="submit"
          className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
        >
          跳转
        </button>
      </form>
    </div>
  )
}