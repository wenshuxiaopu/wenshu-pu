import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const { content, rating } = await req.json()
    
    const supabase = await createClient()
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: '请先登录' }, { status: 401 })
    }
    
    const { data, error } = await supabase
      .from('feedbacks')
      .insert([{ user_id: user.id, user_name: user.email, content, rating }])
      .select()
    
    if (error) throw error
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('提交反馈错误:', error)
    return NextResponse.json({ error: '提交失败' }, { status: 500 })
  }
}