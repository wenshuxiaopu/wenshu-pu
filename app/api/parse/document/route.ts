import { NextResponse } from 'next/server'
import mammoth from 'mammoth'
import * as XLSX from 'xlsx'
import { readFile, utils } from 'xlsx'
import { writeFile, unlink } from 'fs/promises'
import path from 'path'

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

    if (ext === 'docx') {
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
   } else if (ext === 'xlsx') {
  const workbook = XLSX.read(buffer, { type: 'buffer' })
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]
  text = XLSX.utils.sheet_to_txt(sheet)
    } else {
      return NextResponse.json({ error: '不支持的文件格式，请上传 .docx 或 .xlsx' }, { status: 400 })
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