import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { writingType, userInput } = await req.json()

    const typeNameMap: Record<string, string> = {
      love: '情书',
      apology: '检讨书',
      thanks: '感谢信',
      resign: '辞职信',
      other: '文书',
    }
    const typeName = typeNameMap[writingType] || '文书'

    const prompt = `你是一位专业的文书写作专家。请根据以下需求写一封${typeName}。

需求：
${userInput}

要求：
1. 语言真诚、动人
2. 结构清晰，情感真挚
3. 如果是情书，要浪漫但不肉麻
4. 如果是检讨书，要诚恳但不卑微
5. 如果是感谢信，要得体但不客套
6. 如果是辞职信，要体面但不冷漠

只返回文书内容，不要有其他说明。`

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
        max_tokens: 1500,
      }),
    })

    const data = await response.json()

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 })
    }

    const result = data.choices[0].message.content

    return NextResponse.json({ success: true, result })
  } catch (error) {
    console.error('生成文书错误:', error)
    return NextResponse.json({ error: '生成失败，请重试' }, { status: 500 })
  }
}