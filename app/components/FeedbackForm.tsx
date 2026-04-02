'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { MessageSquare, Star } from 'lucide-react'

export default function FeedbackForm() {
  const [content, setContent] = useState('')
  const [rating, setRating] = useState(5)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('请先登录后再提交反馈')
      return
    }
    
    if (!content.trim()) {
      setError('请填写反馈内容')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, rating })
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setSubmitted(true)
      setContent('')
      setRating(5)
    } catch (err) {
      setError('提交失败，请重试')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-8">
        <div className="bg-green-50 text-green-600 p-4 rounded-lg">
          ✅ 感谢您的反馈！
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MessageSquare size={20} /> 留下您的意见
        </h3>
        
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-gray-600">评分：</span>
          {[1,2,3,4,5].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setRating(s)}
              className="focus:outline-none"
            >
              <Star size={20} fill={s <= rating ? '#f59e0b' : 'none'} stroke="#f59e0b" />
            </button>
          ))}
        </div>
        
        <textarea
          rows={4}
          placeholder="请告诉我们您的建议或遇到的问题..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
          required
        />
        
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {submitting ? '提交中...' : '提交反馈'}
        </button>
      </form>
    </div>
  )
}