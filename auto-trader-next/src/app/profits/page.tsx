"use client";
import { useEffect, useState } from "react";

type Profit = {
  buyTime: string;
  sellTime: string;
  profit: number;
};

export default function ProfitsPage() {
  const [profits, setProfits] = useState<Profit[]>([]);
  const [totalProfit, setTotalProfit] = useState<number>(0);

  useEffect(() => {
    fetch("/api/profits") // fetch() は、Web API などに HTTP リクエストを送る関数。/api/profits に GET リクエストを送り、JSON を取得しようとしています。
      .then((res) => res.json()) // fetchのresをjsonに変換。
      .then((data: Profit[]) => {
        setProfits(data); // 上の結果をdataという名前で受け取っている。
        const total = data.reduce((sum, i) => sum + i.profit, 0); // array.reduce((累積結果, 今の要素) => { ... }, 初期値)
        setTotalProfit(total);
      });
  }, []);

  return (
    <main className="container mt-5">
      <h1 className="mb-4">利益</h1>
      <h2>
        合計収益：
        <span className={totalProfit >= 0 ? "text-success" : "text-danger"}>
          {totalProfit.toLocaleString()}円
          {/* .toLocaleString()関数をつけることで、カンマがつき、見やすくなる。 */}
        </span>
      </h2>
      <table className="table table-borderer">
        <thead className="table-light">
          <tr>
            <th>買った時</th>
            <th>売った時</th>
            <th>収益</th>
          </tr>
        </thead>
        <tbody>
          {profits.map((profit, i) => (
            <tr key={i}>
              <td>{profit.buyTime}</td>
              <td>{profit.sellTime}</td>
              <td
                className={profit.profit >= 0 ? "text-success" : "text-danger"}
              >
                {profit.profit} 円
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
