const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require("mongoose");
const { apiErrorHandler } = require("./errors/errorHandler");
const config = require("./config");
const cookieParser = require("cookie-parser");
const app = express();
const connect = mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/users", require("./routes/userRoute"));

app.use(apiErrorHandler);
const server = app.listen(config.port, () => {
  console.log("server started on " + config.port);
});
