let doWork = function (job, timer, cb) {
    // 模擬一個非同步工作
    setTimeout(() => {
      let dt = new Date();
      // callback 慣用的設計
      // 第一個參數 是錯誤 放null
      // 第二個參數 要回覆的資料
      cb(null, `完成工作: ${job} at ${dt.toISOString()}`);
    }, timer);
  };
  
  let dt = new Date();
  console.log(`開始工作 at ${dt.toISOString()}`);
  
  // 如果動作要接續著做，只能把下一個動作放在上一個動作的cb
  // callback hell
  // 起床、打開電腦、看錄影檔、帶小孩散步、繼續看書、睡覺
  doWork("起床", 2000, function (err, data) {
    if (err) {
      console.error("發生錯誤了:", err);
      return;
    }
    console.log(data);
  
    doWork("打開電腦", 2000, function (err, data) {
      if (err) {
        console.error("發生錯誤了:", err);
        return;
      }
      console.log(data);
  
      doWork("看錄影檔", 2000, function (err, data) {
        if (err) {
          console.error("發生錯誤了:", err);
          return;
        }
        console.log(data);
  
        doWork("帶小孩散步", 8000, function (err, data) {
          if (err) {
            console.error("發生錯誤了:", err);
            return;
          }
          console.log(data);
  
          doWork("繼續看書", 5000, function (err, data) {
            if (err) {
              console.error("發生錯誤了:", err);
              return;
            }
            console.log(data);
  
            doWork("睡覺", 8000, function (err, data) {
              if (err) {
                console.error("發生錯誤了:", err);
                return;
              }
              console.log(data);
            });
          });
        });
      });
    });
  });