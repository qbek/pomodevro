const express = require("express");
const app = express();
const http = require("http").Server(app);

const handlebars = require("express-handlebars").create({defaultLayout: "main"});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.set("port", process.env.PORT || 8080);

app.get("/", function(req, res){
  res.render("home");
});


app.use((req, res) => {
  res.status(404);
  res.send("404 - Not found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.send("500 - Server error.\n" + err.stack);
});

http.listen(app.get("port"), () => console.log("Dart is running on", app.get("port"), "port.\n", "Press Ctrl+C to terminate"));