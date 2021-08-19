/*
exports = module.exports = {};
會在第一行先偷放這一段，讓 exports 和 module.exports 都指向一個空的物件
*/

console.log("我是 car1");
const car2 = require("./car2");

car2.setOwner("Benz");

let brand = "Honda";
let color = "gray";
let owner = "";

// 可以開放修改名子
function setOwner(name) {
  owner = name;
}

// 以下不給開放修改
function showOwner() {
  return owner;
}
function showBrand() {
  return brand;
}
function showColor() {
  return color;
}

// CJS提供兩個匯出方式， exports、module.exports
// exports和module.exports 都指向同一個物件
// exports.showColor = showColor;
// exports.showBrand = showBrand;
// exports.showOwner = showOwner;
// module.exports.showColor = showColor;

// 會變成 exports 等於一個新物件
// exports = {
//     showColor: showColor,
//     showBrand: showBrand,
//     showOwner: showOwner,
//     setOwner: setOwner,
// };

// 因為最後指向 module.exports，所以會回傳
module.exports = {
    showBrand,
    showColor,
    showOwner,
    setOwner,
};

// 預設會先偷放 return module.exports;
