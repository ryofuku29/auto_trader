import fs from "fs";
import path from "path";

type TradeEntry = {
  time: string;
  symbol: string;
  price: number;
  action: "BUY" | "SELL";
};

export function recordTrade(entry: TradeEntry) {
  const tradesFile = path.join(process.cwd(), "trades-log.json");
  let trades: TradeEntry[] = [];
  if (fs.existsSync(tradesFile)) {
    trades = JSON.parse(fs.readFileSync(tradesFile, "utf-8"));
  }

  trades.push(entry);
  fs.writeFileSync(tradesFile, JSON.stringify(trades, null, 2));
}