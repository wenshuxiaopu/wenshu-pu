// app/page.tsx
import Link from 'next/link'
import { FileText, Briefcase, FileSignature, PenTool, Sparkles, Users, Star, ArrowRight, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react'

export default function Home() {
  // 价格：原价 -> 现价
  const prices = {
    resume: { original: 9.9, current: 3.9 },
    office: { original: 15.9, current: 6.9 },
    contract: { original: 15.9, current: 6.9 },
    writing: { original: 15.9, current: 6.9 }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
      
      {/* 导航栏 */}
      <nav className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img 
              src="/images/logo.png" 
              alt="文书小铺" 
              className="h-14 w-auto"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              文书小铺
            </span>
          </div>
          <div className="space-x-6 text-gray-600">
            <a href="#features" className="hover:text-blue-600 transition">功能</a>
            <a href="#feedback" className="hover:text-blue-600 transition">评价</a>
            <a href="#pricing" className="hover:text-blue-600 transition">价格</a>
            <a href="/login" className="text-blue-600 font-medium hover:text-blue-700 transition">登录</a>
          </div>
        </div>
      </nav>

      {/* 搜索框 + 热门标签 */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="relative">
          <input 
            type="text" 
            placeholder="你想写什么？试试搜索：简历 会议纪要 租房合同 检讨书..." 
            className="w-full px-5 py-4 text-base border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-5 py-2 rounded-xl text-sm hover:bg-blue-700 transition">
            搜索
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          <span className="text-sm text-gray-500">热门：</span>
          <button className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition">简历</button>
          <button className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition">工作周报</button>
          <button className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition">租房合同</button>
          <button className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition">检讨书</button>
          <button className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition">辞职信</button>
        </div>
      </div>

      {/* 英雄区 */}
      <section className="max-w-6xl mx-auto px-4 py-24 text-center relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-30"></div>
        </div>
        
        <h2 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
          专业文书服务<br />
          <span className="text-blue-600">比通用工具更懂你</span>
        </h2>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          简历、工作周报、合同协议、检讨书……<br />
          1分钟生成，不满意重写，服务有保障
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
          <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100 hover:border-blue-200">
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText className="text-blue-600" size={28} />
            </div>
            <h4 className="text-xl font-semibold mb-2">简历</h4>
            <p className="text-gray-600 mb-4 text-sm">简历投了没回音？我们帮你突出亮点，让HR一眼看到你</p>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-blue-600">¥{prices.resume.current}</span>
                <span className="text-gray-400 text-sm line-through ml-2">¥{prices.resume.original}</span>
              </div>
              <Link href="/resume/new" className="text-blue-600 hover:underline flex items-center gap-1">
                开始 <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* 日常办公卡片 */}
          <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100 hover:border-indigo-200">
            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Briefcase className="text-indigo-600" size={28} />
            </div>
            <h4 className="text-xl font-semibold mb-2">日常办公</h4>
            <p className="text-gray-600 mb-4 text-sm">周报、月报、述职报告，帮你节省时间，写出专业感</p>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-indigo-600">¥{prices.office.current}</span>
                <span className="text-gray-400 text-sm line-through ml-2">¥{prices.office.original}</span>
              </div>
              <Link href="/office/new" className="text-indigo-600 hover:underline flex items-center gap-1">
                开始 <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* 合同协议卡片 */}
          <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100 hover:border-emerald-200">
            <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileSignature className="text-emerald-600" size={28} />
            </div>
            <h4 className="text-xl font-semibold mb-2">合同协议</h4>
            <p className="text-gray-600 mb-4 text-sm">租房合同、劳动合同、借条，关键条款帮你把关</p>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-emerald-600">¥{prices.contract.current}</span>
                <span className="text-gray-400 text-sm line-through ml-2">¥{prices.contract.original}</span>
              </div>
              <Link href="/contract/new" className="text-emerald-600 hover:underline flex items-center gap-1">
                开始 <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* 文书代写卡片 */}
          <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-100 hover:border-amber-200">
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <PenTool className="text-amber-600" size={28} />
            </div>
            <h4 className="text-xl font-semibold mb-2">文书代写</h4>
            <p className="text-gray-600 mb-4 text-sm">情书、检讨书、感谢信，帮你把话说到点子上</p>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-2xl font-bold text-amber-600">¥{prices.writing.current}</span>
                <span className="text-gray-400 text-sm line-through ml-2">¥{prices.writing.original}</span>
              </div>
              <Link href="/writing/new" className="text-amber-600 hover:underline flex items-center gap-1">
                开始 <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    
      {/* 价格说明区 */}
      <section id="pricing" className="max-w-6xl mx-auto px-4 py-16 bg-white rounded-2xl shadow-sm my-8">
        <h3 className="text-3xl font-bold text-center mb-4">按次付费，无套路</h3>
        <p className="text-center text-gray-600 mb-8">用一次付一次，不满意随时重写</p>
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-lg flex items-center gap-2">
              <FileText size={18} className="text-blue-600" /> 简历
            </span>
            <div>
              <span className="text-xl font-bold text-blue-600">¥{prices.resume.current}</span>
              <span className="text-gray-400 text-sm line-through ml-2">¥{prices.resume.original}</span>
            </div>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-lg flex items-center gap-2">
              <Briefcase size={18} className="text-indigo-600" /> 日常办公
            </span>
            <div>
              <span className="text-xl font-bold text-indigo-600">¥{prices.office.current}</span>
              <span className="text-gray-400 text-sm line-through ml-2">¥{prices.office.original}</span>
            </div>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-lg flex items-center gap-2">
              <FileSignature size={18} className="text-emerald-600" /> 合同协议
            </span>
            <div>
              <span className="text-xl font-bold text-emerald-600">¥{prices.contract.current}</span>
              <span className="text-gray-400 text-sm line-through ml-2">¥{prices.contract.original}</span>
            </div>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-lg flex items-center gap-2">
              <PenTool size={18} className="text-amber-600" /> 文书代写
            </span>
            <div>
              <span className="text-xl font-bold text-amber-600">¥{prices.writing.current}</span>
              <span className="text-gray-400 text-sm line-through ml-2">¥{prices.writing.original}</span>
            </div>
          </div>
        </div>
      </section>
  {/* 客户反馈区（代替案例区） */}
        {/* 意见反馈表单（演示用，不保存） */}
        <div className="max-w-2xl mx-auto mt-12 bg-white rounded-2xl p-6 shadow-sm">
          <h4 className="text-lg font-semibold mb-3">留下您的意见</h4>
          <textarea
            id="feedbackInput"
            rows={3}
            className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="夸夸我们，或者骂骂我们，我们都会认真看..."
          ></textarea>
          <button
            id="submitFeedbackBtn"
            className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-xl text-sm hover:bg-blue-700 transition"
          >
            提交反馈
          </button>
          <div id="feedbackDemoMsg" className="mt-4 text-sm text-gray-500"></div>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.getElementById('submitFeedbackBtn')?.addEventListener('click', function() {
                var input = document.getElementById('feedbackInput');
                var msgDiv = document.getElementById('feedbackDemoMsg');
                if (input && msgDiv) {
                  var val = input.value.trim();
                  if (val === '') {
                    msgDiv.innerHTML = '<span class="text-red-500">请填写内容再提交</span>';
                    return;
                  }
                  msgDiv.innerHTML = '<span class="text-green-600">✅ 已收到，感谢反馈！</span>';
                  input.value = '';
                  setTimeout(function() {
                    msgDiv.innerHTML = '';
                  }, 3000);
                }
              });
            `
          }}
        />
      <section id="feedback" className="max-w-6xl mx-auto px-4 py-20 bg-gray-50 rounded-3xl my-8">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold mb-4">您的反馈是我们前进的动力</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            做得好的请夸夸我们，做得不好的请尽情批评，我们一定改进
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* 正面反馈 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-green-500">
            <div className="flex items-center gap-2 mb-3">
              <ThumbsUp className="text-green-500" size={20} />
              <span className="text-sm text-green-600 font-medium">用户好评</span>
            </div>
            <p className="text-gray-700 mb-2">“简历改完立马收到面试邀约，HR说我写得超专业！”</p>
            <p className="text-gray-400 text-sm">—— 应届生 张同学</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-green-500">
            <div className="flex items-center gap-2 mb-3">
              <ThumbsUp className="text-green-500" size={20} />
              <span className="text-sm text-green-600 font-medium">用户好评</span>
            </div>
            <p className="text-gray-700 mb-2">“租房合同细节全，房东都说规范，押金顺利退回。”</p>
            <p className="text-gray-400 text-sm">—— 租客 王小姐</p>
          </div>

          {/* 负面反馈 */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-red-500">
            <div className="flex items-center gap-2 mb-3">
              <ThumbsDown className="text-red-500" size={20} />
              <span className="text-sm text-red-600 font-medium">用户建议</span>
            </div>
            <p className="text-gray-700 mb-2">“情书模板太大众化，希望能更个性化一点。”</p>
            <p className="text-gray-400 text-sm">—— 李先生</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border-l-4 border-red-500">
            <div className="flex items-center gap-2 mb-3">
              <ThumbsDown className="text-red-500" size={20} />
              <span className="text-sm text-red-600 font-medium">用户建议</span>
            </div>
            <p className="text-gray-700 mb-2">“合同模板有些条款不太适合我的情况，希望能自定义更多。”</p>
            <p className="text-gray-400 text-sm">—— 自由职业者 陈先生</p>
          </div>
        </div>

        {/* 鼓励反馈的说明 */}
        <div className="text-center mt-10 text-gray-500 text-sm">
          <MessageSquare size={18} className="inline mr-1" />
          有意见或建议？欢迎随时通过底部微信联系我们，您的每一条反馈我们都会认真对待。
        </div>
      </section>

      {/* 底部 */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-600">
            <div>
              <h5 className="font-bold text-gray-900 mb-3">文书小铺</h5>
              <p>专业文书服务，比通用工具更懂你</p>
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
            © 2025 文书小铺 · 沪ICP备2025123456号
          </div>
        </div>
      </footer>

      {/* 右下角微信二维码 */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <div className="bg-white rounded-xl shadow-lg p-2 cursor-pointer hover:shadow-xl transition">
          <img 
            src="/images/wechat-qr.png" 
            alt="微信咨询" 
            className="w-48 h-48 object-contain"
          />
        </div>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
          扫码咨询
        </div>
      </div>
    </main>
  )
}