import Link from 'next/link'
import { FileText, PenTool, Sparkles } from 'lucide-react'

export default function OfficePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">日常办公服务</h1>
          <p className="text-gray-600">选择你需要的服务</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* 模板下载 */}
          <Link href="/office/templates" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition border border-gray-100">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-200 transition">
                <FileText size={32} className="text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">模板下载</h2>
              <p className="text-gray-500 text-sm mb-3">周报、月报、计划表模板</p>
              <span className="text-indigo-600 font-medium">¥0.9起 →</span>
            </div>
          </Link>

          {/* 办公文案写作 */}
          <Link href="/office/writing" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition">
                <PenTool size={32} className="text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">办公文案写作</h2>
              <p className="text-gray-500 text-sm mb-3">输入关键词，快速成文</p>
              <span className="text-purple-600 font-medium">¥6.9/次 →</span>
            </div>
          </Link>

          {/* 文案优化 */}
          <Link href="/office/optimize" className="group">
            <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition border border-gray-100">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition">
                <Sparkles size={32} className="text-amber-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">文案优化</h2>
              <p className="text-gray-500 text-sm mb-3">上传文案，优化润色</p>
              <span className="text-amber-600 font-medium">¥6.9/次 →</span>
            </div>
          </Link>
        </div>

        <div className="text-center mt-12">
          <Link href="/" className="text-gray-500 hover:text-indigo-600 text-sm">
            ← 返回首页
          </Link>
        </div>
      </div>
    </main>
  )
}