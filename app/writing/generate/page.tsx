'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Download } from 'lucide-react'

type WritingType = 'love' | 'apology' | 'thanks' | 'resign' | 'other'

const writingTypeMap = {
  love: { name: '情书', placeholder: '例如：写给暗恋的同事，喜欢她一年了...' },
  apology: { name: '检讨书', placeholder: '例如：上班迟到，被领导批评，想诚恳道歉...' },
  thanks: { name: '感谢信', placeholder: '例如：感谢客户长期支持，想表达谢意...' },
  resign: { name: '辞职信', placeholder: '例如：因个人发展原因离职，想体面告别...' },
  other: { name: '其他文书', placeholder: '请描述您的需求...' },
}

export default function WritingGeneratePage() {
  const [writingType, setWritingType] = useState<WritingType>('love')
  const [userInput, setUserInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      setError('请填写需求')
      return
    }

    setLoading(true)
    setError('')
    setResult('')
    setPreviewUrl('')

    try {
      const res = await fetch('/api/generate/writing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          writingType,
          userInput,
        }),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setResult(data.result)
        
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
    a.download = `${writingTypeMap[writingType].name}.doc`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/writing" className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 transition">
            <ArrowLeft size={20} />
            返回文书代写
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">文书代写</h1>
          <p className="text-gray-600">输入需求，超级AI帮你写出动人文字</p>
          <div className="mt-2 inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
            <Sparkles size={14} />
            <span>限时特惠 ¥6.9/次</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          {/* 文书类型选择 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              文书类型 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3 flex-wrap">
              {(Object.keys(writingTypeMap) as WritingType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setWritingType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    writingType === type
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {writingTypeMap[type].name}
                </button>
              ))}
            </div>
          </div>

          {/* 用户输入 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              写作需求 <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={6}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={writingTypeMap[writingType].placeholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-400 mt-1">描述越详细，生成的内容越贴合心意</p>
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
            {loading ? '生成中...' : '生成文书 ¥6.9'}
          </button>
        </div>

        {/* 预览图 */}
        {previewUrl && (
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">预览</h3>
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
      </div>
    </main>
  )
}