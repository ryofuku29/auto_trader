"use client";
import { useState } from "react";

export default function TradePage() {
  const [symbol, setSymbol] = useState("AAPL");
  const [price, setPrice] = useState<number | undefined>(undefined);
  // BUYかSELLボタンが押された時のアクション
  const handleTrade = async (action: "BUY" | "SELL") => {
    const res = await fetch("/api/trade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ symbol, price, action }),
    });

    const data = await res.json();
    alert(data.message || "トレード完了");
  };

  return (
    <main className="container mt-5">
      <h1 className="mb-4">手動トレード</h1>

      <div className="mb-3">
        <label className="form-label">銘柄（symbol）</label>
        <input
          className="form-control"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">価格（price）</label>
        <input
          className="form-control"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>

      <button
        className="btn btn-success me-3"
        onClick={() => handleTrade("BUY")}
      >
        BUY
      </button>
      <button className="btn btn-danger" onClick={() => handleTrade("SELL")}>
        SELL
      </button>
    </main>
  );
}
