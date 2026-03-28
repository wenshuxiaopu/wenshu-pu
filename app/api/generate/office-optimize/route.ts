import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { originalText } = await req.json()

    const prompt = `你是一位专业的文案优化专家。请对以下文案进行优化润色，提升专业度和可读性。

原文案：
${originalText}

要求：
1. 保持原意不变
2. 语言更专业、简洁
3. 结构更清晰，适当分段
4. 去除冗余词句
5. 如果是办公文案，用词要正式

只返回优化后的文案，不要有其他说明。`

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
        max_tokens: 2000,
      }),
    })

    const data = await response.json()

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 })
    }

    const result = data.choices[0].message.content

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('文案优化错误:', error)
    return NextResponse.json({ error: '优化失败，请重试' }, { status: 500 })
  }
}