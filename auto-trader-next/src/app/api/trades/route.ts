// ブラウザ（フロントエンド）からは、trades-log.json に直接アクセスできない。なぜならサーバー側（Node.js）のローカルファイルだから。
// だから、フロントエンドでfetchできるようにするために、/apiを作成。
import { NextResponse } from 'next/server';	// Next.js で APIレスポンスを返すためのクラス NextResponse を読み込んでいる。これは res.json(...) のような役割で、レスポンスを JSON 形式で返すために使います。
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), '..', 'trades-log.json');
// process.cwd(): 今このアプリが動いてる場所（プロジェクトのルート）を指します。たとえば auto-trader-next/ というディレクトリにいる状態。
// "..": でひとつ上の階層に移動なので、今回は/auto-traderになる。
    
    if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'ログファイルが存在しません' }, { status: 404 });
  }

  const data = fs.readFileSync(filePath, 'utf-8');
  const trades = JSON.parse(data);
  return NextResponse.json(trades);
}