const express = require("express");
const mongodb = require("mongodb");
const jwt = require("jsonwebtoken");

const { generateHash, compareHash } = require("../helpers/hashing");
const router = express.Router();
const mongoClient = mongodb.MongoClient;
const objId = mongodb.ObjectID;
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017";

router.post("/user/login", async (req, res) => {
  try {
    let clientInfo = await mongoClient.connect(dbUrl, {
      useUnifiedTopology: true,
    });
    let dbInfo = clientInfo.db("e_commerce");
    let data = await dbInfo
      .collection("users")
      .findOne({ email: req.body.email });
    if (data) {
      let isValid = await compareHash(req.body.password, data.password);
      if (isValid) {
        let token = await jwt.sign({ userId: data._id }, process.env.JWT_KEY);
        res.status(200).json({ message: "Login Successful..!!", token });
      } else {
        res.status(401).json({ message: "Login credentials are invalid..!!" });
      }
    } else {
      res.status(400).json({ message: "User isn't registered" });
    }
    clientInfo.close();
  } catch (error) {
    console.log(error);
    res.send(500);
  }
});
router.post("/user/register", async (req, res) => {
  try {
    let clientInfo = await mongoClient.connect(dbUrl, {
      useUnifiedTopology: true,
    });
    let dbInfo = clientInfo.db("e_commerce");
    let data = await dbInfo
      .collection("users")
      .findOne({ email: req.body.email });
    if (data) {
      res.status(400).json({ message: "User already registered" });
    } else {
      req.body.password = await generateHash(req.body.password);
      await dbInfo.collection("users").insertOne(req.body);
      res.status(200).json({ message: "Registration Successful..!!" });
    }
    clientInfo.close();
  } catch (error) {
    console.log(error);
    res.send(500);
  }
});

module.exports = router;
