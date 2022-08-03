var process = require("process");
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
// stdin.setEncoding("utf8");

var _this = this;
var key_reaction = function(key) {
    if (key == "\u0003") {
        process.exit();
    }
    console.log(key);
    process.exit();
};

    stdin.on("data", key_reaction);