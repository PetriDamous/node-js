const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

//CALL BACKS
// function getUsers(cb){
//   fs.readFile('data.json', 'utf8', (err, data) => {
//     if (err) return cb(err);
//     const users = JSON.parse(data);
//     return cb(null, users);
//   });
// }

// app.get('/', (req,res) => {
//   getUsers((err, users)=>{
//     if(err){
//       res.render('error', {error:err});
//     } else {
//       res.render('index', {title: "Users", users: users.users})
//     }
//   });
// });

function getUsers() {
  return new Promise((resolve, reject) => {
    fs.readFile("data.json", "utf8", (err, data) => {
      if (err) {
        return reject(err);
      }
      const users = JSON.parse(data);
      return resolve(users);
    });
  });
}

app.get("/", (req, res) => {
  getUsers()
    .then((users) => res.render("index", { ...users }))
    .catch((error) => res.render("error", { error }));
});

app.listen(3000, () => console.log("App listening on port 3000!"));