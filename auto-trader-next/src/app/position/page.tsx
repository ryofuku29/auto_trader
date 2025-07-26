"use client";
import { useEffect, useState } from "react";

type Position = {
  action: string;
  symbol: string;
  price: number;
};

export default function PositionPage() {
  const [position, setPosition] = useState<Position[]>([]);

  useEffect(() => {
    fetch("/api/position")
      .then((res) => res.json())
      .then((data: Position[]) => setPosition(data));
  }, []);

  return (
    <main className="container mt-5">
      <h1>保有している株</h1>
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>シンボル</th>
            {/* 売買時の値段じゃなくてまとめれるようにしたい。 */}
            <th>売買時の値段</th>
            <th>ポジション</th>
          </tr>
        </thead>
        <tbody>
          {position.map((position, i) => (
            <tr key={i}>
              <td>{position.symbol}</td>
              <td>{position.price}</td>
              <td
                className={
                  position.action === "BUY" ? "text-success" : "text-danger"
                }
              >
                {position.action === "BUY" ? "買" : "売"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
