const db = require('../sequelize/models');
const {Op} = require('sequelize');

const ticketInfo = async(req,res)=>{
    const client_data = req.body;

    try{
        const ticket_data = await db['ticket'].findAll({
            where:{
                [Op.and]:verification(client_data)
            }
        });
        return res.status(200).json(ticket_data);

    }catch(err){
        console.log(err);
        return res.status(400).send(err);
    }
};

const verification =(data)=>{
    let lst = [];
    if(data.to !== undefined){
        lst.push({to:data.to});
    };
    if(data.departuretime !== undefined){
        lst.push({departuretime:data.departuretime});
    };
    if(data.rating !== undefined){
        lst.push({rating:data.rating});
    };
    return lst;
}

module.exports = {
    ticketInfo,
}