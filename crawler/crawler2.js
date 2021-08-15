const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

// 成功之後會 resolve
new Promise((resolve, reject) => {
  fs.readFile("stock.txt", "utf8", (err, stockCode) => {
    if (err) {
      reject(err);
    } else {
      resolve(stockCode);
    }
  });
})
// resolve後會進入到下面的 .then
.then((stockCode) => {
    // .then 進入到 axios.get 的 promise
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: stockCode,
      },
    });
  })
  // 上面 axios.get 如果成功了就會進入到下面的 .then，就可以把結果輸出
  .then((response) => {
    console.log(response.data.title);
  })
  .catch((err) => {
    console.error(err);
  });
