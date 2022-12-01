const { db, sequelize } = require("../sequelize/models/index.js");
const { Op, where } = require("sequelize");
const { Sign } = require("../initialSignSet/index.js");

const ticketInfo = async (req, res) => {
  const client_data = req.query;

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
          model: db.nftvoucher,
          as: "nftvoucher",
          required: true,
          attributes: ["price", "totalsupply"],
        },
      ],
    });
    // const marketplace_data = await db.ticket.findAll({
    //   attributes: [],
    //   where: {
    //     [Op.and]: verification(client_data),
    //   },
    //   include: [
    //     {
    //       model: db.marketplace,
    //       as: "marketplaces",
    //       required: true,
    //       attributes: ["offer_id", "token_id", "amount", "seller", "price"],
    //     },
    //   ],
    // });

    return res.status(200).json(ticket_data);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};

const marketInfo = async (req, res) => {
  const client_data = req.body;
  try {
    const marketplace_data = await db.marketplace.findAll({
      attributes: ["offer_id", "token_id", "amount", "seller", "price"],
      where: {
        amount: { [Op.ne]: 0 },
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
    return res.status(200).json(marketplace_data);
  } catch (err) {
    return res.status(400).send("실패");
  }
};

const sell = async (req, res) => {
  const client_data = req.body;
  const transaction = await sequelize.transaction();

  try {
    await db.marketplace.create(
      {
        offer_id: client_data.offer_id,
        token_id: client_data.token_id,
        price: client_data.price,
        amount: client_data.amount,
        seller: client_data.seller,
      },
      { transaction }
    );
    await db.token_holder.decrement(
      {
        amount: client_data.amount,
      },
      {
        where: {
          [Op.and]: [
            {
              token_id: client_data.token_id,
            },
            {
              user_id: client_data.user_id,
            },
          ],
        },
      },
      { transaction }
    );
    await db.transactionHistory.create(
      {
        token_id: client_data.token_id,
        offer_id: client_data.offer_id,
        price: client_data.price,
        amount: client_data.amount,
        buyer: "Unleash",
        seller: client_data.seller,
        state: "sell",
      },
      { transaction }
    );
    await transaction.commit();
    return res.status(200).send("성공");
  } catch (err) {
    console.log(err);
    await transaction.rollback();
    return res.status(400).send(err);
  }
};
const cancel = async (req, res) => {
  const client_data = req.body;
  const transaction = await sequelize.transaction();

  try {
    await db.marketplace.update(
      {
        amount: 0,
      },
      {
        where: {
          offer_id: client_data.offer_id,
        },
      },
      { transaction }
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
      },
      { transaction }
    );
    await db.transactionHistory.create(
      {
        token_id: client_data.token_id,
        offer_id: client_data.offer_id,
        amount: client_data.amount,
        seller: "Unleash",
        state: "cancel",
      },
      { transaction }
    );
    await transaction.commit();
    return res.status(200).send("성공");
  } catch (err) {
    await transaction.rollback();
    console.log(err);
    return res.status(400).send(err);
  }
};

const mint = async (req, res) => {
  const client_data = req.body;
  const transaction = await sequelize.transaction();

  try {
    const token_holder = await db.token_holder.findAll(
      {
        where: {
          [Op.and]: [
            { user_id: client_data.user_id },
            {
              token_id: client_data.token_id,
            },
          ],
        },
      },
      { transaction }
    );
    if (token_holder.length === 0) {
      await db.token_holder.create(
        {
          user_id: client_data.user_id,
          token_id: client_data.token_id,
          amount: client_data.amount,
        },
        { transaction }
      );
    }
    if (token_holder.length !== 0) {
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
        },
        { transaction }
      );
    }
    await db.transactionHistory.create(
      {
        token_id: client_data.token_id,
        offer_id: 0,
        price: client_data.price,
        amount: client_data.amount,
        buyer: client_data.buyer,
        seller: "Unleash",
        state: "mint",
      },
      { transaction }
    );
    await transaction.commit();
    return res.status(200).send("성공");
  } catch (err) {
    await transaction.rollback();
    console.log(err.name);
    return res.status(400).send("실패");
  }
};

