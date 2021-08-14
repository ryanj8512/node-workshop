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
  1. 呼叫並等候 async function asyncF()
  2. 往下執行 console.log(4)
  3. 遇到 asyncF()，再呼叫 async
  4. 先處理 console.log(1)，但因為被 await blocking
  5. 所以執行 console.log(5)
  6. 最後處理 await 裡面
  7. 按照順序處理 console.log(2)後，再處理 console.log(3) 
  */