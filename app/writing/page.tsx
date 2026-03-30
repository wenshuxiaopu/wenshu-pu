import Link from 'next/link'
import { PenTool, Sparkles } from 'lucide-react'

export default function WritingPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">文书代写服务</h1>
          <p className="text-gray-600">情书、检讨书、感谢信、辞职信……帮你把话说到点子上</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* 文书代写 */}
          <Link href="/writing/generate" className="group">
            <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition border border-gray-100">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition">
                <PenTool size={32} className="text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">文书代写</h2>
              <p className="text-gray-500 text-sm mb-3">输入需求，超级AI帮你写</p>
              <span className="text-purple-600 font-medium">¥6.9/次 →</span>
            </div>
          </Link>

          {/* 文书优化 */}
          <Link href="/writing/optimize" className="group">
            <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition border border-gray-100">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition">
                <Sparkles size={32} className="text-amber-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">文书优化</h2>
              <p className="text-gray-500 text-sm mb-3">上传文书，超级AI优化润色</p>
              <span className="text-amber-600 font-medium">¥6.9/次 →</span>
            </div>
          </Link>
        </div>

        <div className="text-center mt-12">
          <Link href="/" className="text-gray-500 hover:text-purple-600 text-sm">
            ← 返回首页
          </Link>
        </div>
      </div>
    </main>
  )
}