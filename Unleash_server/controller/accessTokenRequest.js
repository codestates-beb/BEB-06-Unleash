const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = (req, res) => {
  const authorization = req.headers['authorization'];
  if (!authorization) {
    return res
      .status(400)
      .send({ data: null, message: 'invalid access token' });
  }

  try {
    const token = authorization.split(' ')[1];
    const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return res.status(200).send({
      message: 'ok',
      data: {
        userInfo: data,
      },
    });
  } catch (e) {
    return res.status(400).send({
      data: null,
      message: 'invalid access token',
    });
  }
};
