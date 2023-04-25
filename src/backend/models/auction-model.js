const mongoose = require("mongoose");
const auctionschema = new mongoose.Schema({
	user_id: { type: String, required: true },
    startdate: {type : Date,required : true},
    token_uri : {type :String , required : true},
    curr_bid : {type : Number , reqired : true},
    min_bid : {type : Number , required : true},
    seller_id : {type :String,reqired : true}
});
module.exports = mongoose.model("auction", auctionschema);