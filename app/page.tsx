// app/page.tsx
import Link from 'next/link'
import { FileText, Heart, FileSignature, BookOpen, Sparkles, Users, Star, ArrowRight } from 'lucide-react'

export default function Home() {
  // 降价30%后的新价格
  const prices = {
    resume: 13.9,    // 原19.9 ↓30%
    love: 3.4,        // 原4.9 ↓30%
    contract: 6.9,    // 原9.9 ↓30%
    review: 6.9       // 原9.9 ↓30%
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      
      {/* 导航栏 */}
      <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="text-blue-600" size={24} />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              文书小铺
            </h1>
          </div>
          <div className="space-x-6 text-gray-600">
            <a href="#features" className="hover:text-blue-600 transition">功能</a>
            <a href="#cases" className="hover:text-blue-600 transition">案例</a>
            <a href="#pricing" className="hover:text-blue-600 transition">价格</a>
            <a href="/login" className="text-blue-600 font-medium hover:text-blue-700 transition">登录</a>
          </div>
        </div>
      </nav>

      {/* 英雄区（加大加粗） */}
      <section className="max-w-6xl mx-auto px-4 py-24 text-center relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
        </div>
        
        <h2 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
          让AI帮你写<span className="text-blue-600">文书</span>
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          简历、情书、合同、检讨书……<br />1分钟生成，一杯奶茶钱，不满意随时重来
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/resume/new" 
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            免费试用 →
          </Link>
          <a 
            href="#features" 
            className="border-2 border-gray-300 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition"
          >
            看看能做什么
          </a>
        </div>
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">
          <Users size={20} />
          <span>已有 1,200+ 用户使用</span>
        </div>
      </section>

      {/* 功能卡片区（加了动画和图标） */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-20">
        <h3 className="text-4xl font-bold text-center mb-4">我们的服务</h3>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          四种常用文书，AI帮你写得又快又好
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 简历卡片 */}
          <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="text-blue-600" size={28} />
            </div>
            <h4 className="text-xl font-semibold mb-2">简历优化</h4>
            <p className="text-gray-600 mb-4 text-sm">AI帮你优化简历，突出亮点，让HR一眼看到你</p>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-blue-600">¥{prices.resume}</span>
                <span className="text-gray-400 text-sm line-through ml-2">¥19.9</span>
              </div>
              <Link href="/resume/new" className="text-blue-600 hover:underline flex items-center gap-1">
                开始 <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* 情书卡片 */}
          <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-pink-200">
            <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Heart className="text-pink-600" size={28} />
            </div>
            <h4 className="text-xl font-semibold mb-2">情书</h4>
            <p className="text-gray-600 mb-4 text-sm">定制专属情书，打动TA的心，再也不用憋字了</p>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-pink-600">¥{prices.love}</span>
                <span className="text-gray-400 text-sm line-through ml-2">¥4.9</span>
              </div>
              <Link href="/loveletter/new" className="text-pink-600 hover:underline flex items-center gap-1">
                开始 <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* 合同卡片 */}
          <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-green-200">
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileSignature className="text-green-600" size={28} />
            </div>
            <h4 className="text-xl font-semibold mb-2">租房合同</h4>
            <p className="text-gray-600 mb-4 text-sm">AI生成标准合同，租房不被坑，权益有保障</p>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-green-600">¥{prices.contract}</span>
                <span className="text-gray-400 text-sm line-through ml-2">¥9.9</span>
              </div>
              <Link href="/contract/new" className="text-green-600 hover:underline flex items-center gap-1">
                开始 <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* 检讨书卡片 */}
          <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-yellow-200">
            <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BookOpen className="text-yellow-600" size={28} />
            </div>
            <h4 className="text-xl font-semibold mb-2">检讨书</h4>
            <p className="text-gray-600 mb-4 text-sm">老师看了都感动的检讨书，诚恳不重样</p>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-yellow-600">¥{prices.review}</span>
                <span className="text-gray-400 text-sm line-through ml-2">¥9.9</span>
              </div>
              <Link href="/review/new" className="text-yellow-600 hover:underline flex items-center gap-1">
                开始 <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 案例区（无图版，用图标代替） */}
      <section id="cases" className="max-w-6xl mx-auto px-4 py-20 bg-gray-50 rounded-3xl my-8">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold mb-4">用户真实案例</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            看看他们用文书小铺写了什么（图片正在收集中，先用图标展示）
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 案例1 - 简历 */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="text-blue-600" size={32} />
            </div>
            <h4 className="font-semibold text-lg mb-1">张同学 · 应届生</h4>
            <p className="text-gray-500 text-sm mb-3">“优化后一周拿到3个面试”</p>
            <div className="flex justify-center gap-1 text-yellow-400 mb-3">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full">简历优化</span>
          </div>

          {/* 案例2 - 情书 */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-center">
            <div className="w-20 h-20 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Heart className="text-pink-600" size={32} />
            </div>
            <h4 className="font-semibold text-lg mb-1">李先生 · 恋爱纪念</h4>
            <p className="text-gray-500 text-sm mb-3">“女朋友说这是最用心的礼物”</p>
            <div className="flex justify-center gap-1 text-yellow-400 mb-3">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <span className="text-xs bg-pink-50 text-pink-600 px-3 py-1 rounded-full">情书</span>
          </div>

          {/* 案例3 - 合同 */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileSignature className="text-green-600" size={32} />
            </div>
            <h4 className="font-semibold text-lg mb-1">王小姐 · 租房族</h4>
            <p className="text-gray-500 text-sm mb-3">“房东说合同规范，押金全退”</p>
            <div className="flex justify-center gap-1 text-yellow-400 mb-3">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <span className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full">租房合同</span>
          </div>

          {/* 案例4 - 检讨书 */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-yellow-600" size={32} />
            </div>
            <h4 className="font-semibold text-lg mb-1">小刘 · 学生</h4>
            <p className="text-gray-500 text-sm mb-3">“老师没再叫家长，还夸我”</p>
            <div className="flex justify-center gap-1 text-yellow-400 mb-3">
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            <span className="text-xs bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full">检讨书</span>
          </div>
        </div>
      </section>

      {/* 价格说明区（已降价） */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 py-16 bg-white rounded-2xl shadow-sm my-8">
        <h3 className="text-3xl font-bold text-center mb-4">明码标价，按次付费</h3>
        <p className="text-center text-gray-600 mb-8">没有会员套路，用一次付一次</p>
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-lg flex items-center gap-2">
              <FileText size={18} className="text-blue-600" /> 简历优化
            </span>
            <div>
              <span className="text-xl font-bold text-blue-600">¥{prices.resume}</span>
              <span className="text-gray-400 text-sm line-through ml-2">¥19.9</span>
            </div>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-lg flex items-center gap-2">
              <Heart size={18} className="text-pink-600" /> 情书
            </span>
            <div>
              <span className="text-xl font-bold text-pink-600">¥{prices.love}</span>
              <span className="text-gray-400 text-sm line-through ml-2">¥4.9</span>
            </div>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-lg flex items-center gap-2">
              <FileSignature size={18} className="text-green-600" /> 租房合同
            </span>
            <div>
              <span className="text-xl font-bold text-green-600">¥{prices.contract}</span>
              <span className="text-gray-400 text-sm line-through ml-2">¥9.9</span>
            </div>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-lg flex items-center gap-2">
              <BookOpen size={18} className="text-yellow-600" /> 检讨书
            </span>
            <div>
              <span className="text-xl font-bold text-yellow-600">¥{prices.review}</span>
              <span className="text-gray-400 text-sm line-through ml-2">¥9.9</span>
            </div>
          </div>
        </div>
      </section>

      {/* 底部 */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-600">
            <div>
              <h5 className="font-bold text-gray-900 mb-3">文书小铺</h5>
              <p>让AI帮你写文书</p>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-3">功能</h5>
              <ul className="space-y-2">
                <li>简历优化</li>
                <li>情书</li>
                <li>租房合同</li>
                <li>检讨书</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-3">支持</h5>
              <ul className="space-y-2">
                <li>常见问题</li>
                <li>联系我们</li>
                <li>隐私政策</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-3">关于</h5>
              <ul className="space-y-2">
                <li>关于我们</li>
                <li>加入我们</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm mt-8 pt-8 border-t">
            © 2026 文书小铺 · 让AI帮你写文书 · 沪ICP备2026000000号
          </div>
        </div>
      </footer>
    </main>
  )
}