import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { originalText } = await req.json()

    const prompt = `你是一位专业的合同法律专家。请对以下合同进行优化，提升条款的专业性和严谨性。

原合同：
${originalText}

要求：
1. 保持合同主要条款不变
2. 语言更规范、严谨
3. 补充可能遗漏的条款（违约责任、争议解决、送达地址等）
4. 条款表述更清晰，避免歧义
5. 保护双方合法权益

只返回优化后的合同内容，不要有其他说明。`

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    })

    const data = await response.json()

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 })
    }

    const result = data.choices[0].message.content

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('合同优化错误:', error)
    return NextResponse.json({ error: '优化失败，请重试' }, { status: 500 })
  }
}