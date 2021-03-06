const express = require("express");
const app = express();
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("year", () =>{
    return new Date().getFullYear();
})
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile("server.log", `${now}: ${req.method} ${req.url}\n`, (err) => {
    if(err){
        console.log("Unable to write to server.log!");
    }
  });
  next();
});

// app.use((req, res, next) => {
//   if(req.url === "/maintenance"){
//     res.render("maintenance", {
//       pageTitle: "Mentanace Page",
//       message: "love you"
//     })
//   }else{
//     next();
//   }
// });

app.get("/", (req, res) => {
  res.render("home", {
    pageTitle: "Home page",
    message: "Welcome in your home",
  })
});

app.get("/about", (req, res) => {
  res.render("about", {
    pageTitle: "About page",
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "this page is corrupted"
  });
});
app.get("/portfolio", (req, res) => {
  res.render("portfolio", {
    pageTitle: "Portfolio",
    message: "portfolio Website"
  })
});

app.listen(port, () => {
  console.log(`The server is up on port ${port}`);
});
