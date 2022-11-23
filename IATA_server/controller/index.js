const db = require("../sequelize/models");
module.exports = {
    test: async(req,res) => {
        try {
            const result = await db["vc_list"].create({
                user_id:1,
                did:"did",
                vc:"vc"
            });
            return res.status(200).send(result)
        } catch (error) {
            return res.status(404).send(`error MESSAGE : ${error}`)
        }
    }
}