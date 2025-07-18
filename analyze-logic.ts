type PriceEntry = {
  time: string;
  symbol: string;
  price: string;
};
  
export function analyzeSignal(log: PriceEntry[]) {
  if (log.length < 2) {
    console.log('初回なので比較できません');
    return;
  }

  const prev = parseFloat(log[log.length - 2].price); //文字列の株価をperseFloatで小数点OKの数字に変換
  const curr = parseFloat(log[log.length - 1].price);
  const diffPercent = ((curr - prev) / prev) * 100;

  if (diffPercent <= -1) {
    console.log('1%以上下落 → 買いシグナル');
  } else if (diffPercent >= 1) {
    console.log('1%以上上昇 → 売りシグナル');
  } else {
    console.log('変化小 → 様子見');
  }
}