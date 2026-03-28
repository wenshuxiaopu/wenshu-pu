import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { docType, userInput } = await req.json()

    const typeNameMap: Record<string, string> = {
      weekly: '周报',
      plan: '工作计划',
      notice: '通知公告',
      summary: '工作总结',
    }
    const typeName = typeNameMap[docType] || '文案'

    const prompt = `你是一位专业的办公文案写作专家。请根据以下需求生成一份${typeName}。

需求描述：
${userInput}

要求：
1. 标题要清晰醒目
2. 正文分段合理，条理清晰
3. 语言专业、简洁
4. 如果是周报/总结，要有数据支撑
5. 如果是通知，要包含执行时间、适用范围
6. 整体结构：标题 + 正文 + 落款（日期）

只返回文案内容，不要有其他说明。`

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
    console.error('生成文案错误:', error)
    return NextResponse.json({ error: '生成失败，请重试' }, { status: 500 })
  }
}