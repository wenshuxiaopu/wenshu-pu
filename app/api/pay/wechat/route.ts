import { NextResponse } from 'next/server'
import axios from 'axios'
import crypto from 'crypto'
import * as fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const { amount, description } = await req.json()

    const mchid = '1641229278'
    const total = Math.round(amount * 100)
    const outTradeNo = `WS${Date.now()}${Math.random().toString(36).substring(2, 8)}`

    // 读取私钥和证书
    const keyPath = path.join(process.cwd(), 'public/cert/apiclient_key.pem')
    const certPath = path.join(process.cwd(), 'public/cert/apiclient_cert.pem')
    const privateKey = fs.readFileSync(keyPath, 'utf8')
    const cert = fs.readFileSync(certPath, 'utf8')

    // 从证书中提取序列号（十六进制，不带冒号）
    const certObj = new crypto.X509Certificate(cert)
    const serialNo = certObj.serialNumber  // 获取序列号

    const params = {
      appid: 'wx3f69dc2eb82aaec6',
      mchid: mchid,
      description: description || '文书小铺商品',
      out_trade_no: outTradeNo,
      notify_url: 'https://wenshupo.cn/api/pay/wechat/callback',
      amount: {
        total: total,
        currency: 'CNY',
      },
    }

    const url = 'https://api.mch.weixin.qq.com/v3/pay/transactions/native'
    const body = JSON.stringify(params)

    const timestamp = Math.floor(Date.now() / 1000)
    const nonceStr = Math.random().toString(36).substring(2, 18)
    const message = `POST\n/v3/pay/transactions/native\n${timestamp}\n${nonceStr}\n${body}\n`

    const sign = crypto.createSign('RSA-SHA256')
    sign.update(message)
    sign.end()
    const signature = sign.sign(privateKey, 'base64')

    const authHeader = `WECHATPAY2-SHA256-RSA2048 mchid="${mchid}",nonce_str="${nonceStr}",timestamp="${timestamp}",serial_no="${serialNo}",signature="${signature}"`

    const response = await axios.post(url, params, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
    })

    return NextResponse.json({
      success: true,
      code_url: response.data.code_url,
      out_trade_no: outTradeNo,
    })
  } catch (error: any) {
    console.error('微信支付错误:', error.response?.data || error.message)
    return NextResponse.json({ error: '支付失败，请重试' }, { status: 500 })
  }
}