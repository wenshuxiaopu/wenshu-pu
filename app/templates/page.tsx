import fs from 'fs'
import path from 'path'
import { Suspense } from 'react'
import Link from 'next/link'
import TemplatesContent from './TemplatesContent'

function getTemplates() {
  const templatesDir = path.join(process.cwd(), 'public', 'templates', 'resume')
  const files = fs.readdirSync(templatesDir)
  const docxFiles = files.filter(file => file.endsWith('.docx') && !file.includes('thumbnails'))
  
  return docxFiles.map((file, index) => ({
    id: index + 1,
    name: file.replace('.docx', ''),
    fileName: file,
    downloadUrl: `/templates/resume/${file}`,
  }))
}

// 这个组件负责读取 searchParams 并渲染内容
async function TemplatesPageContent({
  searchParamsPromise,
  templates,
}: {
  searchParamsPromise: Promise<{ page?: string; search?: string }>
  templates: any[]
}) {
  const params = await searchParamsPromise
  const searchKeyword = params.search?.trim() || ''
  const currentPage = params.page ? parseInt(params.page) : 1

  return (
    <TemplatesContent
      templates={templates}
      searchKeyword={searchKeyword}
      currentPage={currentPage}
    />
  )
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>
}) {
  const templates = getTemplates()

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
            ← 文书小铺
          </Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Suspense fallback={<div className="text-center py-20">加载中...</div>}>
          <TemplatesPageContent searchParamsPromise={searchParams} templates={templates} />
        </Suspense>
      </div>
    </main>
  )
}