const { db } = require("../sequelize/models/index.js");
const { Op } = require("sequelize");

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
      include: [
        {
          model: db.marketplace,
          as: "marketplaces",
          required: true,
          attributes: ["offer_id", "token_id", "amount", "seller", "price"],
        },
      ],
    });
    return res.status(200).json(ticket_data);
  } catch (err) {
    console.log(err);
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
    lst.push({ arrivaltime: arrivaltime });
  }
  return lst;
};

module.exports = {
  ticketInfo,
  priceHistory,
};
