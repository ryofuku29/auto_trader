"use client";
import { useEffect, useState } from "react";

type Position = {
  holding: string;
  symbol: string;
  price: number;
  time: string;
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
            <th>ポジション</th>
            <th>シンボル</th>
            <th>売買時の値段</th>
            <th>売買時間</th>
          </tr>
        </thead>
        <tbody>
          {position.map((position, i) => (
            <tr key={i}>
              <td
                className={
                  position.holding === "BUY" ? "text-success" : "text-danger"
                }
              >
                {position.holding === "BUY" ? "買" : "売"}
              </td>
              <td>{position.symbol}</td>
              <td>{position.price}</td>
              <td>{position.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
