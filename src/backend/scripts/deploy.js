const { hre } = require("hardhat");
const { ethers } = require("hardhat");
async function main() {
	console.log("TEST");
	const NFTMarket = await ethers.getContractFactory("NFTMarket");
	const nftMarket = await NFTMarket.deploy();
	await nftMarket.deployed();
	console.log("Deplyoed to : ", nftMarket.address);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
