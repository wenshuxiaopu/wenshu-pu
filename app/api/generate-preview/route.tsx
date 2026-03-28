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

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>预览</title>
<style>
body {
  font-family: system-ui, sans-serif;
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
}
.content {
  white-space: pre-wrap;
  line-height: 1.6;
  color: #1f2937;
}
</style>
</head>
<body>
<div class="card">
<div class="watermark-overlay"></div>
<div class="watermark-text">文书小铺·预览</div>
<div class="content">
${safeContent.replace(/\n/g, '<br>')}
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