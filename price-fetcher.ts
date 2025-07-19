import axios from 'axios'; //httpリクエストを送るためのライブラリaxios
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { analyzeSignal } from './analyze-logic';
dotenv.config({ quiet: true }); // dotenvライブラリが表示しているログを非表示にする。
// dotenv.config(); // .envを読み込む

const symbol = 'AAPL';
const url = `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${process.env.API_KEY}`; // process：Node.jsのグローバルオブジェクト（アプリ全体の情報）env：その中の「環境変数」一覧
const logFile = path.join(__dirname, 'price-log.json');

async function fetchAndAnalyze() { // 非同期処理（API通信）を行う準備。
  try {
    const res = await axios.get(url); // axios.get(url) でAPIにアクセスして、レスポンスを取得します。
    const price = res.data.price;
    // const now = new Date().toISOString();
    
    const raw = new Date();
    const date = raw.toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const time = raw.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', hour12: false });
    const now = `${date} ${time}`;
      
    const entry = { time: now, symbol, price };
      
    let log = [];
    if (fs.existsSync(logFile)) { //logFileがすでにあるかのチェック
      log = JSON.parse(fs.readFileSync(logFile, 'utf-8')); // fs.readFileSync() はファイルを開いて「文字列」として中身を取り出す関数。そして JSON.parse(...) は、文字列じゃないと使えない関数。ファイル → 文字列 → JSONとして使えるように
    }
      
    log.push(entry);
    fs.writeFileSync(logFile, JSON.stringify(log, null, 2)); //JSON.stringifyはJavaScriptの配列やオブジェクト → JSON形式の文字列に変換する関数。writeFileSync(...) は「文字列」を書き込む関数。
      console.log(`[${now}] ${symbol} 現在価格: ${price}`);
      analyzeSignal(log);
  } catch (err) {
    console.error('価格取得エラー:', err);
  }
};
setInterval(fetchAndAnalyze, 60 * 1000);