import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 })

  const localUrl = process.env.NEXT_PUBLIC_URL
  // const data = new URLSearchParams()

  await axios.post(
    'https://slack.com/api/oauth.v2.access',
    new URLSearchParams({
      code,
      client_id: process.env.SLACK_CLIENT_ID!,
      client_secret: process.env.SLACK_CLIENT_SECRET!,
      redirect_uri: `${localUrl}/api/auth/callback/slack`
    })
  )
}
