'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Upload, Download } from 'lucide-react'

export default function ContractOptimizePage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [extractedText, setExtractedText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setUploading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const res = await fetch('/api/parse/document', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setExtractedText(data.text)
      }
    } catch (err) {
      setError('解析失败，请重试')
    } finally {
      setUploading(false)
    }
  }

  const handleOptimize = async () => {
    if (!extractedText.trim()) {
      setError('请先上传合同文件')
      return
    }

    setLoading(true)
    setError('')
    setResult('')
    setPreviewUrl('')

    try {
      const res = await fetch('/api/generate/contract-optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalText: extractedText,
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
      setError('优化失败，请重试')
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
    a.download = '优化后合同.doc'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/contract" className="inline-flex items-center gap-2 text-gray-600 hover:text-amber-600 transition">
            <ArrowLeft size={20} />
            返回合同协议
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">合同优化</h1>
          <p className="text-gray-600">上传合同，超级AI帮你优化条款，提升专业度</p>
          <div className="mt-2 inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm">
            <Sparkles size={14} />
            <span>限时特惠 ¥6.9/次</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          {/* 文件上传区域 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              上传合同文件 <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-500 transition">
              <input
                type="file"
                accept=".docx,.xlsx,.txt"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer block">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <p className="text-gray-600">点击或拖拽上传文件</p>
             <p className="text-xs text-gray-400 mt-1">支持 .docx / .xlsx / .txt 格式</p>
              </label>
            </div>
            {file && (
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                <span>{file.name}</span>
                {uploading && <span className="text-amber-500 ml-2">解析中...</span>}
              </div>
            )}
            {extractedText && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 max-h-32 overflow-auto">
                <p className="font-medium mb-1">已提取内容预览：</p>
                <p className="text-xs">{extractedText.substring(0, 200)}...</p>
              </div>
            )}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleOptimize}
            disabled={loading || !extractedText}
            className="w-full bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition disabled:bg-gray-400"
          >
            {loading ? '优化中...' : '开始优化 ¥6.9'}
          </button>
        </div>

        {/* 预览图 */}
        {previewUrl && (
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">优化结果预览</h3>
              {result && (
                <button
                  onClick={downloadWord}
                  className="flex items-center gap-1 text-amber-600 text-sm hover:text-amber-700"
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

        {/* 生成结果文本（调试用） */}
        {result && !previewUrl && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">优化结果</h3>
            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm">
              {result}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={downloadWord}
                className="flex items-center gap-1 bg-amber-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-amber-700"
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