import fs from "fs";
import path from "path";

type TradeEntry = {
    time: string;
    symbol: string;
    price: number;
    action: "BUY" | "SELL";
};

type ProfitEntry = {
    symbol: string;
    buyTime: string;
    sellTime: string;
    profit: number;
};

const tradesFile = path.join(__dirname, "trades-log.json");
const profitsFile = path.join(__dirname, "profits-log.json");

if (!fs.existsSync(tradesFile)) {
    console.error('trades-log.json が存在しません');
    process.exit(1);
}
  
const trades: TradeEntry[] = JSON.parse(fs.readFileSync(tradesFile, 'utf-8'));

const profits: ProfitEntry[] = [];

const openPositions = new Map<string, TradeEntry[]>();

for (const trade of trades) {
    const positions = openPositions.get(trade.symbol) || [];
  
    // 反対のポジションがある場合は決済する
    if (positions.length > 0 && positions[0].action !== trade.action) {
      const entry = positions.shift()!; // 最初に入れたポジションを取り出す（FIFO）
  
      const isBuyFirst = entry.action === "BUY";
      const buy = isBuyFirst ? entry : trade;
      const sell = isBuyFirst ? trade : entry;
  
      const profit = sell.price - buy.price;
  
      profits.push({
        symbol: trade.symbol,
        buyTime: buy.time,
        sellTime: sell.time,
        profit: parseFloat(profit.toFixed(2)),
      });
  
      // 残りのポジションがあれば更新
      openPositions.set(trade.symbol, positions);
    } else {
      // 新規ポジションとして追加
      positions.push(trade);
      openPositions.set(trade.symbol, positions);
    }
  }

fs.writeFileSync(profitsFile, JSON.stringify(profits, null, 2)); // ファイルがなければ作成し、あったら、全消しして上書きしている。
console.log('損益を計算して profits-log.json に保存しました');