import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { contractType, userInput } = await req.json()

    const typeNameMap: Record<string, string> = {
      rent: '租赁合同',
      labor: '劳动合同',
      sales: '购销合同',
      service: '服务合同',
      loan: '借款合同',
      other: '其他合同',
    }
    const typeName = typeNameMap[contractType] || '合同'

    const prompt = `你是一位专业的合同法律专家。请根据以下需求生成一份完整的${typeName}。

需求描述：
${userInput}

要求：
1. 包含合同双方基本信息（甲方、乙方）
2. 包含主要条款：合同标的、价款、履行期限、违约责任、争议解决
3. 语言规范、严谨，符合法律文书格式
4. 条款清晰，保护双方合法权益
5. 结尾留出双方签字盖章位置

只返回合同内容，不要有其他说明。`

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
    console.error('生成合同错误:', error)
    return NextResponse.json({ error: '生成失败，请重试' }, { status: 500 })
  }
}