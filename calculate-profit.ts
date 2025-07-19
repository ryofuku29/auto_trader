import fs from "fs";
import path from "path";

type TradeEntry = {
    time: string;
    symbol: string;
    price: number;
    action: "BUY" | "SELL";
};

const tradesFile = path.join(__dirname, "trades-log.json");
const profitsFile = path.join(__dirname, "profits-log.json");

if (!fs.existsSync(tradesFile)) {
    console.error('trades-log.json が存在しません');
    process.exit(1);
  }
  
  const trades: TradeEntry[] = JSON.parse(fs.readFileSync(tradesFile, 'utf-8'));
  
  const profits: { buyTime: string; sellTime: string; profit: number }[] = [];
  
  for (let i = 0; i < trades.length - 1; i++) {
    if (trades[i].action === 'BUY' && trades[i + 1].action === 'SELL') {
      const buy = trades[i];
      const sell = trades[i + 1];
      const profit = sell.price - buy.price;
  
      profits.push({
        buyTime: buy.time,
        sellTime: sell.time,
        profit: parseFloat(profit.toFixed(2)),
      });
  
      i++;
    }
  }
  
  fs.writeFileSync(profitsFile, JSON.stringify(profits, null, 2)); // ファイルがなければ作成し、あったら、全消しして上書きしている。
  console.log('損益を計算して profits-log.json に保存しました');