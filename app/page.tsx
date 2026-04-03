'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import FeedbackForm from './components/FeedbackForm'
import Link from 'next/link'
import { FileText, Briefcase, FileSignature, PenTool, Sparkles, Users, ArrowRight, MessageSquare } from 'lucide-react'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleSearch = async () => {
    if (!searchKeyword.trim()) {
      setShowResults(false)
      return
    }
    const res = await fetch('/api/search?q=' + encodeURIComponent(searchKeyword))
    const data = await res.json()
    setSearchResults(data.results || [])
    setShowResults(true)
  }

  const handleFreeTrial = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }
    router.push('/free-trial')
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      
      {/* 导航栏 */}
      <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-1 md:gap-2">
            <img src="/images/logo.png" alt="文书小铺" className="h-8 md:h-14 w-auto" />
            <span className="text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              文书小铺
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition text-xs md:text-base">功能</a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition text-xs md:text-base">价格</a>
            {user ? (
              <>
                <span className="text-gray-600 text-xs md:text-base">你好，{user.email?.split('@')[0]}</span>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut()
                    router.push('/')
                  }}
                  className="text-red-600 text-xs md:text-base hover:text-red-700 transition"
                >
                  退出
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-blue-600 font-medium text-xs md:text-base hover:text-blue-700 transition">登录</Link>
                <button
                  onClick={handleFreeTrial}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                >
                  免费试用
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* 搜索框 */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="relative">
          <input 
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="搜索模板或服务..." 
            className="w-full px-5 py-4 text-base border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            onClick={handleSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-5 py-2 rounded-xl text-sm hover:bg-blue-700 transition"
          >
            搜索
          </button>
        </div>
        
        {/* 搜索结果 */}
        {showResults && (
          <div className="mt-4 bg-white rounded-xl shadow-lg p-4 max-h-96 overflow-auto">
            {searchResults.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-500 mb-3">未找到相关结果</p>
                <p className="text-sm text-gray-400">试试浏览我们的服务模块</p>
                <div className="flex justify-center gap-3 mt-3">
                  <a href="#features" className="text-blue-600 text-sm hover:underline">查看全部服务 →</a>
                </div>
              </div>
            ) : (
              (() => {
                const grouped: Record<string, any[]> = {}
                searchResults.forEach(item => {
                  const cat = item.category || (item.type === 'service' ? '服务' : '模板')
                  if (!grouped[cat]) grouped[cat] = []
                  grouped[cat].push(item)
                })
                return Object.entries(grouped).map(([cat, items]) => (
                  <div key={cat} className="mb-4">
                    <div className="font-semibold text-gray-700 mb-2">{cat}</div>
                    {items.map((item, idx) => (
                      <Link key={idx} href={item.link} className="block py-2 px-3 hover:bg-gray-100 rounded-lg transition">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                ))
              })()
            )}
          </div>
        )}

        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          <span className="text-sm text-gray-500">热门：</span>
          <button onClick={() => { setSearchKeyword('简历'); handleSearch() }} className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition">简历</button>
          <button onClick={() => { setSearchKeyword('周报'); handleSearch() }} className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition">周报</button>
          <button onClick={() => { setSearchKeyword('合同'); handleSearch() }} className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition">合同</button>
          <button onClick={() => { setSearchKeyword('情书'); handleSearch() }} className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition">情书</button>
          <button onClick={() => { setSearchKeyword('检讨书'); handleSearch() }} className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition">检讨书</button>
        </div>
      </div>

      {/* 英雄区 */}
      <section className="max-w-6xl mx-auto px-4 py-24 text-center relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
        </div>
        
        <h2 className="text-3xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          专业文书服务<br />
          <span className="text-blue-600">比通用AI工具更懂你</span>
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          简历、工作周报、合同协议、检讨书……<br />
          1分钟生成，不满意重写，服务有保障
        </p>
        <div className="flex gap-4 justify-center">
          <button 
            onClick={handleFreeTrial}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
          >
            免费试用 →
          </button>
          <a 
            href="#features" 
            className="border-2 border-gray-300 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition"
          >
            了解我们能做什么
          </a>
        </div>
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-500">
          <Users size={20} />
          <span>已有 1,200+ 用户使用</span>
        </div>
      </section>

      {/* 功能卡片区 */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-20">
        <h3 className="text-4xl font-bold text-center mb-4">我们为您提供</h3>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          每一份文书都经过专业优化，比通用工具更贴近真实场景
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* 简历卡片 */}
          <div className="group bg-blue-50 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100 hover:border-blue-200">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="text-blue-600" size={28} />
            </div>
            <h4 className="text-xl font-semibold mb-2">简历</h4>
            <p className="text-gray-600 mb-4 text-sm">简历投了没回音？我们帮你突出亮点，让HR一眼看到你</p>
            <Link href="/resume" className="inline-flex items-center gap-1 bg-white border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition">
              开始 <ArrowRight size={16} />
            </Link>
          </div>

          {/* 日常办公卡片 */}
          <div className="group bg-indigo-50 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100 hover:border-indigo-200">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Briefcase className="text-indigo-600" size={28} />
            </div>
            <h4 className="text-xl font-semibold mb-2">日常办公</h4>
            <p className="text-gray-600 mb-4 text-sm">周报、月报、述职报告，帮你节省时间，写出专业感</p>
            <Link href="/office" className="inline-flex items-center gap-1 bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-50 transition">
              开始 <ArrowRight size={16} />
            </Link>
          </div>

          {/* 合同协议卡片 */}
          <div className="group bg-emerald-50 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100 hover:border-emerald-200">
            <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileSignature className="text-emerald-600" size={28} />
            </div>
            <h4 className="text-xl font-semibold mb-2">合同协议</h4>
            <p className="text-gray-600 mb-4 text-sm">租房合同、劳动合同、借条，关键条款帮你把关</p>
            <Link href="/contract" className="inline-flex items-center gap-1 bg-white border border-emerald-600 text-emerald-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-50 transition">
              开始 <ArrowRight size={16} />
            </Link>
          </div>

          {/* 文书代写卡片 */}
          <div className="group bg-amber-50 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100 hover:border-amber-200">
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <PenTool className="text-amber-600" size={28} />
            </div>
            <h4 className="text-xl font-semibold mb-2">文书代写</h4>
            <p className="text-gray-600 mb-4 text-sm">情书、检讨书、感谢信，帮你把话说到点子上</p>
            <Link href="/writing" className="inline-flex items-center gap-1 bg-white border border-amber-600 text-amber-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-50 transition">
              开始 <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 热门推荐板块 */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">热门推荐</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1,2,3,4,5,6,7,8].map((i) => (
            <div key={i} className="group bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden cursor-pointer" onClick={() => window.open(`/images/hot/hot-${i}.jpg`, '_blank')}>
              <div className="aspect-[3/4] bg-gray-100">
                <img src={`/images/hot/hot-${i}.jpg`} alt={`热门推荐${i}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <div className="p-3 text-center">
                <p className="text-blue-600 text-sm">点击查看大图 →</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 价格说明区 */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 py-16 bg-white rounded-2xl shadow-sm my-8">
        <h3 className="text-3xl font-bold text-center mb-4">按次付费，无套路</h3>
        <p className="text-center text-gray-600 mb-8">用一次付一次，不满意随时重写</p>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 text-center">
              <p className="text-gray-600 mb-1">📄 简历模板 · 日常办公模板</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl font-bold text-blue-600">¥0.9</span>
                <span className="text-gray-400 line-through">¥9.9</span>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">限时特惠</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">Word格式，直接编辑，一键下载</p>
            </div>
            <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl p-6 text-center">
              <p className="text-gray-600 mb-1">📝 合同协议 · 文书代写模板</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-3xl font-bold text-emerald-600">¥1.9</span>
                <span className="text-gray-400 line-through">¥15.9</span>
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">限时特惠</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">Word格式，直接编辑，一键下载</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mt-4">
            <p className="text-center text-gray-500 mb-3">✍️ 需要更专业的文书？</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="bg-gray-50 rounded-lg px-4 py-2 text-center">
                <p className="text-sm text-gray-600">简历优化</p>
                <p className="text-lg font-semibold text-blue-600">¥6.9/次</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-4 py-2 text-center">
                <p className="text-sm text-gray-600">办公文书</p>
                <p className="text-lg font-semibold text-indigo-600">¥6.9/次</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-4 py-2 text-center">
                <p className="text-sm text-gray-600">合同定制</p>
                <p className="text-lg font-semibold text-emerald-600">¥6.9/次</p>
              </div>
              <div className="bg-gray-50 rounded-lg px-4 py-2 text-center">
                <p className="text-sm text-gray-600">文书代写</p>
                <p className="text-lg font-semibold text-amber-600">¥6.9/次</p>
              </div>
            </div>
            <p className="text-center text-gray-400 text-sm mt-4">模板下载后，可付费升级优化服务，不满意免费重写</p>
          </div>
        </div>
      </section>

      <FeedbackForm />
    
      {/* 反馈引导 */}
      <div className="max-w-2xl mx-auto text-center py-8 text-gray-500 text-sm">
        <MessageSquare size={18} className="inline mr-1" />
        有意见或建议？欢迎随时通过底部微信联系我们，您的每一条反馈我们都会认真对待。
      </div>

      {/* 底部 */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-600">
            <div>
              <h5 className="font-bold text-gray-900 mb-3">文书小铺</h5>
              <p>专业文书服务，比通用AI工具更懂你</p>
            </div>
            <div>
              <h5 className="font-bold text-gray-900 mb-3">功能</h5>
              <ul className="space-y-2">
                <li>简历</li>
                <li>日常办公</li>
                <li>合同协议</li>
                <li>文书代写</li>
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
            © 2025 文书小铺 · 沪ICP备2025071209号
          </div>
        </div>
      </footer>

      {/* 右下角微信二维码 */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 group">
        <div className="bg-white rounded-xl shadow-lg p-1 md:p-2 cursor-pointer hover:shadow-xl transition">
          <img 
            src="/images/wechat-qr.png" 
            alt="微信咨询" 
            className="w-16 h-16 md:w-48 md:h-48 object-contain"
          />
        </div>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
          扫码咨询
        </div>
      </div>
    </main>
  )
}