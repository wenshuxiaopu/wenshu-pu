'use client'

import { useState } from 'react'

export default function PayTestPage() {
  const [qrCode, setQrCode] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePay = async () => {
    setLoading(true)
    const res = await fetch('/api/pay/wechat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 0.01, description: '测试支付' }),
    })
    const data = await res.json()
    if (data.code_url) {
      setQrCode(data.code_url)
    } else {
      alert(data.error || '支付失败')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4">微信支付测试</h1>
        <p className="text-gray-600 mb-6">金额：¥0.01（测试用）</p>
        <button
          onClick={handlePay}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition disabled:bg-gray-400"
        >
          {loading ? '生成中...' : '生成支付二维码'}
        </button>
        {qrCode && (
          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-2">微信扫码支付</p>
            <img src={qrCode} alt="支付二维码" className="mx-auto w-48 h-48" />
          </div>
        )}
      </div>
    </div>
  )
}