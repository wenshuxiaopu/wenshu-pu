import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import { promises as fs } from 'fs'
import path from 'path'
import sharp from 'sharp'

const execAsync = promisify(exec)

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const aiData = formData.get('aiData') as string
    
    console.log('aiData:', aiData)
    
    if (!file) {
      return NextResponse.json({ error: '未上传文件' }, { status: 400 })
    }

    const timestamp = Date.now()
    const tempDir = path.join(process.cwd(), 'public/temp')
    await fs.mkdir(tempDir, { recursive: true })
    
    // 保存用户上传的原始文件
    const originalDocx = path.join(tempDir, `${timestamp}_original.docx`)
    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(originalDocx, buffer)
    
    // 用 AI 文本直接作为填充内容
    const filledDocx = path.join(tempDir, `${timestamp}_filled.docx`)
    await fs.writeFile(filledDocx, aiData, 'utf8')
    
    // 用 LibreOffice 转 PDF
    const pdfPath = path.join(tempDir, `${timestamp}_filled.pdf`)
    await execAsync(`"C:\\Program Files\\LibreOffice\\program\\soffice.exe" --headless --convert-to pdf --outdir "${tempDir}" "${filledDocx}"`)
    
    // 用 Ghostscript 转图片
    const imagePath = path.join(tempDir, `${timestamp}.jpg`)
    const gsPath = 'C:\\Program Files\\gs\\gs10.07.0\\bin\\gswin64c.exe'
    await execAsync(`"${gsPath}" -dNOPAUSE -dBATCH -sDEVICE=jpeg -r150 -sOutputFile="${imagePath}" "${pdfPath}"`)
    
    // 加水印
    const watermarkedPath = path.join(tempDir, `${timestamp}_watermark.jpg`)
    const svgWatermark = `
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="watermark" patternUnits="userSpaceOnUse" width="200" height="150">
      <text x="20" y="40" font-size="24" fill="rgba(0,0,0,0.25)" transform="rotate(-25, 100, 75)">文书小铺·预览</text>
      <text x="20" y="120" font-size="24" fill="rgba(0,0,0,0.25)" transform="rotate(-25, 100, 135)">文书小铺·预览</text>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#watermark)"/>
</svg>
`

    await sharp(imagePath)
      .composite([{
        input: Buffer.from(svgWatermark),
        blend: 'over',
      }])
      .toFile(watermarkedPath)
    
    return NextResponse.json({ 
      success: true, 
      previewUrl: `/temp/${timestamp}_watermark.jpg`,
      originalFile: `/temp/${timestamp}_filled.docx`
    })
  } catch (error) {
    console.error('生成预览图错误:', error)
    return NextResponse.json({ error: '生成失败' }, { status: 500 })
  }
}