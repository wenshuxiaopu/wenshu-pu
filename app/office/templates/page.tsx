import { Suspense } from 'react'
import Link from 'next/link'
import TemplatesContent from './TemplatesContent'
import officeTemplates from '@/data/office-templates.json'

export default async function OfficeTemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>
}) {
  const templates = officeTemplates
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
        <TemplatesContent
          templates={templates}
          searchKeyword={searchKeyword}
          currentPage={currentPage}
        />
      </div>
    </main>
  )
}