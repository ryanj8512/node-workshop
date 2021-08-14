// 請問下列程式碼印出的順序為何？

function syncF() {
    console.log(1);
  
    setTimeout(() => {
      console.log(2);
    }, 0);
    console.log(3);
  }
  
  console.log(4);
  syncF();
  console.log(5);

  /*
  執行順序: 4 -> 1 -> 3 -> 5 -> 2
  1. 依照由上至下執行順序，先呼叫 (4)
  2. 處理 syncf() 裡面函式
  3. 在函式裡先執行 (1)
  4. 遇到 setTimeout() 會先移到 queue 裡面，等待 stack 執行空了在處理
  5. 接下來處理 (3)，(5)
  6. 等待 stack 執行任務結束後，even loop 將 queue 裡面的 setTimeout() 移到 stack 執行 (2)
  */