import express from 'express'; // Node.js のWebサーバーフレームワーク。APIを簡単に作れる。
import fs from 'fs';
import path from 'path';

const app = express(); // express() は「Webサーバーを動かすための箱を作る関数。app はその箱につけた名前（あなたのサーバーの入り口の名前）。この app を使って、「どんなURLで何を返すか」をあとで設定していきます。
const PORT = 3001;

app.get('/position', (req, res) => { // /position に来たらこの処理を実行。
  const file = path.join(__dirname, 'position.json'); // position.json のファイルパスを取得。
  if (!fs.existsSync(file)) {
    return res.status(404).json({ error: 'Position not found' });
  }
  const data = JSON.parse(fs.readFileSync(file, 'utf-8')); // fs.readFileSync(...)：ファイルを読み込み文字列として取得。JSON.parse(...)：文字列を JavaScriptオブジェクトに変換
  res.json(data); // クライアントにJSONデータを返す。
});

app.get('/profit', (req, res) => {
  const file = path.join(__dirname, 'profits-log.json');
  if (!fs.existsSync(file)) {
    return res.status(404).json({ error: 'Profit data not found' });
  }
  const data = JSON.parse(fs.readFileSync(file, 'utf-8')); // htmlだとプログラムが処理しにくいからjsonらしい。
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`📡 Mock API running on http://localhost:${PORT}`);
});