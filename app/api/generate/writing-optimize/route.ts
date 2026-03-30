import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { originalText } = await req.json()

    const prompt = `你是一位资深的文书写作专家。请对以下文书进行深度优化。

原文书：
${originalText}

优化要求：
1. 保持原意不变，但让语言更打动人心
2. 调整句子结构，使表达更流畅
3. 增加情感层次，让文字更有感染力
4. 删减冗余、啰嗦的部分
5. 如果原文有生硬之处，换成更自然的表达
6. 适当加入修辞手法（比喻、排比等）增强文采

请返回优化后的文书内容，不要有其他说明。`

    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
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
    console.error('文书优化错误:', error)
    return NextResponse.json({ error: '优化失败，请重试' }, { status: 500 })
  }
}