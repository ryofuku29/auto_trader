// 将来的にfetchを使うことを想定しているから、非同期処理している。
export async function fetchMockPrice(symbol: string): Promise<number> {
    const mockPrices: { [key: string]: number } = {
      AAPL: 192.5,
      7203: 260.3,
      MSFT: 340.1,
    };
    return mockPrices[symbol] ?? 404;
  }