console.log("我是 car2");

let owner = "BMW";

module.exports = {
    setOwner: function(name) {
        owner = name;
    },
    getOwner: function() {
        return owner;
    },
};