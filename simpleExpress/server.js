const express = require("express");

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

// 啟動
app.listen(3000, function() {
    console.log("Web GOGOGO");
})