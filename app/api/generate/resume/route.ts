import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { originalResume, targetJob, style } = await req.json()

    // 构建提示词
    let stylePrompt = ''
    if (style === 'tech') {
      stylePrompt = '用大厂HR喜欢的风格，突出技术栈和项目成果，用STAR法则描述。'
    } else if (style === 'creative') {
      stylePrompt = '用创意风格，突出个性和独特视角，语言生动。'
    } else {
      stylePrompt = '用专业标准风格，突出工作成果和核心能力，用数据说话。'
    }

    const prompt = `你是一位资深HR，请帮我优化以下简历。

目标岗位：${targetJob}

原简历：
${originalResume}

优化要求：
${stylePrompt}

请返回优化后的简历，要求：
1. 突出与目标岗位匹配的关键词
2. 用数字量化成果
3. 语言精炼专业
4. 保持原简历的核心信息

只返回优化后的简历内容，不要有其他说明。`

    // 调用 DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'user', content: prompt }
        ],
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
    console.error('Generate error:', error)
    return NextResponse.json({ error: '生成失败，请重试' }, { status: 500 })
  }
}