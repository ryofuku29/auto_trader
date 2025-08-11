import { NextResponse } from "next/server";
import { recordTrade } from "../../../../lib/recordTrade";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.symbol || !body.price || !body.action) {
    return NextResponse.json({ error: "不正なデータです" }, { status: 400 });
  }

  const entry = {
    time: new Date().toISOString(),
    symbol: body.symbol,
    price: body.price,
    action: body.action,
  };

  recordTrade(entry);
  return NextResponse.json({ message: "記録しました" });
}