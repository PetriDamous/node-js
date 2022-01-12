function addNumbers(a, b) {
  return a + b;
}

// We are adding a property to store our function
// for export.
module.exports.addNumbers = addNumbers;

/*
// In a place we cannot access there is a 
// that looks something like this
function(....., module, exports)

// The module argument is an object
// with an exports property.
const module = {
    exports: {}
}

// The exports argument points to
// module.exports.
let exports = module.exports 

// * works
// This works because we are just overwitting
// the exports object with our own object.
// We are not overwriting the module export 
// itself.
module.exports = {

}

// * works
// This works because we are just adding on the 
// module.exports stored in the exports variable.
exports.a = 100

// * fails
// We are now overwiting module.exports 
// object with a new object and storing it
// in the exports variable.
exports = {
    a: 100
}
*/
