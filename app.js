"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var typeorm_1 = require("typeorm");
var todoRoute = require("./routes/todoRoutes");
require("reflect-metadata");
// const mongoose = require("mongoose");
// const {
//   MONGO_USER,
//   MONGO_PASSWORD,
//   MONGO_IP,
//   MONGO_PORT,
// } = require("./config/config");
// const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
// mongoose
//   .connect(mongoUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   })
//   .then(() => console.log("db connected"))
//   .catch((e) => console.log(e));
typeorm_1.createConnection().then(async connection => {
    var app = express();
    app.enable("trust proxy");
    app.use(cors({}));
    app.use("/static", express.static("public"));
    app.set("view engine", "ejs");
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.get("/test", function (req, res) {
        res.send("<h2>Hi There!!!</h2>");
    });
    app.use("/", todoRoute);
    var PORT = process.env.PORT || 3000;
    app.listen(PORT, function () { return console.log("Server Up on port " + PORT); });
});
