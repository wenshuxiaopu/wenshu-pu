import { NextResponse } from 'next/server'
import puppeteer from 'puppeteer'
import sharp from 'sharp'

export async function POST(req: Request) {
  try {
    const { content } = await req.json()

    // HTML 模板
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>简历预览</title>
      <style>
        body {
          font-family: 'Segoe UI', 'Microsoft YaHei', sans-serif;
          background: #f5f5f5;
          padding: 40px;
          margin: 0;
        }
        .resume {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { font-size: 24px; color: #333; margin-bottom: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; }
        h2 { font-size: 18px; color: #3b82f6; margin: 20px 0 10px 0; }
        .section { margin-bottom: 20px; }
        .section-title { font-weight: bold; font-size: 16px; color: #333; margin-bottom: 10px; }
        .content { white-space: pre-wrap; line-height: 1.6; color: #555; }
        .info-row { margin-bottom: 8px; }
      </style>
    </head>
    <body>
      <div class="resume">
        ${content.replace(/\n/g, '<br>')}
      </div>
    </body>
    </html>
    `

    // 启动 Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page = await browser.newPage()
    await page.setViewport({ width: 800, height: 600 })
    await page.setContent(html)

    // 截图
    const screenshot = await page.screenshot({ type: 'jpeg', quality: 90 })
    await browser.close()

    // 加水印
    const watermarked = await sharp(screenshot)
      .composite([{
        input: Buffer.from(`
          <svg width="800" height="600">
            <text x="50%" y="50%" text-anchor="middle" fill="rgba(0,0,0,0.2)" font-size="32" transform="rotate(-20, 400, 300)">文书小铺·预览</text>
          </svg>
        `),
        blend: 'over'
      }])
      .toBuffer()

    // 转为 base64 返回（或存临时文件）
    const base64 = watermarked.toString('base64')
    return NextResponse.json({ success: true, previewUrl: `data:image/jpeg;base64,${base64}` })
  } catch (error) {
    console.error('生成预览图错误:', error)
    return NextResponse.json({ error: '生成失败' }, { status: 500 })
  }
}