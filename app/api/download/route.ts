import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const cookieStore = await cookies()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 })
  }
  
  const today = new Date().toISOString().split('T')[0]
  
  // 先查询今日次数
  const { data: existing } = await supabase
    .from('user_daily_downloads')
    .select('download_count')
    .eq('user_id', user.id)
    .eq('download_date', today)
    .single()
  
  const currentCount = existing?.download_count || 0
  
  if (currentCount >= 3) {
    return NextResponse.json({ error: '今日免费次数已用完' }, { status: 403 })
  }
  
  // 插入或更新
  const { error } = await supabase
    .from('user_daily_downloads')
    .upsert(
      {
        user_id: user.id,
        download_date: today,
        download_count: currentCount + 1,
      },
      {
        onConflict: 'user_id,download_date',
      }
    )
  
  if (error) {
    console.error('Upsert error:', error)
    return NextResponse.json({ error: '更新失败' }, { status: 500 })
  }
  
  return NextResponse.json({ success: true, count: currentCount + 1 })
}