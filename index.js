require("dotenv").config();
const express = require("express");
const cors = require("cors");
const listRouteEndPoints = require("express-list-endpoints");

const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");
const { authenticate } = require("./helpers/authorize");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use("/api", productRouter);
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.send("Home route");
});

app.get("/dashboard", [authenticate], (req, res) => {
  res.status(200).json({ message: "welcome to dashboard" });
});

app.listen(port, () => console.log("App runs on ", port));

// console.log(listRouteEndPoints(app));
