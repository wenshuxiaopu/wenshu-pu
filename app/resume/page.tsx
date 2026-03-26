import Link from 'next/link'
import { FileText, Sparkles } from 'lucide-react'

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">简历服务</h1>
          <p className="text-gray-600">选择你需要的服务</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* 模板下载卡片 */}
          <Link href="/templates" className="group">
            <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition">
                <FileText size={32} className="text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">简历模板下载</h2>
              <p className="text-gray-500 text-sm mb-4">249套Word模板，一键下载</p>
              <span className="text-blue-600 font-medium">立即查看 →</span>
            </div>
          </Link>

          {/* AI优化卡片 */}
          <Link href="/resume/optimize" className="group">
            <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition">
                <Sparkles size={32} className="text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">AI简历优化</h2>
              <p className="text-gray-500 text-sm mb-4">HR专家级优化，¥6.9/次</p>
              <span className="text-purple-600 font-medium">立即体验 →</span>
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}