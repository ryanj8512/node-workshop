// 使用 promise 解決 callback hell 寫法
// Promise 是一個表示非同步運算的最終完成或失敗的物件
/*
以下四個重點
--非同步
-- 物件
-- 最終成功
-- 最終失敗
*/
// new Promise 本身是同步

let doWork = function (job, timer, isOK) {
  // Promise 規定的寫法，有兩個固定參數resolve、reject
  // new Promise 傳遞一個函式
  return new Promise((resolve, reject) => {
    // 開始執行非同步工作
    setTimeout(() => {
      let dt = new Date();
      if (isOK) {
        // 成功
        resolve(`完成工作: ${job} at ${dt.toISOString()}`);
      } else {
        // 失敗
        reject(`失敗了 ${job}`, null);
      }
    }, timer);
  });
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

// 呼叫 doWork 函式，接住 new Promise 的 return
let job1 = doWork("起床", 2000, true);
let job2 = doWork("打開電腦", 2000, true);
let job3 = doWork("看錄影檔", 2000, true);
let job4 = doWork("帶小孩散步", 8000, true);
let job5 = doWork("繼續看書", 5000, true);
let job6 = doWork("睡覺", 8000, true);

// promise 會使用 .then()，這是一個物件，本身是一個函式
// (一個接收成功，一個接收失敗)
job1.then (
    function(result) {
        console.log("起床", result);
        
        job2.then (
            function(result) {
                console.log("打開電腦", result);

                job3.then (
                    function(result) {
                        console.log("看錄影檔", result);

                        job4.then (
                            function(result) {
                                console.log("帶小孩散步", result);

                                job5.then (
                                    function(result) {
                                        console.log("繼續看書", result);

                                        job6.then (
                                            function(result) {
                                                console.log("睡覺", result);
                                            },
                                            function(reject) {
                                                console.log("睡覺失敗", reject);
                                            }
                                        )
                                    },
                                    function(reject) {
                                        console.log("繼續看書失敗", reject);
                                    }
                                )
                            },
                            function(reject) {
                                console.log("帶小孩散步失敗", reject);
                            }
                        )
                    },
                    function(reject) {
                        console.log("看錄影檔失敗", reject);
                    }
                )
            },
            function(reject) {
                console.log("打開電腦失敗", reject);
            }
        );
    },
    function(reject) {
        console.log("起床失敗", reject);
    },
)
