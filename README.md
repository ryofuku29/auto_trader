## 利用方法

1. .env ファイルを作成し、twelvedata の API キーを入力。

## コマンドと機能

- `npx ts-node mock-api.ts`

  - express を使ってローカルサーバーを起動し、`/position`と`/profit`のエンドポイントにアクセスすると JSON 形式のポジション情報と損益情報を確認できる。

- `npx ts-node price-fetcher.ts`
  - 1 分おきに api で株価を取ってきて、price-log.json に株価と、会社番号を追加している。
  - 売買が発生したら、trades-log.json に情報を追加している。
- `npx ts-node calculate-profit.ts`

  - trades-log.json の action と price から損益を計算して、profits-log.json に損益を追加している。

- `npx ts-node position-manager.ts`
  - trades-log.json を参照して、現在の position を position.json に記載する。

## `npm run dev`

- auto-trader-next/src/app でこのコマンドを打つとローカルサーバーを起動できる。

### ページパス

- /logs で、売買履歴を確認できる。
- /profits で損益を確認できる。
- /position でポジションを確認できる
  - ** 未完成 **
