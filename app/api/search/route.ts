import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

function getTemplates(dir: string, type: string) {
  const templatesDir = path.join(process.cwd(), 'public', 'templates', dir)
  if (!fs.existsSync(templatesDir)) return []
  const files = fs.readdirSync(templatesDir)
  return files
    .filter(file => (file.endsWith('.doc') || file.endsWith('.docx') || file.endsWith('.xls') || file.endsWith('.xlsx')) && !file.includes('thumbnails'))
    .map(file => ({
      name: file.replace(/\.(doc|docx|xls|xlsx)$/, ''),
      type: type,
      link: type === 'resume' ? '/templates/resume' : type === 'office' ? '/office/templates' : '/contract/templates',
      category: dir === 'resume' ? '简历模板' : dir === 'office' ? '日常办公模板' : '合同协议模板'
    }))
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const keyword = searchParams.get('q')?.toLowerCase().trim() || ''

  if (!keyword) {
    return NextResponse.json({ results: [] })
  }

  const templates = [
    ...getTemplates('resume', 'resume'),
    ...getTemplates('office', 'office'),
    ...getTemplates('contract', 'contract')
  ]

  const services = [
    { name: '简历优化', type: 'service', link: '/resume/optimize', category: '简历服务' },
    { name: '办公文案写作', type: 'service', link: '/office/writing', category: '日常办公服务' },
    { name: '文案优化', type: 'service', link: '/office/optimize', category: '日常办公服务' },
    { name: '合同生成', type: 'service', link: '/contract/generate', category: '合同协议服务' },
    { name: '合同优化', type: 'service', link: '/contract/optimize', category: '合同协议服务' },
    { name: '文书代写', type: 'service', link: '/writing/generate', category: '文书代写服务' },
    { name: '文书优化', type: 'service', link: '/writing/optimize', category: '文书代写服务' }
  ]

  const matchedTemplates = templates.filter(t => t.name.toLowerCase().includes(keyword))
  const matchedServices = services.filter(s => s.name.toLowerCase().includes(keyword))

  const results = [...matchedTemplates, ...matchedServices]

  return NextResponse.json({ results, keyword })
}