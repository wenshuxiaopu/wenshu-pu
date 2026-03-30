import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { content } = await req.json()

    const safeContent = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')

    // 按行分割
    const lines = safeContent.split('\n')
    let formattedContent = ''

    if (lines.length > 0) {
      // 第一行作为标题
      formattedContent += `<div class="contract-title">${lines[0]}</div>`
      // 其余行作为正文
      for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') {
          formattedContent += `<p>&nbsp;</p>`
        } else {
          formattedContent += `<p>${lines[i]}</p>`
        }
      }
    }

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>预览</title>
<style>
body {
  font-family: system-ui, 'Segoe UI', sans-serif;
  background: #f5f5f5;
  margin: 0;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card {
  max-width: 800px;
  width: 100%;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  padding: 40px;
  position: relative;
  overflow: hidden;
}
.watermark-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 2px, transparent 2px, transparent 8px);
  pointer-events: none;
}
.watermark-text {
  position: absolute;
  bottom: 20px;
  right: 20px;
  color: #ef4444;
  font-size: 24px;
  font-weight: bold;
  transform: rotate(-15deg);
  background: rgba(255,255,255,0.5);
  padding: 4px 12px;
  border-radius: 8px;
  z-index: 2;
  pointer-events: none;
}
.content {
  white-space: pre-wrap;
  line-height: 1.6;
  color: #1f2937;
  position: relative;
  z-index: 1;
}
.contract-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e5e7eb;
}
p {
  margin: 0 0 12px 0;
}
</style>
</head>
<body>
<div class="card">
<div class="watermark-overlay"></div>
<div class="watermark-text">文书小铺·预览</div>
<div class="content">
${formattedContent}
</div>
</div>
</body>
</html>`

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' },
    })
  } catch (error) {
    console.error('生成预览失败:', error)
    return NextResponse.json({ error: '生成失败' }, { status: 500 })
  }
}