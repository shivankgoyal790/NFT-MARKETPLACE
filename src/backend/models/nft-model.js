const mongoose = require("mongoose");
const nftschema = new mongoose.Schema({
	uri: { type: String, required: true },
	from : {type : String , required : true},
	to : {type : String , required : true},
	title : {type : String , required : true},
	creator:{type : String},
	on_auction : {type : Boolean , default : false},
	price : {type : Number,default:null},
	startdate: {type : Date,default : null},
	enddate :{type : Date,default : null},
    curr_bid : {type : Number ,default : 0},
	bidder_name : {type : String },
	curr_bidder : {type : String },
    min_bid : {type : Number ,default : 0}
});

module.exports = mongoose.model("nft", nftschema);
