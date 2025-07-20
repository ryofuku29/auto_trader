## 利用方法

1. .env ファイルを作成し、twelvedata の API キーを入力。

## コマンドと機能

- `npx ts-node price-fetcher.ts`
  - 1 分おきに api で株価を取ってきて、price-log.json に株価と、会社番号を追加している。
  - 売買が発生したら、trades-log.json に情報を追加している。
- `npx ts-node calculate-profit.ts`

  - trades-log.json の action と price から損益を計算して、profits-log.json に損益を追加している。

- `npx ts-node position-manager.ts`
  - trades-log.json の直近の action から、position の有無を読み取り、position.json に記載する。