const buy = async (req, res) => {
  const client_data = req.body;
  const transaction = await sequelize.transaction();

  try {
    await db.marketplace.decrement(
      {
        amount: client_data.amount,
      },
      {
        where: {
          offer_id: client_data.offer_id,
        },
      },
      { transaction }
    );

    const token_holder = await db.token_holder.findAll(
      {
        where: {
          [Op.and]: [
            { user_id: client_data.user_id },
            {
              token_id: client_data.token_id,
            },
          ],
        },
      },
      { transaction }
    );
    const market_data = await db.marketplace.findOne(
      {
        where: {
          offer_id: client_data.offer_id,
        },
      },
      { transaction }
    );

    if (token_holder.length === 0) {
      await db.token_holder.create(
        {
          user_id: client_data.user_id,
          token_id: client_data.token_id,
          amount: client_data.amount,
        },
        { transaction }
      );
      await db.transactionHistory.create(
        {
          seller: market_data.dataValues.seller,
          token_id: market_data.dataValues.token_id,
          offer_id: client_data.offer_id,
          buyer: client_data.buyer,
          price: market_data.dataValues.price,
          amount: client_data.amount,
          state: "buy",
        },
        { transaction }
      );
      await transaction.commit();
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
      },
      { transaction }
    );
    await db.transactionHistory.create(
      {
        seller: market_data.dataValues.seller,
        token_id: market_data.dataValues.token_id,
        offer_id: client_data.offer_id,
        buyer: client_data.buyer,
        price: market_data.dataValues.price,
        amount: client_data.amount,
        state: "buy",
      },
      { transaction }
    );
    await transaction.commit();
    return res.status(200).send("보유하고 있는 토큰 저장 성공");
  } catch (err) {
    await transaction.rollback();
    return res.status(400).send(err);
  }
};

const priceHistory = async (req, res) => {
  const client_data = req.query;
  try {
    const price_history = await db.marketplace.findAll({
      attributes: ["price", "updatedAt"],
      order: [["updatedAt", "asc"]],
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

const signature = async (req, res) => {
  const client_data = req.query;
  try {
    let nftvoucher = await db.nftvoucher.findAll({
      attributes: ["token_id", "price", "totalsupply"],
      where: {
        token_id: client_data.token_id,
      },
    });
    nftvoucher[0].dataValues.price *= 10000;
    const signature_data = await Sign(nftvoucher[0].dataValues);
    return res.json({ signature_data: signature_data, nftvoucher: nftvoucher });
  } catch (err) {
    console.log(err);
    return res.status(400).send("실패");
  }
};

const verification = (data) => {
  let lst = [];
  if (data.to !== undefined) {
    lst.push({ to: data.to });
  }
  if (data.departuretime !== undefined) {
    lst.push({
      departuretime: {
        [Op.between]: [
          data.departuretime + "00:00:00.000Z",
          data.departuretime + "23:59:59.000Z",
        ],
      },
    });
  }
  if (data.class !== undefined) {
    lst.push({ class: data.class });
  }
  if (data.from !== undefined) {
    lst.push({ from: data.from });
  }
  // if (data.arrivaltime) {
  //   lst.push({
  //     arrivaltime: {
  //       [Op.between]: [
  //         data.arrivaltime + "T00:00:00.000Z",
  //         data.arrivaltime + "T23:59:59.000Z",
  //       ],
  //     },
  //   });
  // }
  return lst;
};

const ticketExchange = async (req, res) => {
  const client_data = req.body;
  const transaction = await sequelize.transaction();

  try {
    await db.token_holder.decrement(
      {
        amount: client_data.amount,
      },
      {
        where: {
          [Op.and]: [
            {
              token_id: client_data.token_id,
            },
            {
              user_id: client_data.user_id,
            },
          ],
        },
      },
      { transaction }
    );
    await db.transactionHistory.create(
      {
        token_id: client_data.token_id,
        offer_id: 0,
        amount: client_data.amount,
        buyer: "burn",
        seller: client_data.seller,
        state: "exchange",
      },
      { transaction }
    );
    await transaction.commit();
    return res.status(200).send("성공");
  } catch (err) {
    await transaction.rollback();
    console.log(err);
    return res.status(400).send("실패");
  }
};

module.exports = {
  ticketInfo,
  priceHistory,
  sell,
  cancel,
  buy,
  marketInfo,
  signature,
  mint,
  ticketExchange,
};
