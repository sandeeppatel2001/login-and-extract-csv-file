var express = require("express");
var bodyParser = require("body-parser");
var csvModel = require("./models/csv");
var csv = require("csvtojson");
var multer = require("multer");
var path = require("path");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/Green-Canvas");
var db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("connection succeeded");
});
var app = express();

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public_/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
var uploads = multer({ storage: storage });

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "public_")));
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );
app
  .get("/", function (req, res) {
    res.set({
      "Access-control-Allow-Origin": "*",
    });
    return res.redirect("index.html");
  })
  .listen(3000);

app.post("/sign_up", uploads.single("file"), function (req, res) {
  // console.log(req);
  try {
    console.log(req.file);
    console.log(req.file.path);

    csvModel.find((err, data) => {
      if (err) {
        console.log(err);
      }
    });
    // console.log("req.body");
    // console.log(req.body);
    // console.log("req.body");
    var name = req.body.name;
    var email = req.body.email;
    // var pass = req.body.password;
    var phone = req.body.phone;
    var file = req.file;

    // console.log(file);
    // console.log(file.name);

    var data = {
      name: name,
      email: email,
      // password: pass,
      phone: phone,
      file: file.originalname,
    };
    db.collection("collection-A").insertOne(data, function (err, collection) {
      if (err) throw err;
      console.log("Record inserted Successfully");
    });
    csv()
      .fromFile(file.path)
      .then((jsonObj) => {
        // console.log(jsonObj);
        db.collection("Collection-B").insertMany(jsonObj, (err, data) => {
          if (err) {
            console.log(err);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
    return res.redirect("/success.html");
  } catch (error) {
    console.log(error);
  }
});

// app
//   .get("/", function (req, res) {
//     res.set({
//       "Access-control-Allow-Origin": "*",
//     });
//     return res.redirect("index.html");
//   })
//   .listen(3000);

console.log("server listening at port 3000");
