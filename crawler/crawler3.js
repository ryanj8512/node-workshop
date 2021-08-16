const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

// 1. 將要做的先取出 new Promise
// 4. +上await為了避免非同步直接到最後一行 console.log(response.data.title);
// 6. 使用 async 設定暫停範圍，暫停到非同步結束，回傳resolve後繼續工作
async function doWork() {
  let stockCode = await new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", (err, stockCode) => {
      if (err) {
        reject(err);
      } else {
        resolve(stockCode);
      }
    });
  });

  // 2. 將要做的先取出 axios.get
  // 5. +上await為了避免非同步直接到最後一行 console.log(response.data.title);
  // 7. await 會將 resolve 的結果回傳給 response
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
   // 3. 將要做的先取出，取得資料
   // 8. 最後執行 response 的輸出
  console.log(response.data.title);
}

doWork();