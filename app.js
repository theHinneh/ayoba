const express = require("express");
const mongoose = require("mongoose");
const todoRoute = require("./routes/todoRoutes");
const cors = require("cors");

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");

const app = express();

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("db connected"))
  .catch((e) => console.log(e));

app.enable("trust proxy");
app.use(cors({}));

app.use("/static", express.static("public"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/test", (req, res) => {
  res.send("<h2>Hi There!!!</h2>");
});
app.use("/", todoRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server Up on port ${PORT}`));
