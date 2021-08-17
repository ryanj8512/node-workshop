const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
// 第三方套件，必須 require
const mysql = require("mysql");
// 不需要變數接，只需要 require
require("dotenv").config();

async function doWork() {
  let stockCode = await new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, stockCode) => {
      if (err) {
        reject(err);
      } else {
        resolve(stockCode.trim());
      }
    });
  });

  // 資料庫連線設定
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  
  connection.connect((err) => {
    if (err) {
      console.log("資料庫連不上");
    }
  });
  
  // mysql語法為 callback 函式
  // 查詢 stock_ID 是否存在
  connection.query(
      // 避免SQL injection，要傳的資料寫成問號，要存的資料用中括號 []，底層會處理好
    `SELECT * FROM stock WHERE stock_id = ?`,
    [stockCode],
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      if (results.length > 0) {
          console.log("有資料");
      }
    }
  );
  
  // 不關閉連線，會認為程式一直執行
  connection.end();
  

  //   let response = await axios.get(
  //     "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
  //     {
  //       params: {
  //         response: "json",
  //         date: moment().format("YYYYMMDD"),
  //         stockNo: stockCode,
  //       },
  //     }
  //   );
  //   console.log(response.data.title);
}

try {
    doWork();
} catch(e) {
    console.error(e);
}
