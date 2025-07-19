import fs from 'fs';
import path from 'path';

type PriceEntry = {
  time: string;
  symbol: string;
  price: string;
};
  
type TradeEntry = {
  time: string;
  symbol: string;
  price: number;
  action: 'BUY' | 'SELL';
};
export function analyzeSignal(log: PriceEntry[]) {
  if (log.length < 2) {
    console.log('初回なので比較できません');
    return;
  }

  const prev = parseFloat(log[log.length - 2].price); //文字列の株価をperseFloatで小数点OKの数字に変換
  const curr = parseFloat(log[log.length - 1].price);
  const symbol = log[log.length - 1].symbol;
  const time = new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' });
  const diffPercent = ((curr - prev) / prev) * 100;
  const tradesFile = path.join(__dirname, 'trades-log.json');
  let trades: TradeEntry[] = [];

  if (fs.existsSync(tradesFile)) {
    trades = JSON.parse(fs.readFileSync(tradesFile, 'utf-8'));
  }

  let action: TradeEntry['action'] | null = null;


  if (diffPercent <= -1) {
    console.log('1%以上下落 → 買いシグナル');
    action = 'BUY';
  } else if (diffPercent >= 1) {
    console.log('1%以上上昇 → 売りシグナル');
    action = 'SELL';
  } else {
    console.log('変化小 → 様子見');
  }

  if (action) {
    const trade: TradeEntry = {
      time,
      symbol,
      price: curr,
      action,
    };
    trades.push(trade);
    fs.writeFileSync(tradesFile, JSON.stringify(trades, null, 2)); // 🔧 保存
    console.log(`${action} を記録しました`);
  }
}