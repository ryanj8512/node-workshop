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
  walkup();
  
  // callback hell
  // 起床、打開電腦、看錄影檔、帶小孩散步、繼續看書、睡覺
  
  // 職責切割 pipeline pattern
  function walkup() {
    doWork("起床", 2000, function (err, data) {
      if (err) {
        console.error("發生錯誤了:", err);
        return;
      }
      console.log(data);
      // 每一個工作者只需要下一個要交接給誰
      openpc();
    });
  }
  
  function openpc() {
    doWork("打開電腦", 2000, function (err, data) {
      if (err) {
        console.error("發生錯誤了:", err);
        return;
      }
      console.log(data);
      video();
    });
  }
  
  function video() {
    doWork("看錄影檔", 2000, function (err, data) {
      if (err) {
        console.error("發生錯誤了:", err);
        return;
      }
      console.log(data);
      walk();
    });
  }
  
  function walk() {
    doWork("帶小孩散步", 8000, function (err, data) {
      if (err) {
        console.error("發生錯誤了:", err);
        return;
      }
      console.log(data);
      book();
    });
  }
  
  function book() {
    doWork("繼續看書", 5000, function (err, data) {
      if (err) {
        console.error("發生錯誤了:", err);
        return;
      }
      console.log(data);
      sleep();
    });
  }
  
  function sleep() {
    doWork("睡覺", 8000, function (err, data) {
      if (err) {
        console.error("發生錯誤了:", err);
        return;
      }
      console.log(data);
    });
  }