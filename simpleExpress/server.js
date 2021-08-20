const express = require("express");
const connection = require("./utils/db");

// 利用 express 建立一個 express application(應用程式)
let app = express();

// app.use 使用一個 中間件:在 request到response會經過很多模組和中間函式
// 固定寫法
app.use((req, res, next) => {
    // 可以記錄路由的訪問時間
    let current = new Date();
    console.log(`有人來訪問囉 at ${current.toISOString()}`);
    // 往下執行
    next();
});

app.use((req, res, next) => {
    console.log("我是第二個中間件");
    // 往下執行
    next();
});

// Http Method: get, post, put, patch, delete
/* 
是一個 router 路由特殊的中間件，不會用 use寫法，此為固定寫法，不會由上往下，會依照 / 的網址進去 response.sen()
*/ 
app.get("/", function(request, response, next) {
    response.send("Home");
})
app.get("/about", function(request, response, next) {
    response.send("About Us");
})

// 撈出資料庫裡面的股票代碼，可用json格式回傳
app.get("/stock", async function(req, res, next) {
    let result = await connection.queryAsync("SELECT * FROM stock");
    res.json(result);
})

// 只取得特定資料
app.get("/stock/:stockCode", async function(req, res, next) {
    // req.params 固定寫法 .接 : 後面的 stockCode
    // 網址輸入 http://localhost:3000/stock/2603
    let result = await connection.queryAsync("SELECT * FROM stock_price WHERE stock_id=?",
    [req.params.stockCode]);
    res.json(result);
})

// 404，上面路由沒有比到就會到這(沒有response就會跑到這)
app.use((req, res, next) => {
    res.status(404).json({message: "找不到網頁，掰掰"});
    // 往下執行
    next();
});

// 啟動
app.listen(3000, async function() {
    // 如果使用POOL，就不需要做下面那行連線，需要時POOL會自動建立連線
    // 在啟動時開啟資料庫連結 (當一個連線時需要這行)
    // await connection.connectAsync();
    console.log("Web GOGOGO");
})

