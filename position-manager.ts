import fs from "fs";
import path from "path";

type TradeEntry = {
    time: string;
    symbol: string;
    price: number;
    action: "BUY" | "SELL";
};

type OpenPositions = { 
    symbol: string;
    price: number;
    time: string;
    action: "BUY" | "SELL";
};

const tradesFile = path.join(__dirname, "trades-log.json");
const positionFile = path.join(__dirname, "position.json");

if (!fs.existsSync(tradesFile)) {
    console.error("trades-log.jsonが見つかりません");
    process.exit(1);
}

const trades: TradeEntry[] = JSON.parse(fs.readFileSync(tradesFile, "utf-8"));

const openPositions: OpenPositions[] = [];

for (const trade of trades) {
    const index = openPositions.findIndex(
      (pos) => pos.symbol === trade.symbol && pos.action !== trade.action
    );
    console.log("ログ", index);
  
    if (index !== -1) {
      // 決済：反対ポジションがある
      openPositions.splice(index, 1); // 対になるポジションを削除
    } else {
      // 新規ポジションとして追加
      openPositions.push(trade);
    }
  }

fs.writeFileSync(positionFile, JSON.stringify(openPositions, null, 2));
console.log('現在のポジション情報を更新しました。');