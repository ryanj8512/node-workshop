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
  1. function syncF() 是一個 callback function
  2. 先回傳 console.log(4)
  3. syncF() 呼叫 function syncF()
  4. 按順序先執行 console.log(1)
  5. 再執行 console.log(3)，因為 setTimeout是marco
  6. stock 執行完最後 console.log(5)
  7. 最後執行 setTimeour (2)
  */