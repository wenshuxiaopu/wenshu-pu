'use client'

import { useState } from 'react'

export default function DownloadButton({ fileUrl }: { fileUrl: string }) {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    const res = await fetch('/api/download', { method: 'POST' })
    const data = await res.json()
    if (data.error) {
      alert(data.error)
      setDownloading(false)
      return
    }
    window.location.href = fileUrl
    setDownloading(false)
  }

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="text-blue-600 text-xs font-medium hover:text-blue-700 disabled:text-gray-400"
    >
      {downloading ? '处理中...' : '立即下载'}
    </button>
  )
}