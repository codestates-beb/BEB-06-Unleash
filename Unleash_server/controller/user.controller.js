const { db } = require("../sequelize/models/index.js");
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
      attributes: ["id", "wallet_address"],
    });

    if (userInfo[0].dataValues.length === 0) {
      return res.status(400).send("일치하는 유저가 없습니다.");
    }
    const accessToken = jwt.sign(
      userInfo[0].dataValues,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1000000sec",
      }
    );
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      expiresIn: "1000000sec",
    });
    console.log(userInfo[0].dataValues);
    return res.status(200).json(userInfo[0].dataValues);
  } catch (err) {
    return res.status(400).send("invalid token");
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("accessToken", "");
    return res.status(200).send("logout");
  } catch (err) {
    return res.status(400).send(err);
  }
};

const approve = async (req, res) => {
  const token = req.cookies.accessToken;

  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // if (!req.body.data) {
    // 클라이언트로부터 온 isUserData가 false이면 상태가 없는것이므로 값을 보내줌
    return res.status(200).send({
      message: "ok",
      data: {
        userInfo: data,
      },
    });
    // }
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      // 유효기간이 지났을때
      res.cookie("accessToken", "");
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

  try {
    const myToken = await db.token_holder.findAll({
      where: {
        user_id: client_data.user_id,
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
        seller: client_data.seller,
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

module.exports = {
  myPageOwned,
  myPageSelling,
  joinMembership,
  login,
  myPageSelled,
  approve,
  logout,
};
