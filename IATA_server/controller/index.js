const db = require("../sequelize/models");
module.exports = {
    test: async(req,res) => {
        try {
            const vcInfo = await db["vc_list"].findOne({
                where: {
                  did: "did:ethr:0x5:0x3aFA93a829a3d12D56336e6320559C8A372e76AE"
                }
              });
            return res.status(200).send(vcInfo)
        } catch (error) {
            return res.status(404).send(`error MESSAGE : ${error}`)
        }
    }
}