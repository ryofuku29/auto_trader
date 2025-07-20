import { time } from "console";
import fs from "fs";
import path from "path";

type TradeEntry = {
    time: string;
    symbol: string;
    price: number;
    action: "BUY" | "SELL";
};

const tradesFile = path.join(__dirname, "trades-log.json");
const positionFile = path.join(__dirname, "position.json");

if (!fs.existsSync(tradesFile)) {
    console.error("trades-log.jsonが見つかりません");
    process.exit(1);
}

const trades: TradeEntry[] = JSON.parse(fs.readFileSync(tradesFile, "utf-8"));
const lastTrade = trades[trades.length - 1];

const position = lastTrade.action === "BUY"
    ? { holding: true, symbol: lastTrade.symbol, price: lastTrade.price, time: lastTrade.time }
    : { holding: false };

fs.writeFileSync(positionFile, JSON.stringify(position, null, 2));
console.log('現在のポジション情報を更新しました。');