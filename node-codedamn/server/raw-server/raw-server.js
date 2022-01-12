// HTTP module
const http = require("http");

// Creating server.
// .createServer() method takes two arguments:
// 1. request - takes request from client
// 2. response - sends response to client
// .creatServer() method creates server object.
const server = http.createServer((req, res) => {
  res.write("Hello client");
  res.end();
});

// On server object we can start the server and have
// it listen to whatever port we want it to.
// 2 argument:
// 1. Port we want our server to run on.
// 2. Call back function.
server.listen(3001, () => {
  console.log("Listening on port 3001");
});
