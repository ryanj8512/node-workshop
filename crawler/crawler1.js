/*
https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20210815&stockNo=2330&_=1629032898359
&
response=json
&
date=20210815
&
stockNo=2330
&
_=1629032898359
(若測試網址拿掉這一段，還是可以正常顯示，就可以不需要寫進程式裡)
*/

// 通常會用 const，引用什麼套件?
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

// utf8 為人類可以看得懂的語言
// 下面為 callback 非同步，避免stockNo因為非同步最後才讀取檔案，而axios以下函式放進去執行
fs.readFile("stock.txt", "utf8", (err, stockCode) => {
  // axios 寫法，因為是 promise base，後面要 .then
  axios
    .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: moment().format("YYYYMMDD"), // 可以自動抓日期
        stockNo: stockCode, // 再不修改程式的情況下可以自由讀取所需要的資料
      },
    })
    // response 一個請求會返回的回應
    .then((response) => {
      console.log(response.data.title); // 取得 data 資料
    });
});
