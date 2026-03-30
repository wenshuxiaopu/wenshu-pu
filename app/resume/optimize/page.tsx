'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Upload, FileText, FileSpreadsheet } from 'lucide-react'

export default function ResumeOptimizePage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [extractedText, setExtractedText] = useState('')
  const [targetJob, setTargetJob] = useState('')
  const [style, setStyle] = useState('standard')
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

  const handleGenerate = async () => {
    if (!extractedText.trim()) {
      setError('请先上传模板文件')
      return
    }
    if (!targetJob.trim()) {
      setError('请填写目标岗位')
      return
    }

    setLoading(true)
    setError('')
    setResult('')
    setPreviewUrl('')

    try {
      const res = await fetch('/api/generate/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalResume: extractedText,
          targetJob,
          style,
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
} else {
  setError('生成预览失败')
}
      }
    } catch (err) {
      setError('生成失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
            <ArrowLeft size={20} />
            返回首页
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI简历优化</h1>
          <p className="text-gray-600">上传你的简历模板，AI帮你优化后一键下载</p>
          <div className="mt-2 inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
            <Sparkles size={14} />
            <span>限时特惠 ¥6.9/次</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          {/* 文件上传区域 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              上传简历模板 <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
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
                <p className="text-xs text-gray-400 mt-1">支持 .docx / .xlsx 格式</p>
              </label>
            </div>
            {file && (
              <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                {file.name.endsWith('.docx') ? <FileText size={16} /> : <FileSpreadsheet size={16} />}
                <span>{file.name}</span>
                {uploading && <span className="text-blue-500 ml-2">解析中...</span>}
              </div>
            )}
            {extractedText && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600 max-h-32 overflow-auto">
                <p className="font-medium mb-1">已提取内容预览：</p>
                <p className="text-xs">{extractedText.substring(0, 200)}...</p>
              </div>
            )}
          </div>

          {/* 目标岗位 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              目标岗位 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={targetJob}
              onChange={(e) => setTargetJob(e.target.value)}
              placeholder="例如：Java开发工程师 / 产品经理"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* 风格偏好 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              风格偏好
            </label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="standard">标准版（通用）</option>
              <option value="tech">大厂HR风（适合技术岗）</option>
              <option value="creative">创意版（适合设计/文案）</option>
            </select>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || !extractedText}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? '生成中...' : '生成优化简历 ¥6.9'}
          </button>
        </div>

  {previewUrl && (
  <div className="bg-white rounded-xl shadow-md p-6 mt-6">
    <h3 className="text-lg font-semibold mb-4">预览图</h3>
    <iframe
      src={previewUrl}
      className="w-full border rounded-lg"
      style={{ height: '600px' }}
    />
    <p className="text-xs text-gray-400 mt-2 text-center">带水印预览图，支付后可下载原文件</p>
  </div>
)}

        {result && !previewUrl && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">优化结果</h3>
            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm">
              {result}
            </div>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
              <p className="text-gray-700 mb-2">✨ 优化已完成，支付 ¥6.9 即可下载完整文件</p>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition">
                立即支付 ¥6.9
              </button>
              <p className="text-xs text-gray-400 mt-2">支付功能即将开放，敬请期待</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}