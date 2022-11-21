const marketplace = require("./marketplace.route");


module.exports = app=>{
    app.use("/marketplace",marketplace);
}