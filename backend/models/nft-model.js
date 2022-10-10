const mongoose = require("mongoose");
const nftschema = new mongoose.Schema({
	name: { type: String, required: true },
	issold: { type: Boolean, required: true },
	currBid: { type: Number, required: true },
	image: { type: String },
	history: [{ type: mongoose.Types.ObjectId, type: Number, ref: "Users" }],
	creator: { type: mongoose.Types.ObjectId, require: true, ref: "Users" },
});

module.exports = mongoose.model("nft", nftschema);
