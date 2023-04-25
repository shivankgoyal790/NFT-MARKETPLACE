import React, { useState } from "react";
import useNFTMarket from "../../../nft-market";
import "./modal.css";
import Spinner from "../../spinner/Spinner";

const Modal1 = ({ setShowModal, uri,price}) => {
	const [isloading, setisloading] = useState(false);
	const [enddate, setenddate] = useState("");
	const [minbid, setminbid] = useState(0.01);
	const { listNFT } = useNFTMarket();
	const datechangehandler = (event) => {
		let myvalue = event.target.value;
		setenddate(myvalue);
	};
    const changebidhandler = (event)=>{
        let value = event.target.value
        setminbid(value)
    }
	const putonauctionhandler = async () => {
		try {
			setisloading(true);
			await listNFT(uri,price,enddate,minbid);
			setisloading(false);
		} catch (e) {
			setisloading(false);
			console.log(e);
		}
	};
	return (
        <>
        {isloading && <Spinner/>}
		<div className="modal__wrapper">
			<div className="single__modal">
				<span className="close__modal">
					<i class="ri-close-line" onClick={() => setShowModal(false)}></i>
				</span>
				<h6 className="text-center text-light">List On Auction</h6>
				<p className="text-center text-light">
					Specify the minimum starting bid
				</p>

				<div className="input__item mb-4">
					<input
						type="number"
						placeholder="00 : 00 ETH"
						min={0.01}
						value={minbid}
						onChange={changebidhandler}
					/>
				</div>
				<div className=" d-flex align-items-center gap-4">
					<div className="form__input w-50">
						<label htmlFor="">Expiration Date</label>
						<input type="date" value={enddate} onChange={datechangehandler} />
					</div>
				</div>
				<div className=" d-flex align-items-center justify-content-between">
					<p>Your minimum bid at least</p>
					<span className="money">0.01 ETH</span>
				</div>

				<div className=" d-flex align-items-center justify-content-between">
					<p>Service Fee</p>
					<span className="money">0.01 ETH</span>
				</div>

				<button className="place__bid-btn w-50" onClick={putonauctionhandler}>
					Put On Auction
				</button>
			</div>
		</div>
        </>
	);
};

export default Modal1;
