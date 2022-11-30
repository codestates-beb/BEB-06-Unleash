require("dotenv").config();
const { db, sequelize } = require("../sequelize/models/index.js");
const { Op } = require("sequelize");
const ethers = require("ethers");
const unleashAbi = require("../initialSignSet/contract/exAbi.json");
const marketAbi = require("../initialSignSet/contract/MarketAbi.json");

const test = async () => {
  const unleashAddress = "0xB7c26E7F3d7AE71cE62A97Edc59Fe4F4d94AAA3D";
  const marketAddress = "0xB7c26E7F3d7AE71cE62A97Edc59Fe4F4d94AAA3D";
  const privateKey = process.env.PRIVATE_KEY;
  const provider = ethers.providers.getDefaultProvider({
    name: "goerli",
    chainId: 5,
  });
  const walletWithProvider = new ethers.Wallet(privateKey, provider);
  const unleashContract = new ethers.Contract(
    unleashAddress,
    unleashAbi,
    walletWithProvider
  );
  const marketContract = new ethers.Contract(
    marketAddress,
    marketAbi,
    walletWithProvider
  );
};

module.exports = {
  test,
};
