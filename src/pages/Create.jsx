import React, { useCallback,useState } from "react";
import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCard";
import img from "../assets/images/img-01.jpg";
import avatar from "../assets/images/ava-01.png";
import "../styles/create-item.css";
import Imageupload from "../components/imageupload/Imageupload";
import Spinner from "../components/spinner/Spinner";
import useNFTMarket from "../nft-market";
const item = {
	id: "01",
	title: "Guard",
	desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
	imgUrl: img,
	creator: "Shivank Goyal",
	creatorImg: avatar,
	currentBid: 7.89,
};

const Create = () => {
	
	const { createNFT } = useNFTMarket();
	const [Newvalue, setnewvlue] = useState({
		name: "",
		price: "",
		description: "",
		image: undefined,
	});
	const [loading, setisloading] = useState(false);
	const inputimagehandler = useCallback((value) => {
		setnewvlue((prev) => {
			return {
				name: prev.name,
				description: prev.description,
				image: value,
				price: prev.price,
			};
		});
	}, []);

	const changehandler = (event) => {
		const value = event.target.value;
		const name = event.target.name;
		if (name === "name") {
			setnewvlue((prev) => {
				return {
					name: value,
					price: prev.price,
					description: prev.description,
					image: prev.image,
				};
			});
		}
		if (name === "price") {
			setnewvlue((prev) => {
				return {
					name: prev.name,
					price: value,
					description: prev.description,
					image: prev.image,
				};
			});
		}

		if (name === "description") {
			setnewvlue((prev) => {
				return {
					name: prev.name,
					price: prev.price,
					description: value,
					image: prev.image,
				};
			});
		}
	};
	const Additemhandler = async (event) => {
		event.preventDefault();
		
		try{
			setisloading(true);
		await createNFT(Newvalue);
		setisloading(false);
		}
		catch(err){
			setisloading(false);
			console.log(err);
			console.log("try again");
		}
	};
	return (
		<>
			<CommonSection title="Create Item" />
			{loading && (
				<div
					className="position-absolute top-25"
					style={{
						zIndex: "99",
						left: "50%",
						position: "absolute",
						top: "50%",
					}}
				>
					<Spinner />
				</div>
			)}
			<section>
				<Container>
					<Row>
						<Col lg="3" md="4" sm="6">
							<h5 className="mb-4 text-light">Preview Example</h5>
							<NftCard item={item} />
						</Col>

						<Col lg="9" md="8" sm="6">
							<div className="create__item">
								<form>
									<div className="form__input">
										<Imageupload
											id="image"
											name="image"
											oninput={inputimagehandler}
										/>
									</div>

									<div className="form__input">
										<label htmlFor="">Price</label>
										<input
											name="price"
											value={Newvalue.price}
											onChange={changehandler}
											type="number"
											placeholder="Enter price for one item (ETH)"
										/>
									</div>

									<div className="form__input">
										<label htmlFor="">Minimum Bid</label>
										<input type="text" placeholder="Enter minimum bid" />
									</div>


									<div className="form__input">
										<label htmlFor="">Title</label>
										<input
											type="text"
											onChange={changehandler}
											name="name"
											value={Newvalue.name}
											placeholder="Enter title"
										/>
									</div>

									<div className="form__input">
										<label htmlFor="">Description</label>
										<textarea
											name="description"
											value={Newvalue.description}
											onChange={changehandler}
											id=""
											rows="7"
											placeholder="Enter description"
											className="w-100"
										></textarea>
									</div>
									<div>
										<button
											type="submit"
											className="btn btn-primary"
											onClick={Additemhandler}
										>
											Create NFT
										</button>
									</div>
								</form>
							</div>
						</Col>
					</Row>
				</Container>
			</section>
		</>
	);
};

export default Create;
