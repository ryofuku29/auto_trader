"use client";

import { useState } from "react";

export default function PriceChecker() {
  const [symbol, setSymbol] = useState("7203");
  const [price, setPrice] = useState<number | null>(null);

  const fetchPrice = async () => {
    const res = await fetch(`/api/price?symbol=${symbol}`);
    const data = await res.json();
    if (data.price) setPrice(data.price);
  };

  return (
    <main>
      <h1>現在の株価を取得</h1>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        className="form-control d-inline-block"
      />
      <button onClick={fetchPrice} type="button" className="btn btn-info">
        価格取得
      </button>
      {price !== null && (
        <div className="text-danger">
          {symbol}の現在価格：<span>{price} 円</span>
        </div>
      )}
    </main>
  );
}
