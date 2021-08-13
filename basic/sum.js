// 回傳 1 + 2 + ... + n 的結果
function sum(n) {
    let result = 0;
    for (let i=1; i<=n; i++) {
        result += i;
    }
    return result;
}

console.log(sum(4)); 
console.log(sum(10));  