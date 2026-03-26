import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.text()
  console.log('微信支付回调:', body)

  // TODO: 验证签名、更新订单状态

  return NextResponse.json({ code: 'SUCCESS', message: '成功' })
}