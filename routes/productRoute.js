const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();
const mongoClient = mongodb.MongoClient;
const objId = mongodb.ObjectID;
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017";

router.get("/products", async (req, res) => {
  try {
    let clientInfo = await mongoClient.connect(dbUrl, {
      useUnifiedTopology: true,
    });
    let dbInfo = clientInfo.db("e_commerce");
    let data = await dbInfo.collection("users").find().toArray();
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
router.get("/get-product/:id", async (req, res) => {
  try {
    let clientInfo = await mongoClient.connect(dbUrl, {
      useUnifiedTopology: true,
    });
    let dbInfo = clientInfo.db("e_commerce");
    let data = await dbInfo
      .collection("products_1")
      .findOne({ _id: objId(req.params.id) });
    res.status(200).json({ data });
    clientInfo.close();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
router.post("/create-product", async (req, res) => {
  try {
    let clientInfo = await mongoClient.connect(dbUrl, {
      useUnifiedTopology: true,
    });
    let dbInfo = clientInfo.db("e_commerce");
    await dbInfo.collection("products_1").insertOne(req.body);
    res.status(200).json({ message: "Product Created Successfully..!!" });
    clientInfo.close();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
router.put("/update-product/:id", async (req, res) => {
  try {
    let clientInfo = await mongoClient.connect(dbUrl, {
      useUnifiedTopology: true,
    });
    let dbInfo = clientInfo.db("e_commerce");
    await dbInfo
      .collection("products_1")
      .findOneAndUpdate({ _id: objId(req.params.id) }, { $set: req.body });
    res.status(200).json({ message: "Product Updated successfully." });
    clientInfo.close();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
router.delete("/delete-product/:id", async (req, res) => {
  try {
    let clientInfo = await mongoClient.connect(dbUrl, {
      useUnifiedTopology: true,
    });
    let dbInfo = clientInfo.db("e_commerce");
    await dbInfo
      .collection("products_1")
      .deleteOne({ _id: objId(req.params.id) });
    res.status(200).json({ message: "Product Deleted successfully." });
    clientInfo.close();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
