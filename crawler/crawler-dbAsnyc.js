const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");
require("dotenv").config();

/* 
promise 改寫 async
1. 先做 new Promise 吐司盒子
2. 把(吐司拉進來)，把非同步拉進來
3. 找到成功 resovle 的地方改寫
4. 找到失敗 reject 的地方改寫
5. 因為已經在 asnyc 裡面，可以直接+await，把resolve結果直接傳出去
*/

// A. 把連線放在最外面，先確認是否連線成功
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

//B. 準備連線
connection.connect((err) => {
  if (err) {
    console.log("資料庫連不上");
  }
});

// C. 連線成功後讀取檔案
function readStockCode() {
  return new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, stockCode) => {
      if (err) {
        reject(err);
      } else {
        // trim 建議加上去，移除前後的空白自原，包括換行
        resolve(stockCode.trim());
      }
    });
  });
}

// D. 查資料庫有沒有這個股票代碼
function queryStock(stockCode) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM stock WHERE stock_id = ?`,
      [stockCode],
      function (error, results, fields) {
        if (error) {
          // 錯誤 reject
          reject(error);
        }
        // ** 可以在這先判斷有沒有資料，最下面就不用再判斷
        if (results.length > 0) {
          console.log("有查到資料");
        }
        // 正確 resolve
        resolve(results);
      }
    );
  });
}

// E. 如果確認有此股票代碼，就去抓資料
function queryStockPrice(stockCode) {
  return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: "json",
      date: moment().format("YYYYMMDD"),
      stockNo: stockCode,
    },
  });
}

async function doWork() {
  try {
    // 1. 將 stock.txt 讀近來
    let stockCode = await readStockCode();

    // 2. 查資料庫有沒有這個股票代碼
    let dbResults = await queryStock(stockCode);

    // 讓後端看是否有查到資料，length 大於 0 才會繼續往下跑，若上面已先判斷，這裡就不用再判斷
    // if (dbResults.length === 0) {
    //   console.warn("查不到資料");
    //   return;
    // }
    // console.info("有查到資料");

    // 3. 如果確認有此股票代碼，就去抓資料
    let response = await queryStockPrice(stockCode);

    // 4. 把抓到的資料存到資料庫的 stock_price 表格裡面
    console.log(response.data.title);
  } catch (e) {
    console.error(e);
  } finally {
    connection.end();
  }
}

doWork();
