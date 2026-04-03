'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileText, Briefcase, FileSignature } from 'lucide-react'

export default function FreeTrialPage() {
  const router = useRouter()
  const [downloadCount, setDownloadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push('/login')
        return
      }
      const today = new Date().toISOString().split('T')[0]
      const { data: record } = await supabase
        .from('user_daily_downloads')
        .select('download_count')
        .eq('user_id', data.user.id)
        .eq('download_date', today)
        .single()
      setDownloadCount(record?.download_count || 0)
      setLoading(false)
    })
  }, [])

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

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </main>
    )
  }

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
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            免费试用
          </h1>
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm">
            <span>📥 今日剩余免费下载次数：</span>
            <span className="text-2xl font-bold">{3 - downloadCount}</span>
            <span>次</span>
          </div>
          <p className="text-gray-500 text-sm mt-2">每日3次免费下载，用完即止</p>
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
      </div>
    </main>
  )
}