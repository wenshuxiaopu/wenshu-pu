// app/page.tsx
import Link from 'next/link'
import { FileText, Heart, FileSignature, BookOpen } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 导航栏 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">📄 文书小铺</h1>
          <div className="space-x-4 text-gray-600">
            <a href="#features" className="hover:text-blue-600">功能</a>
            <a href="#pricing" className="hover:text-blue-600">价格</a>
            <a href="/login" className="text-blue-600 font-medium">登录</a>
          </div>
        </div>
      </nav>

      {/* 英雄区 */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          让AI帮你写文书
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          简历、情书、合同、检讨书……1分钟生成，一杯奶茶钱
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/resume/new" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition"
          >
            立即体验
          </Link>
          <a 
            href="#features" 
            className="border border-gray-300 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-50 transition"
          >
            看看能做什么
          </a>
        </div>
      </section>

      {/* 功能卡片区 */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">我们的服务</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 简历卡片 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="text-blue-600" size={24} />
            </div>
            <h4 className="text-xl font-semibold mb-2">简历优化</h4>
            <p className="text-gray-600 mb-4">AI帮你优化简历，突出亮点，让HR一眼看到你</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-600">¥19.9</span>
              <Link href="/resume/new" className="text-blue-600 hover:underline">开始使用 →</Link>
            </div>
          </div>

          {/* 情书卡片 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="text-pink-600" size={24} />
            </div>
            <h4 className="text-xl font-semibold mb-2">情书</h4>
            <p className="text-gray-600 mb-4">定制专属情书，打动TA的心，再也不用憋字了</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-pink-600">¥4.9</span>
              <Link href="/loveletter/new" className="text-pink-600 hover:underline">开始使用 →</Link>
            </div>
          </div>

          {/* 合同卡片 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <FileSignature className="text-green-600" size={24} />
            </div>
            <h4 className="text-xl font-semibold mb-2">租房合同</h4>
            <p className="text-gray-600 mb-4">AI生成标准合同，租房不被坑，权益有保障</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-green-600">¥9.9</span>
              <Link href="/contract/new" className="text-green-600 hover:underline">开始使用 →</Link>
            </div>
          </div>

          {/* 检讨书卡片 */}
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="text-yellow-600" size={24} />
            </div>
            <h4 className="text-xl font-semibold mb-2">检讨书</h4>
            <p className="text-gray-600 mb-4">老师看了都感动的检讨书，诚恳不重样</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-yellow-600">¥9.9</span>
              <Link href="/review/new" className="text-yellow-600 hover:underline">开始使用 →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 价格说明区 */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 py-16 bg-white rounded-2xl shadow-sm my-8">
        <h3 className="text-3xl font-bold text-center mb-6">明码标价，按次付费</h3>
        <p className="text-center text-gray-600 mb-8">没有会员套路，用一次付一次</p>
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-lg">📄 简历优化</span>
            <span className="text-xl font-bold text-blue-600">¥19.9/次</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-lg">❤️ 情书</span>
            <span className="text-xl font-bold text-pink-600">¥4.9/次</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-lg">📝 租房合同</span>
            <span className="text-xl font-bold text-green-600">¥9.9/次</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-lg">📚 检讨书</span>
            <span className="text-xl font-bold text-yellow-600">¥9.9/次</span>
          </div>
        </div>
      </section>

      {/* 底部 */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-500">
          <p>© 2026 文书小铺 · 让AI帮你写文书</p>
          <p className="text-sm mt-2">沪ICP备2026000000号</p>
        </div>
      </footer>
    </main>
  )
}