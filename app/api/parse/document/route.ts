import { NextResponse } from 'next/server'
import mammoth from 'mammoth'
import * as XLSX from 'xlsx'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: '未上传文件' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const fileName = file.name
    const ext = fileName.split('.').pop()?.toLowerCase()

    let text = ''

    // 处理 .txt
    if (ext === 'txt') {
      text = buffer.toString('utf-8')
    }
    // 处理 .doc 和 .docx
    else if (ext === 'doc' || ext === 'docx') {
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
    }
    // 处理 .xls 和 .xlsx
    else if (ext === 'xls' || ext === 'xlsx') {
      const workbook = XLSX.read(buffer, { type: 'buffer' })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      text = XLSX.utils.sheet_to_txt(sheet)
    }
    else {
      return NextResponse.json({ error: '不支持的文件格式，请上传 .txt/.doc/.docx/.xls/.xlsx' }, { status: 400 })
    }

    if (!text.trim()) {
      return NextResponse.json({ error: '文件内容为空' }, { status: 400 })
    }

    return NextResponse.json({ success: true, text })
  } catch (error) {
    console.error('解析文件错误:', error)
    return NextResponse.json({ error: '解析失败，请重试' }, { status: 500 })
  }
}