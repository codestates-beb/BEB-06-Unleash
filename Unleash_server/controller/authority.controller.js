const jwt = require("jsonwebtoken");
require("dotenv").config();

const authorityCheckGet = async (req, res, next) => {
  const token = req.cookies.accessToken;
  const client_data = req.query;
  if (typeof token == "undefined") {
    return res.status(400).send("토큰이 존재하지 않습니다.");
  }
  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!verification(client_data, data)) {
      return res.status(400).send("위조된 데이터");
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).send("실패");
  }
};
const authorityCheckPost = async (req, res, next) => {
  const token = req.cookies.accessToken;
  const client_data = req.body;
  if (typeof token == "undefined") {
    return res.status(400).send("토큰이 존재하지 않습니다.");
  }
  try {
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!verification(client_data, data)) {
      return res.status(400).send("위조된 데이터");
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(400).send("실패");
  }
};
const verification = (client_data, data) => {
  if (
    client_data.user_id !== undefined &&
    Number(client_data.user_id) !== Number(data.id)
  ) {
    return false;
  }
  if (
    client_data.seller !== undefined &&
    String(client_data.seller) !== String(data.wallet_address)
  ) {
    return false;
  }
  return true;
};

module.exports = {
  authorityCheckGet,
  authorityCheckPost,
};
