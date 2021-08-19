// 直接用 fs 的 promise 版本，不需要 callback
const fs = require("fs/promises");
// 使用模組(連線資料庫設定)
const connection = require("./utils/db");
const axios = require("axios");
const moment = require("moment");
const { processStockDay } = require("./utils/TWSEdata");

(async () => {
  try {
    // 1. 連線成功後讀取檔案
    let stockCode = await fs.readFile("stock.txt", "utf8");
    
    // 2. 準備連線
    // 擴充方式 connect -> connectAsync
    await connection.connectAsync();

    // 3. 查資料庫有沒有這個股票代碼
    // 擴充方式 query -> queryAsync
    let dbResults = await connection.queryAsync(
      "SELECT * FROM stock WHERE stock_id = ?",
      [stockCode]
    );
    console.log(dbResults);

    if (dbResults.length === 0) {
      throw "查不到資料";
    }

    // 3. 如果確認有此股票代碼，就去抓資料
    let response = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        params: {
          response: "json",
          date: moment().format("YYYYMMDD"),
          stockNo: stockCode,
        },
      }
    );

    const twseData = response.data;
    if (twseData.stat !== "OK") {
      throw "查到的資料有問題";
    }

    // 4. 使用模組，針對 data 每一組做處理，拿到整理過的 data
    let parsedData = processStockDay(stockCode, twseData.data);

    // 4. 將資料寫進資料庫
    let results = await connection.queryAsync(
      "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
      [parsedData]
    );
    console.log(results);
  } catch (e) {
    console.error(e);
  } finally {
    connection.end();
  }
})();