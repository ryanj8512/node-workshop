const axios = require("axios");
const moment = require("moment");
const fs = require("fs");

async function stockCode() {
    return await new Promise((resolve, reject) => {
        fs.readFile("stock.txt", "utf8", (err, stockCode) => {
            if (err) {
                reject(err);
            } else {
                resolve(stockCode);
            }
        })
    })
}

async function response(stockCode) {
    return await axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      params: {
        response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: stockCode,
      },
    });
};

async function doAllWorks() {
    try {
        let result1 = await stockCode();
        console.log(result1);
        let result2 = await response();
        console.log(result2);
    } catch(err) {
        console.log(err);
    }
}
doAllWorks();

