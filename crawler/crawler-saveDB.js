const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql");
require("dotenv").config();

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
          reject(error);
        }
        // ** 可以在這先判斷有沒有資料，最下面就不用再判斷
        if (results.length > 0) {
          console.log("有查到資料");
        }
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

    // 4. 針對 data 每一組做處理
    const twseData = response.data;
    // 存進資料庫時，先確認 stat 是否OK
    // if(twseData.stat === "OK") {
    //     throw "查到的資料有問題";
    // }

    let parseData = twseData.data.map((item) => {
        // 處理千位符 ,
        item = item.map(value => {
            return value.replace(/,/g, "");
        });        
        // 處理日期: 民國年轉西元年
        // "110/08/18" replace "1100818", 再用 parseInt 轉數字
        item[0] = parseInt(item[0].replace(/\//g, ""), 10) + 19110000;

        // 把 stock_id 放進來
        item.unshift(stockCode); 
        return item;
    });
    console.log(parseData);

    // 5. 將資料存進資料庫
    // connection.query 是一個 callback
    // mysql 語法 IGNORE 避免重複資料
    connection.query("INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
    [parseData],
    function(error, results, fields) {
        if(error) {
            console.error(error);
        }
        console.log(results);
    });
  } catch (e) {
    console.error(e);
  } finally {
    connection.end();
  }
}

doWork();
