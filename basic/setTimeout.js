  
/*
跑的順序 start -> end -> (等1秒) -> Timeout
無論 setTimeout 設定幾秒，都要在 event loop 排隊，等到 stack 空了後才會執行
所以秒數不準確，要看主程式跑完才會執行
*/

console.log("start");

setTimeout(function () {
    console.log("Timeout");
}, 1000);

console.log("end");