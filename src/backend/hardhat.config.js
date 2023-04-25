require("dotenv/config");
require("@nomiclabs/hardhat-waffle");
// require("@nomicfoundation/hardhat-toolbox");
require("hardhat/config").HardhatUserConfig;

const SEPOLIA_URL = process.env.SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

console.log("SU :", SEPOLIA_URL);
module.exports = {
	solidity: "0.8.17",
	networks: {
		sepolia: {
			url: SEPOLIA_URL,
			accounts: [PRIVATE_KEY],
		},
	},
};
