const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
// 第三方套件，必須 require
const mysql = require("mysql");
// 不需要變數接，只需要 require
require("dotenv").config();

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

  // 不關閉連線，會認為程式一直執行
  connection.end();

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

doWork();
