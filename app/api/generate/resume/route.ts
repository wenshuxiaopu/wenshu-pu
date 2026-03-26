import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { originalResume, targetJob, style } = await req.json()

    let stylePrompt = ''
    if (style === 'tech') {
      stylePrompt = '用大厂HR喜欢的风格，突出技术栈和项目成果，用STAR法则描述。'
    } else if (style === 'creative') {
      stylePrompt = '用创意风格，突出个性和独特视角，语言生动。'
    } else {
      stylePrompt = '用专业标准风格，突出工作成果和核心能力，用数据说话。'
    }

 const prompt = `你是一位有10年招聘经验的HR，帮求职者优化简历，目标是让HR看完就想约面试。

原简历：
${originalResume}

目标岗位：${targetJob}

优化要求：
${stylePrompt}

请按以下格式输出，标题用 ## 开头：

## 个人信息
姓名 | 电话 | 邮箱

## 为什么我适合这个岗位
（写一段话，直接点出你最匹配的2-3个能力）

## 工作经历
（按公司分，每条经历写“解决了什么问题 + 怎么做的 + 结果是什么”，每一条至少有一个数字）

## 项目经历
（按项目分，写角色和带来的变化）

## 技能清单
（5-8个关键词，根据目标岗位补充2-3个）

## 教育背景
学校 | 专业 | 时间

## 自我评价
（2行，简洁有力）`
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

    // 解析 AI 返回的 JSON
    let result
    try {
      result = JSON.parse(data.choices[0].message.content)
    } catch {
      // 如果不是 JSON，返回原始文本
     return NextResponse.json({ success: true, result: data.choices[0].message.content, isStructured: true })
    }

    return NextResponse.json({ success: true, result, isStructured: true })
  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json({ error: '生成失败，请重试' }, { status: 500 })
  }
}