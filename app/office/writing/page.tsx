'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles, FileText, Download } from 'lucide-react'

type DocType = 'weekly' | 'plan' | 'notice' | 'summary'

const docTypeMap = {
  weekly: { name: '周报', placeholder: '例如：本周完成了项目A，下周计划推进项目B...' },
  plan: { name: '工作计划', placeholder: '例如：下月完成产品上线，预计用户量增长20%...' },
  notice: { name: '通知公告', placeholder: '例如：关于调整办公时间的通知...' },
  summary: { name: '工作总结', placeholder: '例如：本季度完成销售额100万，同比增长15%...' },
}

export default function OfficeWritingPage() {
  const [docType, setDocType] = useState<DocType>('weekly')
  const [userInput, setUserInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      setError('请填写文案需求')
      return
    }

    setLoading(true)
    setError('')
    setResult('')
    setPreviewUrl('')

    try {
      const res = await fetch('/api/generate/office-writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docType,
          userInput,
        }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setResult(data.result)
        
        // 调用预览生成 API
        const previewRes = await fetch('/api/generate-preview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: data.result })
        })
        
        if (previewRes.ok) {
          const blob = await previewRes.blob()
          const url = URL.createObjectURL(blob)
          setPreviewUrl(url)
        }
      }
    } catch (err) {
      setError('生成失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const downloadWord = () => {
    if (!result) return
    const blob = new Blob([result], { type: 'application/msword' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${docTypeMap[docType].name}.doc`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/office" className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition">
            <ArrowLeft size={20} />
            返回日常办公
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">办公文案写作</h1>
          <p className="text-gray-600">输入关键词，超级AI帮你快速成文</p>
          <div className="mt-2 inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
            <Sparkles size={14} />
            <span>限时特惠 ¥6.9/次</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          {/* 文案类型选择 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              文案类型 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3 flex-wrap">
              {(Object.keys(docTypeMap) as DocType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setDocType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    docType === type
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {docTypeMap[type].name}
                </button>
              ))}
            </div>
          </div>

          {/* 用户输入 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              文案需求 <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={5}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={docTypeMap[docType].placeholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-400 mt-1">描述你的需求，越详细生成效果越好</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || !userInput}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition disabled:bg-gray-400"
          >
            {loading ? '生成中...' : '生成文案 ¥6.9'}
          </button>
        </div>

        {/* 预览图 */}
        {previewUrl && (
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">预览图</h3>
              {result && (
                <button
                  onClick={downloadWord}
                  className="flex items-center gap-1 text-purple-600 text-sm hover:text-purple-700"
                >
                  <Download size={16} />
                  下载Word
                </button>
              )}
            </div>
            <iframe
              src={previewUrl}
              className="w-full border rounded-lg"
              style={{ height: '600px' }}
            />
            <p className="text-xs text-gray-400 mt-2 text-center">带水印预览图，支付后可下载原文件</p>
          </div>
        )}

        {/* 生成结果文本（调试用，最终可隐藏） */}
        {result && !previewUrl && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">生成结果</h3>
            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm">
              {result}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={downloadWord}
                className="flex items-center gap-1 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700"
              >
                <Download size={16} />
                下载Word
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}