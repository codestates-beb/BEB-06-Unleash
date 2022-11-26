const { db } = require('../sequelize/models/index.js');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const login = async (req, res) => {
  const client_data = req.body;

  try {
    // const userInfo = await db.user.findAll({
    //   where: {
    //     wallet_address: client_data.wallet_address,
    //   },
    // });
    const userInfo = { test: 'test' };

    if (userInfo.length === 0) {
      return res.status(400).send('일치하는 유저가 없습니다.');
    }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m',
    });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 9000000),
    });
    return res.status(200).json(userInfo);
  } catch (err) {
    return res.status(400).send(err);
  }
};

const joinMembership = async (req, res) => {
  const client_data = req.body;

  if (
    client_data.email === undefined ||
    client_data.sure_name === undefined ||
    client_data.given_name === undefined ||
    client_data.nick_name === undefined ||
    client_data.national === undefined ||
    client_data.country_code === undefined ||
    client_data.phone_number === undefined ||
    client_data.wallet_address === undefined ||
    client_data.birth === undefined
  ) {
    return res.status(400).send('정보가 올바르지 않습니다');
  }
  try {
    await db.user.create({
      email: client_data.email,
      sure_name: client_data.sure_name,
      given_name: client_data.given_name,
      nick_name: client_data.nick_name,
      national: client_data.national,
      country_code: client_data.country_code,
      phone_number: client_data.phone_number,
      wallet_address: client_data.wallet_address,
      birth: client_data.birth,
    });
    return res.status(200).send('성공');
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      console.log(err.message);
      return res.status(400).send('중복된 주소나 메일입니다.');
    }
    console.log(err);
    return res.status(400).send(err);
  }
};

const myPageOwned = async (req, res) => {
  const client_data = req.query;

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
  const client_data = req.query;

  try {
    const marketToken = await db.marketplace.findAll({
      where: {
        [Op.and]: [
          {
            seller: client_data.seller,
          },
          {
            amount: { [Op.ne]: 0 },
          },
        ],
      },
    });
    return res.status(200).json(marketToken);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

const myPageSelled = async (req, res) => {
  const client_data = req.query;
  try {
    const data = await db.transactionHistory.findAll({
      where: {
        seller: client_data.seller,
      },
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).send('에러');
  }
};

module.exports = {
  myPageOwned,
  myPageSelling,
  joinMembership,
  login,
  myPageSelled,
};
