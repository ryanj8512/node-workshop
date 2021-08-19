console.log("我是主程式");

let car = require("./car");
console.log("在 car1 之後");
let car2 = require("./car2");
console.log("在 car2 之後");

// BMW? Benz?
console.log(car2.getOwner());

// 底層會做 如果只引用一次，就不會引用重複的