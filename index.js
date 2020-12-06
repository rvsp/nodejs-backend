require("dotenv").config();
const express = require("express");
const cors = require("cors");
const listRouteEndPoints = require("express-list-endpoints");

const productRouter = require("./routes/productRoute");
const userRouter = require("./routes/userRoute");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use("/api", productRouter);
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.send([
    {
      path: "/api/products",
      methods: ["GET"],
      middleware: ["anonymous"],
    },
    {
      path: "/api/get-product/:id",
      methods: ["GET"],
      middleware: ["anonymous"],
    },
    {
      path: "/api/create-product",
      methods: ["POST"],
      middleware: ["anonymous"],
    },
    {
      path: "/api/update-product/:id",
      methods: ["PUT"],
      middleware: ["anonymous"],
    },
    {
      path: "/api/delete-product/:id",
      methods: ["DELETE"],
      middleware: ["anonymous"],
    },
    {
      path: "/api/user/login",
      methods: ["POST"],
      middleware: ["anonymous"],
    },
    {
      path: "/api/user/register",
      methods: ["POST"],
      middleware: ["anonymous"],
    },
    { path: "/", methods: ["GET"], middleware: ["anonymous"] },
  ]);
});

app.listen(port, () => console.log("App runs on ", port));

// console.log(listRouteEndPoints(app));
