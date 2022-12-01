require("dotenv").config();
const { db, sequelize } = require("../sequelize/models/index.js");
const { Op } = require("sequelize");
const ethers = require("ethers");
const unleashAbi = require("../initialSignSet/contract/exAbi.json");
const marketAbi = require("../initialSignSet/contract/MarketAbi.json");

const test = async () => {
  const unleashAddress = "0x584916D9Cf08A74Ca99Dd2F1a67cab0f30eaaB87";
  const marketAddress = "0x1351130058AD0A28F4568BCDB72010b7436ABC4F";
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
