let doWork = function (job, timer, isOK) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let dt = new Date();
      if (isOK) {
        resolve(`完成工作: ${job} at ${dt.toISOString()}`);
      } else {
        reject(`失敗了 ${job}`, null);
      }
    }, timer);
  });
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

// await 等到後面 promise 物件的狀態變成 fulfilled
async function doAllWorks() {
    let result1 = await doWork("起床", 2000, true);
    console.log(result1);
    let result2 = await doWork("打開電腦", 2000, true);
    console.log(result2);
    let result3 = await doWork("看錄影檔", 2000, true);
    console.log(result3);
    let result4 = await doWork("帶小孩散步", 8000, true);
    console.log(result4);
    let result5 = await doWork("繼續看書", 5000, true);
    console.log(result5);
    let result6 = await doWork("睡覺", 8000, true);
    console.log(result6);
}
doAllWorks();
