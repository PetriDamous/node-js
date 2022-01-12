// Importing from utils.js
const utils = require("./utils");

const _fs = require(fs);

const fs = _fs.promise;

// logging a function that we exported
console.log(utils.addNumbers(7, 2));
