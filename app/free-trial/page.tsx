'use client'
import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function FreeTrialPage() {
  const router = useRouter()
 const [user, setUser] = useState<User | null>(null)
  const [downloadCount, setDownloadCount] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/login')
        return
      }
      setUser(data.user)
      fetchDownloadCount(data.user.id)
    })
  }, [])

  const fetchDownloadCount = async (userId: string) => {
    const today = new Date().toISOString().split('T')[0]
    const { data } = await supabase
      .from('user_daily_downloads')
      .select('download_count')
      .eq('user_id', userId)
      .eq('download_date', today)
      .single()
    
    setDownloadCount(data?.download_count || 0)
    setLoading(false)
  }

  const handleDownload = async () => {
    if (downloadCount >= 3) {
      alert('今日免费次数已用完，明日再来')
      return
    }
    router.push('/templates')
  }

  if (loading) {
    return <div className="text-center py-20">加载中...</div>
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">免费试用</h1>
          <p className="text-gray-600 mb-6">
            今日剩余免费下载次数：<span className="text-2xl font-bold text-blue-600">{3 - downloadCount}</span> 次
          </p>
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            立即下载模板
          </button>
          <p className="text-gray-400 text-sm mt-6">
            每日免费下载 3 次模板，无需付费
          </p>
          <Link href="/" className="block mt-8 text-blue-600 hover:underline">
            返回首页
          </Link>
        </div>
      </div>
    </main>
  )
}