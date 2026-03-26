import { ImageResponse } from '@vercel/og'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { content } = await req.json()

    const lines = content.split('\n').filter(line => line.trim())

    return new ImageResponse(
      (
        <div
          style={{
            width: '800px',
            minHeight: '600px',
            background: 'white',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'system-ui, sans-serif',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {lines.map((line, i) => {
              if (line.startsWith('##')) {
                return (
                  <div
                    key={i}
                    style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#3b82f6',
                      marginTop: i > 0 ? '16px' : '0',
                      marginBottom: '8px',
                    }}
                  >
                    {line.replace('##', '').trim()}
                  </div>
                )
              }
              return (
                <div
                  key={i}
                  style={{
                    fontSize: '14px',
                    lineHeight: '1.5',
                    color: '#333',
                  }}
                >
                  {line}
                </div>
              )
            })}
          </div>
         <div
  style={{
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    color: '#ef4444',
    fontSize: '24px',
    fontWeight: 'bold',
    transform: 'rotate(-15deg)',
    opacity: 0.6,
    background: 'rgba(255,255,255,0.3)',
    padding: '8px 16px',
    borderRadius: '8px',
  }}
>
  文书小铺·预览
</div>
        </div>
      ),
      {
        width: 800,
        height: 600,
      }
    )
  } catch (error) {
    console.error('生成预览图错误:', error)
    return NextResponse.json({ error: '生成失败' }, { status: 500 })
  }
}