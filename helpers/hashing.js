const bcrypt = require("bcrypt");

let generateHash = function (plainText) {
  return new Promise(async function (resolve, reject) {
    try {
      let salt = await bcrypt.genSalt(12);
      let hashValue = await bcrypt.hash(plainText, salt);
      resolve(hashValue);
    } catch (error) {
      reject(error);
    }
  });
};

let compareHash = function (plainText, hashValue) {
  return new Promise(async function (resolve, reject) {
    try {
      let isTrue = await bcrypt.compare(plainText, hashValue);
      resolve(isTrue);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { generateHash, compareHash };
