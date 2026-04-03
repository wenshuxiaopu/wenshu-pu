'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import Pagination from '@/app/components/Pagination'
import Link from 'next/link'
import ThumbnailImage from '../components/ThumbnailImage'

interface Template {
  id: number
  name: string
  fileName: string
  downloadUrl: string
}

interface TemplatesContentProps {
  templates: Template[]
  searchKeyword: string
  currentPage: number
}

export default function TemplatesContent({ templates, searchKeyword, currentPage }: TemplatesContentProps) {
  const [remainingCount, setRemainingCount] = useState<number | null>(null)
  const itemsPerPage = 15

  useEffect(() => {
    const fetchRemainingCount = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const today = new Date().toISOString().split('T')[0]
      const { data: record } = await supabase
        .from('user_daily_downloads')
        .select('download_count')
        .eq('user_id', user.id)
        .eq('download_date', today)
        .single()
      const count = record?.download_count || 0
      setRemainingCount(3 - count)
    }
    fetchRemainingCount()
  }, [])

  let filteredTemplates = templates
  if (searchKeyword) {
    filteredTemplates = filteredTemplates.filter(t =>
      t.name.toLowerCase().includes(searchKeyword.toLowerCase())
    )
  }

  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTemplates = filteredTemplates.slice(startIndex, endIndex)

  const buildUrl = (newParams: Record<string, string>) => {
    const urlParams = new URLSearchParams()
    if (searchKeyword) urlParams.set('search', searchKeyword)
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) urlParams.set(key, value)
      else urlParams.delete(key)
    })
    const query = urlParams.toString()
    return `/templates${query ? `?${query}` : ''}`
  }

  const handleDownload = async (fileUrl: string) => {
    const res = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileUrl })
    })
    const data = await res.json()
    if (data.error) {
      alert(data.error)
    } else {
      // 更新剩余次数
      setRemainingCount(prev => prev !== null ? prev - 1 : null)
      window.location.href = fileUrl
    }
  }

  return (
    <>
      {/* 剩余次数提示 */}
      {remainingCount !== null && (
        <div className="mb-4 text-center">
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm ${remainingCount > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            📥 今日剩余免费下载次数：{remainingCount}
          </span>
        </div>
      )}

      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">简历模板下载</h1>
        <p className="text-gray-600">Word 格式，直接编辑，一键下载</p>
        <div className="mt-4 inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm">
          <span className="font-medium">共 {filteredTemplates.length} 套模板</span>
          <span>•</span>
          <span>每页 {itemsPerPage} 个</span>
        </div>
      </div>

      <div className="mb-8">
        <form action={buildUrl({ page: '1' })} method="get" className="flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            name="search"
            defaultValue={searchKeyword}
            placeholder="搜索模板名称..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">搜索</button>
          {searchKeyword && (
            <Link href="/templates" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">清空</Link>
          )}
        </form>
      </div>

      {searchKeyword && (
        <div className="text-center mb-4 text-sm text-gray-500">
          找到 <span className="font-medium text-blue-600">{filteredTemplates.length}</span> 个包含“<span className="font-medium">{searchKeyword}</span>”的模板
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {currentTemplates.map((template) => (
          <div key={template.id} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100 hover:border-blue-200">
            <div className="aspect-[3/4] bg-gray-50 flex items-center justify-center p-4 group-hover:bg-blue-50 transition overflow-hidden relative">
              <ThumbnailImage src={`/templates/resume/thumbnails/${encodeURIComponent(template.name)}.jpg`} alt={template.name} />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm text-gray-800 truncate" title={template.name}>{template.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => handleDownload(template.downloadUrl)}
                  className="text-blue-600 text-xs font-medium hover:text-blue-700"
                >
                  立即下载
                </button>
                <span className="text-[11px] text-gray-400">Word</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500">没有找到相关模板</p>
          <Link href="/templates" className="mt-3 inline-block text-blue-600 text-sm hover:underline">清空筛选条件</Link>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          baseUrl="/templates" 
        />
      )}

      <div className="mt-12 text-center text-sm text-gray-500 border-t pt-8">
        <p>所有模板均为 Word 格式，可直接编辑修改</p>
        <p className="mt-1">下载后如遇排版问题，建议用 Microsoft Word 打开</p>
      </div>
    </>
  )
}