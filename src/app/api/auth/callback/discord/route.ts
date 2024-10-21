import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { URLSearchParams } from "url";
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });

  const localUrl = process.env.NEXT_PUBLIC_URL
  const data = new URLSearchParams();
  
  data.append('client_id', process.env.DISCORD_CLIENT_ID!);
  data.append('client_secret', process.env.DISCORD_CLIENT_SECRET!);
  data.append('grant_type', 'authorization_code');
  data.append('redirect_uri', `${localUrl}/api/auth/callback/discord`);
  data.append('code', code.toString());

  const output = await axios.post('https://discord.com/api/oauth2/token', data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  if (!output.data) return NextResponse.redirect('/connections');

  const guilds: { data: any[] } = await axios.get('https://discord.com/api/users/@me/guilds', {
    headers: {
      Authorization: `Bearer ${output.data.access_token}`
    }
  })
  guilds.data.forEach((v) => {
    if (v.id === output.data.webhook.guild_id) {
      const webhook = output.data.webhook
      return NextResponse.redirect(
        `${localUrl}/connections` +
        `?webhook_id=${webhook.id}` +
        `&webhook_url=${webhook.url}` +
        `&webhook_name=${webhook.name}` +
        `&channel_id=${webhook.channel_id}` +
        `&guild_id=${webhook.guild_id}` +
        `&guild_name=${v.name}`
      );
    }
  })

}