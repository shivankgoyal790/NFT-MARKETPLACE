const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
	name: { type: String, required: true },
	id: { type: String, required: true },
	itemscollected: [
		{ type: mongoose.Types.ObjectId, require: true, ref: "nft" },
	],
	itemscreated: [{ type: mongoose.Types.ObjectId, require: true, ref: "nft" }],
});
module.exports = mongoose.model("Users", userschema);
