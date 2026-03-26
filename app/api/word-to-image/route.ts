import { NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import { promises as fs } from 'fs'
import path from 'path'
import sharp from 'sharp'

const execAsync = promisify(exec)

export async function POST(req: Request) {
  try {
    const { filePath } = await req.json()
    
    // 1. 生成临时文件名
    const timestamp = Date.now()
    const tempDir = path.join(process.cwd(), 'public/temp')
    await fs.mkdir(tempDir, { recursive: true })
    
    const pdfPath = path.join(tempDir, `${timestamp}.pdf`)
    const imagePath = path.join(tempDir, `${timestamp}.jpg`)
    
    // 2. 用 LibreOffice 转 PDF
    await execAsync(`"C:\\Program Files\\LibreOffice\\program\\soffice.exe" --headless --convert-to pdf --outdir "${tempDir}" "${filePath}"`)
    
    // 3. 将 PDF 转图片（需要额外工具，先返回 PDF 路径）
    // 暂时返回 PDF 文件作为预览
    
    return NextResponse.json({ 
      success: true, 
      pdfUrl: `/temp/${timestamp}.pdf`,
      imageUrl: `/temp/${timestamp}.jpg` 
    })
  } catch (error) {
    console.error('转换错误:', error)
    return NextResponse.json({ error: '转换失败' }, { status: 500 })
  }
}