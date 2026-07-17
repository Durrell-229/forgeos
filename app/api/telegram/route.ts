import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const update = await request.json();
  const message = update.message?.text as string | undefined;
  const chatId = update.message?.chat?.id as number | undefined;

  // The real Telegram call is added after TELEGRAM_BOT_TOKEN is configured.
  // This endpoint intentionally logs no credentials or message metadata.
  if (!message || !chatId) return NextResponse.json({ ok: true });

  return NextResponse.json({ ok: true, received: message.startsWith("/") });
}
