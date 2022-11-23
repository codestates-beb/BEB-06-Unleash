const { db } = require("../sequelize/models/index.js");
const { Op } = require("sequelize");

const joinMembership = async (req, res) => {
  const client_data = req.body;

  try {
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

const myPageOwned = async (req, res) => {
  const client_data = req.body;

  try {
    const myToken = await db.token_holder.findAll({
      where: {
        user_id: client_data.user_id,
      },
    });
    return res.status(200).json(myToken);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

const myPageSelling = async (req, res) => {
  const client_data = req.body;

  try {
    const marketToken = await db.marketplace.findAll({
      where: {},
    });
    return res.status(200).json(marketToken);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

const myPageCancel = async (req, res) => {
  const client_data = req.body;

  try {
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

module.exports = { myPageOwned, myPageSelling };
