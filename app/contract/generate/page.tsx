'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Download } from 'lucide-react'

type ContractType = 'rent' | 'labor' | 'sales' | 'service' | 'loan' | 'other'

const contractTypeMap = {
  rent: { name: '租赁合同', placeholder: '例如：房屋租赁，押一付三，租期一年...' },
  labor: { name: '劳动合同', placeholder: '例如：软件开发岗位，月薪15000，试用期2个月...' },
  sales: { name: '购销合同', placeholder: '例如：采购100台设备，单价5000元，交货期30天...' },
  service: { name: '服务合同', placeholder: '例如：网站开发服务，工期2个月，费用3万元...' },
  loan: { name: '借款合同', placeholder: '例如：借款10万元，年利率5%，期限1年...' },
  other: { name: '其他合同', placeholder: '请描述您的合同需求...' },
}

export default function ContractGeneratePage() {
  const [contractType, setContractType] = useState<ContractType>('rent')
  const [userInput, setUserInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      setError('请填写合同需求')
      return
    }

    setLoading(true)
    setError('')
    setResult('')
    setPreviewUrl('')

    try {
      const res = await fetch('/api/generate/contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractType,
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
    a.download = `${contractTypeMap[contractType].name}.doc`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/contract" className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition">
            <ArrowLeft size={20} />
            返回合同协议
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">合同生成</h1>
          <p className="text-gray-600">输入需求，超级AI帮你生成定制合同</p>
          <div className="mt-2 inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm">
            <Sparkles size={14} />
            <span>限时特惠 ¥6.9/次</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          {/* 合同类型选择 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              合同类型 <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-3 flex-wrap">
              {(Object.keys(contractTypeMap) as ContractType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setContractType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    contractType === type
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {contractTypeMap[type].name}
                </button>
              ))}
            </div>
          </div>

          {/* 用户输入 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              合同需求 <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={6}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={contractTypeMap[contractType].placeholder}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-400 mt-1">描述越详细，生成的合同越贴合需求</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading || !userInput}
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 transition disabled:bg-gray-400"
          >
            {loading ? '生成中...' : '生成合同 ¥6.9'}
          </button>
        </div>

        {/* 预览图 */}
        {previewUrl && (
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">合同预览</h3>
              {result && (
                <button
                  onClick={downloadWord}
                  className="flex items-center gap-1 text-emerald-600 text-sm hover:text-emerald-700"
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
            <h3 className="text-lg font-semibold mb-4">生成结果</h3>
            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm">
              {result}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={downloadWord}
                className="flex items-center gap-1 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700"
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