import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { Suspense } from 'react'
import OfficeThumbnailImage from '@/app/components/OfficeThumbnailImage'
import Pagination from '@/app/components/Pagination'

function getTemplates() {
  const templatesDir = path.join(process.cwd(), 'public', 'templates', 'office')
  console.log('模板文件夹路径:', templatesDir)
  const files = fs.readdirSync(templatesDir)
  console.log('找到的文件数:', files.length)
  const docxFiles = files.filter(file => 
    (file.endsWith('.doc') || file.endsWith('.docx') || file.endsWith('.xls') || file.endsWith('.xlsx')) && !file.includes('thumbnails')
  )
  console.log('过滤后的文件数:', docxFiles.length)
  
  return docxFiles.map((file, index) => ({
    id: index + 1,
    name: file.replace(/\.(doc|docx|xls|xlsx)$/, ''),
    fileName: file,
    downloadUrl: `/templates/office/${file}`,
  }))
}

// 把需要 await searchParams 的部分抽出来
async function TemplatesContent({ searchParamsPromise }: { searchParamsPromise: Promise<{ page?: string }> }) {
  const params = await searchParamsPromise
  const allTemplates = getTemplates()
  
  const itemsPerPage = 15
  const currentPage = params.page ? parseInt(params.page) : 1
  const totalPages = Math.ceil(allTemplates.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTemplates = allTemplates.slice(startIndex, endIndex)

  const buildUrl = (page: number) => {
    return `/office/templates?page=${page}`
  }

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          日常办公模板下载
        </h1>
        <p className="text-gray-600">
          Word/Excel 格式，直接编辑，一键下载
        </p>
        <div className="mt-4 inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm">
          <span className="font-medium">共 {allTemplates.length} 套模板</span>
          <span>•</span>
          <span>每页 {itemsPerPage} 个</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {currentTemplates.map((template) => (
          <div
            key={template.id}
            className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-gray-100 hover:border-indigo-200"
          >
            <div className="aspect-[3/4] bg-gray-50 flex items-center justify-center p-4 group-hover:bg-indigo-50 transition overflow-hidden relative">
              <OfficeThumbnailImage
                src={`/templates/office/thumbnails/${encodeURIComponent(template.name)}.jpg`}
                alt={template.name}
              />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm text-gray-800 truncate" title={template.name}>
                {template.name}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <Link
                  href={template.downloadUrl}
                  className="text-indigo-600 text-xs font-medium hover:text-indigo-700"
                  download
                >
                  立即下载
                </Link>
                <span className="text-[11px] text-gray-400">
                  {template.fileName.endsWith('.doc') ? 'Word' : 
                   template.fileName.endsWith('.docx') ? 'Word' : 
                   template.fileName.endsWith('.xls') ? 'Excel' : 'Excel'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

   {totalPages > 1 && (
  <Pagination 
    currentPage={currentPage} 
    totalPages={totalPages} 
    baseUrl="/office/templates" 
  />
)}

      <div className="mt-12 text-center text-sm text-gray-500 border-t pt-8">
        <p>所有模板均为 Word/Excel 格式，可直接编辑修改</p>
        <p className="mt-1">下载后如遇排版问题，建议用 Microsoft Office 打开</p>
      </div>
    </>
  )
}

export default async function OfficeTemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
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
          <TemplatesContent searchParamsPromise={searchParams} />
        </Suspense>
      </div>
    </main>
  )
}