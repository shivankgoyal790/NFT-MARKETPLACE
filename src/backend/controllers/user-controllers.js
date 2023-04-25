const Users = require("../models/user-model");
const getuserbyid = () => {
	console.log("this is your user");
};

const connect = async (req, res) => {
	const name = req.body.name;
	const id = req.body.id;
	try {
		const newuser = await new Users({
			name,
			id,
		});
		if (newuser) {
			await newuser.save();
			res.status(200).json(newuser);
		}
	} catch (err) {
		console.log("cannot connect to wallet");
	}
};

const updateuser = () => {
	console.log("userupdated");
};

exports.getuserbyid = getuserbyid;
exports.connect = connect;
exports.updateuser = updateuser;
