import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/ava-01.png";
import "./nft-card.css";
import useNFTMarket from "../../../nft-market";
import Modal1 from "../../ui/Modal/Modal1";
import Modal from "../../ui/Modal/Modal";
const NftCard = (props) => {
	const { buyNFT } = useNFTMarket();
	const [loading, setisloading] = useState(false);
	const [mydata, setmydata] = useState("");
	const [imagedata, setimgdata] = useState(null);
	const [showModal1, setShowModal1] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const { id } = props.item;
	const uri = props.item.uri;
	useEffect(() => {
		if (uri) {
			const getdata = async () => {
				const cid = uri.substring(7);
				const metadataResponse = await fetch(`https://ipfs.io/ipfs/${cid}`);
				let response = await metadataResponse.json();
				setmydata(response);
				const image = response.image;
				const cid1 = image.substring(7);
				let imgd = await fetch(`https://ipfs.io/ipfs/${cid1}`);
				let dimg = await imgd.text();
				setimgdata(dimg);
			};

			getdata();
		}
	}, [uri]);

	const onsubmithandler = () => {
		setShowModal1(true);
	};
	const onsubmithandler2 = () => {
		setShowModal(true);
	};

	return (
		<>
			<div className="single__nft__card">
				<div className="nft__img">
					<img
						src={
							imagedata
								? `http://localhost:5000/${imagedata}`
								: props.item.imgUrl
						}
						alt="A nft"
						className="w-100"
					/>
				</div>

				<div className="nft__content">
					<h5 className="nft__title">
						<Link to={`/market/${id}`}>
							{mydata.name ? mydata.name : props.item.title}
						</Link>
					</h5>

					<div className="creator__info-wrapper d-flex gap-3">
						<div className="creator__img">
							<img src={Logo} alt="" className="w-100" />
						</div>

						<div className="creator__info w-100 d-flex align-items-center justify-content-between">
							<div>
								<h6>Created By</h6>
								<p>
									{mydata.description ? mydata.description : props.item.creator}
								</p>
							</div>

							<div>
								<h6>{props.Owned ? "Price" : "Current Bid"}</h6>
								<p>
									{props.Owned
										? props.item.price
											? props.item.price
											: mydata.price
										: props.item.min_bid}{" "}
									ETH
								</p>
							</div>
						</div>
					</div>

					<div className=" mt-3 d-flex align-items-center justify-content-between">
						<button
							className="bid__btn d-flex align-items-center gap-1"
							onClick={props.Owned ? onsubmithandler : onsubmithandler2}
						>
							<i className="ri-shopping-bag-line"></i>{" "}
							{props.Owned ? "Sell" : "Bid"}
						</button>
						{showModal1 && <Modal1 setShowModal={setShowModal1} uri={uri} price={mydata.price} />}
						{showModal && <Modal setShowModal={setShowModal} uri={uri} />}
					</div>
				</div>
			</div>
		</>
	);
};

export default NftCard;
