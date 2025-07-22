"use client";
import { useEffect, useState } from "react";

type Profit = {
  buyTime: string;
  sellTime: string;
  profit: number;
};

export default function ProfitsPage() {
  const [profits, setProfits] = useState<Profit[]>([]);

  useEffect(() => {
    fetch("/api/profits")
      .then((res) => res.json())
      .then((data) => setProfits(data));
  }, []);

  return (
    <main className="container mt-5">
      <h1 className="mb-4">利益</h1>
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
