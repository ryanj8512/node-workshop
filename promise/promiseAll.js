let doWorkPromise = function (job, isOK) {
  return new Promise((resolve, reject) => {
    let timer = Math.floor(Math.random() * 5000);
    setTimeout(() => {
      let dt = new Date();
      if (isOK) {
          resolve(`完成工作: ${job} at ${dt.toISOString()}`);
      } else {
          reject(`失敗了 ${job}`);
      }
    }, timer);
  });
};

let job1Promise = doWorkPromise("睡覺", true);
let job2Promise = doWorkPromise("玩遊戲", true);
let job3Promise = doWorkPromise("苦命寫作業", true);
Promise.all([job1Promise, job2Promise, job3Promise]).then((response) => {
    console.log(response);
});