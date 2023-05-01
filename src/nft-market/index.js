import { Contract } from "ethers";
import { useContext } from "react";
import NFT_MARKET from "../backend/artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
const useNFTMarket = () => {
	const signer = useContext(AuthContext);
	const NFT_MARKET_ADDRESS = "0x8Fc8877F65e9e861FD0A6e09FEf245762e359Eb5";
	const nftMarket = new Contract(
		NFT_MARKET_ADDRESS,
		NFT_MARKET.abi,
		signer.signer
	);
	const navigate = useNavigate();
	const createNFT = async (Newvalue) => {
		try {
			const formdata = new FormData();
			formdata.append("name", Newvalue.name);
			formdata.append("creator", Newvalue.creator);
			formdata.append("image", Newvalue.image);
			formdata.append("price", Newvalue.price);
			const response = await fetch("http://localhost:5000/nft/sell", {
				method: "POST",
				body: formdata,
			});
			if (response.status === 201) {
				const json = await response.json();
				const transaction = await nftMarket.createNFT(json.metadata.url);
				await transaction.wait();

				const url = json.metadata.url;
				console.log(url);
				const savenft = await fetch("http://localhost:5000/nft/store", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						uri: url,
						from: transaction.from,
						to: transaction.to,
						title: Newvalue.name,
						price: Newvalue.price,
            creator: Newvalue.creator,
					}),
				});
				console.log(savenft);
				if (savenft.status === 201) {
					console.log("stored");
				}
			}
			navigate("/owned");
		} catch (e) {
			console.log(e);
			console.log("try again");
		}
	};

	const listNFT = async (tokenID, price, enddate, min_bid) => {
		console.log(tokenID);
		let id = tokenID.substring(7);
		try {
			const transaction = await nftMarket.listNFT(19, 1);
			await transaction.wait();
			console.log(id);
			let id1 = id.slice(0, -14);
			console.log(id1);
			await fetch(`http://localhost:5000/nft/${id1}/transfer`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					uri: tokenID,
					min_bid: min_bid,
					price: price,
					enddate: enddate,
				}),
			});
			navigate("/market");
		} catch (err) {
			console.log(err);
			console.log("list nft err");
		}
	};

	const cancelListing = async (tokenID) => {
		const transaction = await nftMarket.cancelListing(tokenID);
		await transaction.wait();
	};

	const buyNFT = async (tokenID,price,curr_bid,curr_bidder) => {
		try {
			const transaction = await nftMarket.buyNFT(50, {
				value: curr_bid*100000000000
			});
			await transaction.wait();
			let id = tokenID.substring(7);
			console.log(id);
			let id1 = id.slice(0, -14);
			console.log(id1);
			await fetch(`http://localhost:5000/nft/${id1}/buy`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userid: signer.address,curr_bid:curr_bid,curr_bidder:curr_bidder}),
			});
		} catch (err) {
			console.log(err);
			console.log("buy err");
		}
	};

	return {
		createNFT,
		listNFT,
		cancelListing,
		buyNFT,
	};
};

export default useNFTMarket;
