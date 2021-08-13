/*
演算法要注意下列概念
  - 時間複雜度
  - 空間複雜度
*/

// 在團隊裡的程式要注意 coding style 一致
// 回傳 1 + 2 + ... + n 的結果

// n = 10 ==> 12s
// n = 100 ==> 102s
// n = 1000 ==> 1002s

// 隨著資料量變大，秒數會成正比關係變大ㄎ
// O(n) <== O(n) O(2n) O(3n)
function sum(n) {
    let result = 0;
    for (let i = 1; i <= n; i++) {
      result += i;
    }
    return result;
  }
  
  // n = 1 ==> 1s
  // n = 2 ==> 2*2 = 4s
  // n 100 ==> 100*100 = 10000s
  // O(n^2)
  function test(n) {
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        result += i;
      }
    }
  }
  
  function sum1(n) {
    let result = 0;
    // n = 10 ==> 1
    // n = 1000 ==> 1
    // O(1) 不管 n 是多少，執行速度是一個常數(1)
    result = ((n + 1) * n) / 2;
    return result;
  }
  
  // O(n)、O(n^2) 必須依賴(n)是多少數值，才知道要跑多久
  // O(1)，不管常數數值多大，就是 O(1)，幾秒就是幾秒
  
  console.log(sum(4));
  console.log(sum(10));
  console.log(sum(2));
  
  
  console.time("SUM");
  for (let i = 1; i <= 10000; i++) {
    sum(1000000);
  }
  console.timeEnd("SUM");
  
  console.time("SUM1");
  for (let i = 1; i <= 10000; i++) {
    sum1(1000000);
  }
  console.timeEnd("SUM1");
  
  // O(1) 比 O(n) 在數字大才會有差距
  // 在數字小的情況下
  // SUM O(n): 2.479ms
  // SUM1 O(1): 0.475ms
  
  // 在數字大的情況下
  // SUM O(n): 8.874s
  // SUM1 O(1): 0.486ms
  
  
  /*
  時間複雜度：
  在演算法裡面，做加法和減法比乘法和除法速度還快，若數字比較大，O(1)就不一定比較快 
  若壓力比較大的情況下，O(1)可能比較快；在壓力小的情況下，O(n)可能比較快
  */ 
  
  /* 
  空間複雜度：
  arr = [1, 2, 3, 4, 5]，假設使用記憶體空間5，就會是O(n)
  當輸入要多用，就會成倍數等級成長，就會講 O(n)
  若不管輸入多大，都是用固定的記憶體，就會講 O(1)
  */
  
  /*
  用空間換取時間
  在優化時間方法之一，用多一點空間記憶，用少一點時間計算
  */