require("dotenv").config();
const { db, sequelize } = require("../sequelize/models/index.js");
const { Op } = require("sequelize");
const ethers = require("ethers");
const unleashAbi = require("../initialSignSet/contract/exAbi.json");
const marketAbi = require("../initialSignSet/contract/MarketAbi.json");
const request = require("request");
const cron = require("node-cron");

const options = {
  uri: "https://api-goerli.etherscan.io/api",
  qs: {
    module: "logs",
    action: "getLogs",
    address: "0x584916D9Cf08A74Ca99Dd2F1a67cab0f30eaaB87",
    apikey: "I6H77CGQG34JZ2K2VCQ5X7V5ZG6KA7Y86F",
    toBlock: "latest",
    fromBlock: 8053206,
  },
};

const options2 = {
  uri: "https://api-goerli.etherscan.io/api",
  qs: {
    module: "logs",
    action: "getLogs",
    address: "0x1351130058AD0A28F4568BCDB72010b7436ABC4F",
    apikey: "I6H77CGQG34JZ2K2VCQ5X7V5ZG6KA7Y86F",
    toBlock: "latest",
    fromBlock: 8053230,
  },
};

cron.schedule("* 30 * * * *", () => {
  request(options, (err, res, body) => {
    const unleashData = JSON.parse(body)
      .result.filter(
        (data) =>
          data.topics[0] ==
          "0xaacef1bbb194eac329f8f247fbe8cce3eca2ed1f2e0a45a0488c2dd8afe6e516"
      )
      .map((el) => {
        return el.data;
      })
      .map((el) => {
        return {
          status: "Mint",
          token_id: parseInt(el.substr(2, 64), 16),
          price: parseInt(el.substr(66, 64), 16),
          amount: parseInt(el.substr(130, 64), 16),
          buyer: "0x" + String(el.substr(194, 64)).substr(24, 64),
        };
      });
    console.log(unleashData);
  });

  request(options2, (err, res, body) => {
    const marketData = JSON.parse(body)
      .result.map((el) => {
        if (
          el.topics[0] ==
          "0xb5592180b48c7b68f85af2d9462bfa952df58573a64912c3f14fe5c3b68ff314"
        ) {
          return {
            status: "Sell",
            offer_id: parseInt(el.data.substr(2, 64), 16),
            token_id: parseInt(el.data.substr(66, 64), 16),
            price: parseInt(el.data.substr(130, 64), 16),
            amount: parseInt(el.data.substr(194, 64), 16),
            seller: "0x" + String(el.data.substr(258, 64)).substr(24, 64),
          };
        }
        if (
          el.topics[0] ==
          "0xa29189bb2b908a5a5fee6ee07dff271fa01d2cb47a795f57690dfb02d7d722c1"
        ) {
          return {
            status: "Cancel",
            offer_id: parseInt(el.data.substr(2, 64), 16),
            token_id: parseInt(el.data.substr(66, 64), 16),
            amount: parseInt(el.data.substr(130, 64), 16),
            seller: "0x" + String(el.data.substr(194, 64)).substr(24, 64),
          };
        }
        if (
          el.topics[0] ==
          "0x8fb070d5530ac1d7b5e5619abdf76b904f079a77e615f425e79886f67257f945"
        ) {
          return {
            status: "Buy",
            offer_id: parseInt(el.data.substr(2, 64), 16),
            token_id: parseInt(el.data.substr(66, 64), 16),
            price: parseInt(el.data.substr(130, 64), 16),
            amount: parseInt(el.data.substr(194, 64), 16),
            seller: "0x" + String(el.data.substr(258, 64)).substr(24, 64),
            buyer: "0x" + String(el.data.substr(322, 64)).substr(24, 64),
          };
        }
      })
      .filter((el) => el !== undefined);
    console.log(marketData);
  });
});

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
