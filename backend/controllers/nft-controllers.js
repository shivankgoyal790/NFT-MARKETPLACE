const nft = require("../models/nft-model");
const Users = require("../models/user-model");

const getallnft = () => {
	console.log("all nfts returned");
};

const getnftbyid = () => {
	console.log("your nft is here");
};

const createitem = async (req, res) => {
	const { name, issold, currBid, image, history, creator } = req.body;
	try {
		const newnft = new nft({
			name,
			issold,
			currBid,
			image,
			history,
			creator,
		});

		if (newnft) {
			await newnft.save();
			res.status(200).json(newnft);
		}
	} catch (err) {
		console.log("cannot create nft");
		console.log(err);
	}
};

const getnftbyuserid = () => {
	console.log("all users nfts");
};

const updatenft = () => {
	console.log("nft updated");
};
exports.createitem = createitem;
exports.getallnft = getallnft;
exports.getnftbyid = getnftbyid;
exports.getnftbyuserid = getnftbyuserid;
exports.updatenft = updatenft;
