const { db, sequelize } = require("../sequelize/models/index.js");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const login = async (req, res) => {
  const client_data = req.body;
  try {
    const userInfo = await db.user.findAll({
      where: {
        wallet_address: client_data.wallet_address,
      },
      attributes: ["id", "wallet_address", "approve"],
    });
    if (userInfo === undefined || userInfo.length === 0) {
      return res.status(400).send("invalid user");
    }
    // 1000*60*30 = 1800000 (= 30min)
    const expireTime = { time: "1800000" };
    const accessToken = jwt.sign(
      userInfo[0].dataValues,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: expireTime.time }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      expiresIn: expireTime.time,
    });
    const data = [userInfo[0].dataValues, expireTime];
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", "");
    return res.status(200).send("logout");
  } catch (err) {
    return res.status(400).send(err);
  }
};

const approve = async (req, res) => {
  const token = req.cookies.accessToken;

  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return res.status(200).send({
      message: "ok",
      data: {
        userInfo: data,
      },
    });
  } catch (e) {
    console.log(e);
    if (e.name === "TokenExpiredError") {
      // 유효기간이 지났을때
      res.clearCookie("accessToken", "");
      return res.status(400).send("expired access token");
    } else if (typeof cookie == "undefined") {
      // 쿠키가 제대로 안들어왔을때
      return res.json({ message: "token undefined" });
    }
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
    return res.status(400).send("정보가 올바르지 않습니다");
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
    return res.status(200).send("성공");
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      console.log(err.message);
      return res.status(400).send("중복된 주소나 메일입니다.");
    }
    console.log(err);
    return res.status(400).send(err);
  }
};

const myPageOwned = async (req, res) => {
  const client_data = req.query;
  const transaction = await sequelize.transaction();

  try {
    const myToken = await db.token_holder.findAll(
      {
        where: {
          [Op.and]: [
            {
              user_id: client_data.user_id,
            },
            {
              amount: { [Op.gt]: 0 },
            },
          ],
        },
        include: [
          {
            model: db.ticket,
            as: "token",
            required: true,
            attributes: ["from", "to", "departuretime", "arrivaltime", "class"],
          },
        ],
      },
      { transaction }
    );
    const token_list = myToken.map((el) => {
      return el.token_id;
    });
    const price_list = await db.nftvoucher.findAll(
      {
        attributes: ["token_id", "price"],
        where: {
          token_id: { [Op.in]: token_list },
        },
      },
      { transaction }
    );
    await transaction.commit();
    return res.status(200).json({ myToken: myToken, price_list: price_list });
  } catch (err) {
    await transaction.rollback();
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
      include: [
        {
          model: db.ticket,
          as: "token",
          required: true,
          attributes: ["from", "to", "departuretime", "arrivaltime", "class"],
        },
      ],
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
        [Op.and]: [
          {
            seller: client_data.seller,
          },
          {
            buyer: { [Op.notIn]: ["Unleash", "burn"] },
          },
        ],
      },
      include: [
        {
          model: db.ticket,
          as: "token",
          required: true,
          attributes: ["from", "to", "departuretime", "arrivaltime", "class"],
        },
      ],
    });
    return res.status(200).json(data);
  } catch (err) {
    return res.status(400).send("에러");
  }
};

const myPageUsed = async (req, res) => {
  const client_data = req.query;

  try {
    const data = await db.transactionHistory.findAll({
      where: {
        [Op.and]: [
          {
            seller: client_data.seller,
          },
          {
            buyer: "burn",
          },
        ],
      },
      include: [
        {
          model: db.ticket,
          as: "token",
          required: true,
          attributes: ["from", "to", "departuretime", "arrivaltime", "class"],
        },
      ],
    });
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(400).send("실패");
  }
};

const tokenApprove = async (req, res) => {
  const client_data = req.body;

  try {
    await db.user.update(
      {
        approve: "true",
      },
      {
        where: {
          id: client_data.user_id,
        },
      }
    );
    return res.status(200).send("성공");
  } catch (err) {
    console.log(err);
    return res.status(400).send("실패");
  }
};

module.exports = {
  myPageOwned,
  myPageSelling,
  joinMembership,
  login,
  myPageSelled,
  approve,
  logout,
  tokenApprove,
  myPageUsed,
};
