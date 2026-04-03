import { Suspense } from 'react'
import Link from 'next/link'
import TemplatesContent from './TemplatesContent'
import contractTemplates from '@/data/contract-templates.json'

export default async function ContractTemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>
}) {
  const templates = contractTemplates
  const params = await searchParams
  const searchKeyword = params.search?.trim() || ''
  const currentPage = params.page ? parseInt(params.page) : 1

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-xl font-bold text-emerald-600 hover:text-emerald-700">
            ← 文书小铺
          </Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Suspense fallback={<div className="text-center py-20">加载模板库...</div>}>
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