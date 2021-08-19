// 針對 data 每一組做處理
function processStockDay(stockCode,rawData) {
    return rawData.map((item) => {
        item = item.map((value) => {
          return value.replace(/,/g, "");
        });
        item[0] = parseInt(item[0].replace(/\//g, ""), 10) + 19110000;
    
        item.unshift(stockCode);
        return item;
      });
    }
    
    module.exports = {
        processStockDay,
    }