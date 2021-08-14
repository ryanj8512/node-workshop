async function asyncF() {
    console.log(1);
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(2);
        resolve();
      }, 0);
    });
    console.log(3);
  }
  
  console.log(4);
  asyncF();
  console.log(5);

  /*
  執行順序: 4 -> 1 -> 5 -> 2 -> 3
  1. 依照執行緒會先執行 (4)
  2. 依序處理 asyncF() 函式裡面
  3. 執行 (1) 後，遇到 await，會將此函式內執行工作暫停
  4. 接續執行 (5)，等到 stack 空了再處理 async() 函式
  5. 依序執行 (2), (3)
  */