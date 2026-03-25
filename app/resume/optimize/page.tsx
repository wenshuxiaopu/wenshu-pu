'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Copy, Download } from 'lucide-react'

export default function ResumeOptimizePage() {
  const [originalResume, setOriginalResume] = useState('')
  const [targetJob, setTargetJob] = useState('')
  const [style, setStyle] = useState('standard')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPayment, setShowPayment] = useState(false)

  const handleGenerate = async () => {
    if (!originalResume.trim()) {
      setError('请粘贴您的简历内容')
      return
    }
    if (!targetJob.trim()) {
      setError('请填写目标岗位')
      return
    }

    setLoading(true)
    setError('')
    setShowPayment(false)

    try {
      const response = await fetch('/api/generate/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalResume,
          targetJob,
          style,
        }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        setResult(data.result)
        // 显示支付提示（后续接入支付）
        setShowPayment(true)
      }
    } catch (err) {
      setError('生成失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    alert('已复制到剪贴板')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 顶部导航 */}
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
          <p className="text-gray-600">让你的简历在HR眼中脱颖而出</p>
          <div className="mt-2 inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
            <Sparkles size={14} />
            <span>限时特惠 ¥6.9/次</span>
          </div>
        </div>

        {/* 表单区 */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              您现有的简历 <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={8}
              value={originalResume}
              onChange={(e) => setOriginalResume(e.target.value)}
              placeholder="请粘贴您现有的简历内容..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

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
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? '生成中...' : '生成优化简历 ¥6.9'}
          </button>
        </div>

        {/* 结果区 */}
        {result && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">优化结果</h3>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition text-sm"
                >
                  <Copy size={16} />
                  复制
                </button>
                <button
                  className="flex items-center gap-1 text-gray-500 hover:text-blue-600 transition text-sm"
                >
                  <Download size={16} />
                  下载
                </button>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm">
              {result}
            </div>

            {showPayment && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
                <p className="text-gray-700 mb-2">✨ 优化已完成，支付 ¥6.9 即可保存并使用</p>
                <button
                  className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition"
                >
                  立即支付 ¥6.9
                </button>
                <p className="text-xs text-gray-400 mt-2">支付功能即将开放，敬请期待</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}