const express = require("express");

// 利用 express 建立一個 express application(應用程式)
let app = express();

// Http Method: get, post, put, patch, delete
app.get("/", function(request, response, next) {
    response.send("Home");
})
app.get("/ablut", function(request, response, next) {
    response.send("About Us");
})

// 啟動
app.listen(3000, function() {
    console.log("Web GOGOGO");
})