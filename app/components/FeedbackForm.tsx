'use client'

import { useState } from 'react'

export default function FeedbackForm() {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = () => {
    if (!message.trim()) {
      setStatus('请填写内容再提交')
      return
    }
    setStatus('✅ 已收到，感谢反馈！')
    setMessage('')
    setTimeout(() => setStatus(''), 3000)
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-2xl p-6 shadow-sm">
      <h4 className="text-lg font-semibold mb-3">留下您的意见</h4>
      <textarea
        rows={3}
        className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="夸夸我们，或者骂骂我们，我们都会认真看..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>
      <button
        className="mt-3 bg-blue-600 text-white px-5 py-2 rounded-xl text-sm hover:bg-blue-700 transition"
        onClick={handleSubmit}
      >
        提交反馈
      </button>
      {status && <div className="mt-4 text-sm text-gray-500">{status}</div>}
    </div>
  )
}