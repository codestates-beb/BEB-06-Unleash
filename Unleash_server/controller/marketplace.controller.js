const { db } = require("../sequelize/models/index.js");
const { Op, where } = require("sequelize");
const token_holder = require("../sequelize/models/token_holder.js");

const ticketInfo = async (req, res) => {
  const client_data = req.body;

  try {
    const ticket_data = await db.ticket.findAll({
      attributes: [
        "token_id",
        "from",
        "to",
        "departuretime",
        "arrivaltime",
        "class",
      ],
      where: {
        [Op.and]: verification(client_data),
      },
    });
    const marketplace_data = await db.ticket.findAll({
      attributes: [],
      where: {
        [Op.and]: verification(client_data),
      },
      include: [
        {
          model: db.marketplace,
          as: "marketplaces",
          required: true,
          attributes: ["offer_id", "token_id", "amount", "seller", "price"],
        },
      ],
    });

    return res
      .status(200)
      .json({ ticket_data: ticket_data, marketplace_data: marketplace_data });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

const sell = async (req, res) => {
  const client_data = req.body;

  try {
    await db.marketplace.create({
      offer_id: client_data.offer_id,
      token_id: client_data.token_id,
      price: client_data.price,
      amount: client_data.amount,
      seller: client_data.seller,
    });
    return res.status(200).send("성공");
  } catch (err) {
    return res.status(400).send(err);
  }
};
const cancel = async (req, res) => {
  const client_data = req.body;

  try {
    await db.marketplace.update(
      {
        amount: 0,
      },
      {
        where: {
          offer_id: client_data.offer_id,
        },
      }
    );
    await db.token_holder.increment(
      {
        amount: client_data.amount,
      },
      {
        where: {
          [Op.and]: [
            { user_id: client_data.user_id },
            { token_id: client_data.token_id },
          ],
        },
      }
    );
    return res.status(200).send("성공");
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

const buy = async (req, res) => {
  const client_data = req.body;

  try {
    await db.marketplace.decrement(
      {
        amount: client_data.amount,
      },
      {
        where: {
          offer_id: client_data.offer_id,
        },
      }
    );
    const token_holder = await db.token_holder.findAll({
      where: {
        [Op.and]: [
          { user_id: client_data.user_id },
          {
            token_id: client_data.token_id,
          },
        ],
      },
    });
    if (token_holder.length === 0) {
      await db.token_holder.create({
        user_id: client_data.user_id,
        token_id: client_data.token_id,
        amount: client_data.amount,
      });
      return res.status(200).send("보유하지 않았던 토큰 저장 성공");
    }
    await db.token_holder.increment(
      {
        amount: client_data.amount,
      },
      {
        where: {
          [Op.and]: [
            { user_id: client_data.user_id },
            { token_id: client_data.token_id },
          ],
        },
      }
    );
    return res.status(200).send("보유하고 있는 토큰 저장 성공");
  } catch (err) {
    return res.status(400).send(err);
  }
};

const priceHistory = async (req, res) => {
  const client_data = req.body;
  try {
    const price_history = await db.marketplace.findAll({
      attributes: ["price"],
      where: {
        token_id: client_data.token_id,
      },
    });
    return res.status(200).json(price_history);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

const verification = (data) => {
  let lst = [];
  if (data.to !== undefined) {
    lst.push({ to: data.to });
  }
  if (data.departuretime !== undefined) {
    lst.push({ departuretime: data.departuretime });
  }
  if (data.class !== undefined) {
    lst.push({ class: data.class });
  }
  if (data.from !== undefined) {
    lst.push({ from: data.from });
  }
  if (data.arrivaltime) {
    lst.push({ arrivaltime: data.arrivaltime });
  }
  return lst;
};

module.exports = {
  ticketInfo,
  priceHistory,
  sell,
  cancel,
  buy,
};
