import React, { useContext,useState } from "react";
import "./modal.css";
import { AuthContext } from "../../../AuthContext";
const Modal = ({ setShowModal, uri, currbid, minimumbid }) => {
	const [yourbid, setyourbid] = useState(0);
	const [yourname,setyourname] = useState()
	const addresscontext = useContext(AuthContext)
	const onbidhandler = async () => {
		try {
			let id = uri.substring(7);
			console.log(id);
			let id1 = id.slice(0, -14);
			await fetch(`http://localhost:5000/nft/${id1}/updatebid`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					uri: uri,
					curr_bid: yourbid,
					curr_bidder: addresscontext.address,
					bidder_name: yourname
				}),
			});
			setShowModal(false);
		} catch (err) {
			console.log(err);
		}
	};

	
	const bidhandler = (event) => {
		let value = event.target.value;
		setyourbid(value);
	};
	const changenamehandler = (event)=>{
		let value = event.target.value
		setyourname(value)
	}
	return (
		<div className="modal__wrapper">
			<div className="single__modal">
				<span className="close__modal">
					<i className="ri-close-line" onClick={() => setShowModal(false)}></i>
				</span>
				<h6 className="text-center text-light">Place a Bid</h6>
				<p className="text-center text-light">
					You must bid at least{" "}
					<span className="money">{currbid + minimumbid}</span>
				</p>

				<div className="input__item mb-4">
					<input
						type="number"
						placeholder="00 : 00 ETH"
						min={0.01}
						step={0.01}
						value={yourbid}
						onChange={bidhandler}
					/>
				</div>

				<div className=" d-flex align-items-center justify-content-between">
					<p>You must bid at least</p>
					<span className="money">{minimumbid} ETH</span>
				</div>

				<div className=" d-flex align-items-center justify-content-between">
					<p>Service Fee</p>
					<span className="money">0.01 ETH</span>
				</div>

				<div className=" d-flex align-items-center justify-content-between">
					<p>Curr Bid</p>
					<span className="money">{currbid} ETH</span>
				</div>
				<div className="input__item mb-4">
					<input
						type="text"
						placeholder="name of bidder"
						value={yourname}
						onChange={changenamehandler}
					/>
				</div>
				<button className="place__bid-btn" onClick={onbidhandler}>
					Place a Bid
				</button>
			</div>
		</div>
	);
};

export default Modal;
