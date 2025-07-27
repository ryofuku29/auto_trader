"use client"; // useEffect,useStateを使うために必要。
import { useEffect, useState } from "react";
import Header from "@/components/Header";

type Trade = {
  time: string;
  symbol: string;
  price: number;
  action: "BUY" | "SELL";
};

export default function LogsPage() {
  const [trades, setTrades] = useState<Trade[]>([]);

  useEffect(() => {
    // Reactコンポーネントが最初に画面に表示されたとき（/logsを初めて開いた時）、1回だけ動く関数。
    fetch("/api/trades") // fetch は「URL（/api/trades）にアクセスして、データをもらってくる」JavaScriptの機能。
      .then((res) => res.json()) // レスポンスの中身をjsonに変換
      .then((data) => setTrades(data)); // 取得したdataをtradesにセット
  }, []); // []これがあることで、一回だけ実行される。

  return (
    <main className="container">
      <Header />
      <h1 className="mb-4">取引ログ</h1>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>時間</th>
            <th>シンボル</th>
            <th>価格</th>
            <th>アクション</th>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, i) => (
            <tr key={i}>
              <td>{trade.time}</td>
              <td>{trade.symbol}</td>
              <td>{trade.price}</td>
              <td>{trade.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
