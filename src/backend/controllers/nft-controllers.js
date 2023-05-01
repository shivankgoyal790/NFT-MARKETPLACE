const nft = require("../models/nft-model");
require("dotenv/config");
const Users = require("../models/user-model");
const { NFTStorage, File } = require("nft.storage");
const getallnft = async (req, res) => {
	let userid = "0x8Fc8877F65e9e861FD0A6e09FEf245762e359Eb5";
	let allitems;
	try {
		allitems = await nft.find({ from: userid });
	} catch (err) {
		console.log(err);
		res.status(404).json("cannot get items");
	}
	res.status(201).json({
		items: allitems,
	});
};
let metadata;
const getnftbyid = async (req, res) => {
	const tokenid = req.params.tid;
	let id = `ipfs://${tokenid}/metadata.json`;
	let answer;
	try {
		answer = await nft.find({ uri: id });
		res.status(200).json({ nfts: answer.toObject({ getters: true }) });
	} catch (err) {
		console.log(err);
	}
};

const createitem = async (req, res) => {
	const { name, creator, price } = req.body;
	const client = new NFTStorage({ token: `${process.env.NFT_STORAGE_KEY}` });

	try {
		metadata = await client.store({
			name: name,
			description: creator,
			image: new File(req.file.path, req.file.mimetype, {
				type: req.file.mimetype,
			}),
			price: price,
		});
		console.log(metadata);
		res.status(201).json({ metadata: metadata });
	} catch (err) {
		console.log(err);
		console.log("cannot create item");
		res.status(404);
	}
};

const savenft = async (req, res) => {
	const { uri, from, to, title, price, creator } = req.body;
	console.log(creator);
	let nfturi;
	try {
		nfturi = new nft({
			uri: uri,
			from: from,
			to: to,
			title: title,
			price: price,
			creator: creator,
		});
		if (nfturi) {
			await nfturi.save();
			res.status(201).json("hogya");
		} else {
			res.status(404).json("data");
		}
	} catch (err) {
		res.status(404).json("cannot");
		console.log(err);
		res.status(404);
	}
};
const getnftbyuserid = async (req, res) => {
	const userid = req.params.uid;
	let answer;
	try {
		answer = await nft.find({ from: userid });
		res.status(201).json({ nfts: answer });
	} catch (err) {
		console.log(err);
	}
};

const updatenft = async (req, res) => {
	const tokenid = req.params.tid;
	let id = `ipfs://${tokenid}/metadata.json`;
	console.log(id);

	let mynft;
	try {
		mynft = await nft.find({ uri: id });
		let from = mynft[0].from;
		let to = mynft[0].to;
		mynft[0].from = to;
		mynft[0].to = from;
		mynft[0].startdate = new Date();
		mynft[0].on_auction = true;
		mynft[0].min_bid = req.body.min_bid;
		mynft[0].enddate = req.body.enddate;
		console.log(mynft[0]);
		await mynft[0].save();
		res.status(201).json("tranferred");
	} catch (err) {
		console.log(err);
		res.status(404).json("cannot transfer");
	}
};
const updatebid = async (req, res) => {
	const tokenid = req.params.tid;
	body = req.body;
	console.log(body);
	let id = `ipfs://${tokenid}/metadata.json`;
	console.log(id);
	let mynft;
	try {
		mynft = await nft.find({ uri: id });
		mynft[0].curr_bid = body.curr_bid;
		mynft[0].curr_bidder = body.curr_bidder;
		mynft[0].bidder_name = body.bidder_name
		console.log(mynft[0]);
		await mynft[0].save();
		res.status(201).json("bid updated");
	} catch (err) {
		console.log(err);
		res.status(404).json("cannot update bid");
	}
};

const buynft = async (req, res) => {
	const tokenid = req.params.tid;
	let id = `ipfs://${tokenid}/metadata.json`;
	let mynft;
	try {
		mynft = await nft.find({ uri: id });
		mynft[0].on_auction = false;
		mynft[0].from = req.body.curr_bidder;
		mynft[0].price = req.body.curr_bid;
		await mynft[0].save();

		res.status(201).json("nft bought");
	} catch (err) {
		console.log(err);
		res.status(404).json("cannot buy");
	}
};
exports.createitem = createitem;
exports.getallnft = getallnft;
exports.savenft = savenft;
exports.getnftbyid = getnftbyid;
exports.getnftbyuserid = getnftbyuserid;
exports.updatenft = updatenft;
exports.buynft = buynft;
exports.updatebid = updatebid;
