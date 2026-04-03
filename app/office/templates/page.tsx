import { Suspense } from 'react'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import TemplatesContent from './TemplatesContent'

function getTemplates() {
  const templatesDir = path.join(process.cwd(), 'public', 'templates', 'office')
  const files = fs.readdirSync(templatesDir)
  const docFiles = files.filter(file => 
    (file.endsWith('.doc') || file.endsWith('.docx') || file.endsWith('.xls') || file.endsWith('.xlsx')) && !file.includes('thumbnails')
  )
  
  return docFiles.map((file, index) => ({
    id: index + 1,
    name: file.replace(/\.(doc|docx|xls|xlsx)$/, ''),
    fileName: file,
    downloadUrl: `/templates/office/${file}`,
  }))
}

export default async function OfficeTemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>
}) {
  const templates = getTemplates()
  const params = await searchParams
  const searchKeyword = params.search?.trim() || ''
  const currentPage = params.page ? parseInt(params.page) : 1

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-700">
            ← 文书小铺
          </Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Suspense fallback={<div className="text-center py-20">加载中...</div>}>
          <TemplatesContent 
            templates={templates}
            searchKeyword={searchKeyword}
            currentPage={currentPage}
          />
        </Suspense>
      </div>
    </main>
  )
}