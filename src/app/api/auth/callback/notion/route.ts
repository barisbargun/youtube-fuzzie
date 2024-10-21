import { Client } from "@notionhq/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 });

  const localUrl = process.env.NEXT_PUBLIC_URL

  const encoded = Buffer.from(
    `${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`
  ).toString('base64');

  const res = await axios.post('https://api.notion.com/v1/oauth/token',
    JSON.stringify({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.NOTION_REDIRECT_URI
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${encoded}`,
        'Notion-Version': '2022-06-28'
      }
    })
  if (!res) return NextResponse.redirect('/connections')

  const notion = new Client({
    auth: res.data.access_token
  })

  const databases = await notion.search({
    filter: {
      property: 'object',
      value: 'database'
    },
    sort: {
      direction: 'ascending',
      timestamp: 'last_edited_time'
    }
  })

  const databaseId = databases?.results[0]?.id;
  const data = res.data;
  return NextResponse.redirect(
    `${localUrl}/connections` +
    `?access_token=${data.access_token}` +
    `&workspace_name=${data.workspace_name}` +
    `&workspace_icon=${data.workspace_icon}` +
    `&workspace_id=${data.workspace_id}` +
    `&database_id=${databaseId}`
  );
}