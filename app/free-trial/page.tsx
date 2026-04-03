import Link from 'next/link'
import { FileText, Briefcase, FileSignature } from 'lucide-react'

export default function FreeTrialPage() {
  const categories = [
    {
      name: "简历模板",
      icon: <FileText className="w-8 h-8 text-blue-600" />,
      bg: "bg-blue-50",
      href: "/templates",
      desc: "249套简历模板，Word格式",
      price: "¥0.9起"
    },
    {
      name: "日常办公模板",
      icon: <Briefcase className="w-8 h-8 text-indigo-600" />,
      bg: "bg-indigo-50",
      href: "/office/templates",
      desc: "134套周报、计划、总结模板",
      price: "¥0.9起"
    },
    {
      name: "合同协议模板",
      icon: <FileSignature className="w-8 h-8 text-emerald-600" />,
      bg: "bg-emerald-50",
      href: "/contract/templates",
      desc: "233套租赁、劳动、购销合同",
      price: "¥1.9起"
    }
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-700">
            ← 文书小铺
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            免费试用
          </h1>
          <p className="text-gray-600">
            每日3次免费下载，体验全部模板
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {categories.map((cat, idx) => (
            <Link key={idx} href={cat.href} className="group">
              <div className={`${cat.bg} rounded-xl p-6 text-center hover:shadow-lg transition`}>
                <div className="flex justify-center mb-4">
                  {cat.icon}
                </div>
                <h2 className="text-xl font-semibold mb-2">{cat.name}</h2>
                <p className="text-gray-600 text-sm mb-3">{cat.desc}</p>
                <span className="text-blue-600 font-medium">{cat.price} →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>每日免费下载3次，用完即止</p>
        </div>
      </div>
    </main>
  )
}