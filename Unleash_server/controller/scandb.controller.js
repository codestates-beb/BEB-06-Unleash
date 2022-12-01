require("dotenv").config();
const { db, sequelize } = require("../sequelize/models/index.js");
const { Op } = require("sequelize");
const ethers = require("ethers");
const unleashAbi = require("../initialSignSet/contract/exAbi.json");
const marketAbi = require("../initialSignSet/contract/MarketAbi.json");
const request = require("request");

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

  const unleashEventCount = await unleashContract.listenerCount();
  const unleashEvent = await unleashContract.listeners("Mint");
  const marketEventCount = await marketContract.listenerCount();
  console.log(unleashEventCount);
  console.log(unleashEvent);
  console.log(marketEventCount);

  const options = {
    uri: "https://api-goerli.etherscan.io/api",
    qs: {
      module: "logs",
      action: "getLogs",
      address: "0x584916D9Cf08A74Ca99Dd2F1a67cab0f30eaaB87",
      apikey: "I6H77CGQG34JZ2K2VCQ5X7V5ZG6KA7Y86F",
      toBlock: 8053524,
      fromBlock: 8053206,
    },
  };

  request(options, (err, res, body) => {
    const data = JSON.parse(body).result.map((el) => {
      return (
        el.topics[0] ===
        "0xaacef1bbb194eac329f8f247fbe8cce3eca2ed1f2e0a45a0488c2dd8afe6e516"
      );
    });

    console.log(data);
  });
};

module.exports = {
  test,
};
