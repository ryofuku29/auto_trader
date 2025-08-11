import { NextRequest, NextResponse } from "next/server";
import { fetchMockPrice } from "../../../../lib/price-fetcher";
// 仮の価格を返す（後でAPI連携に切り替える）
// GET メソッドを処理する関数。クライアントが /api/price?symbol=XXXX にアクセスした時に呼ばれます。
// 	•	req はリクエストの情報を持っています。
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get("symbol");
  
    if (!symbol) {
      return NextResponse.json({ error: "symbolが必要です" }, { status: 400 });
    }
  
    const price = await fetchMockPrice(symbol); // 仮の価格
    return NextResponse.json({ symbol, price });
}