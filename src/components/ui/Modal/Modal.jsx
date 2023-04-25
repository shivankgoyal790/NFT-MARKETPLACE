import React, { useState } from "react";
import useNFTMarket from "../../../nft-market";
import "./modal.css";

const Modal = ({ setShowModal,uri,currbid,minimumbid }) => {
  const [isloading, setisloading] = useState(false);
  const [yourbid,setyourbid] = useState(0)
  const { buyNFT } = useNFTMarket();
  const onbidhandler = async () => {
    try{
      let id = uri.substring(7);
			console.log(id);
			let id1 = id.slice(0, -14);
      await fetch(`http://localhost:5000/nft/${id1}/updatebid`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ uri: uri ,curr_bid : yourbid,curr_bidder : 'shivank'}),
			});
    }
    catch(err){
      console.log(err)
    }
		// try {
		// 	setisloading(true);
		// 	await buyNFT(uri, mydata.price);
		// 	setisloading(false);
		// } catch (e) {
		// 	setisloading(false);
		// 	console.log(e);
		// }

	};
  const bidhandler = (event) =>{
    let value= event.target.value
    setyourbid(value)
  }

	return (
		<div className="modal__wrapper">
      <div className="single__modal">
        <span className="close__modal">
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">Place a Bid</h6>
        <p className="text-center text-light">
          You must bid at least <span className="money">{currbid + minimumbid}</span>
        </p>

        <div className="input__item mb-4">
          <input type="number" placeholder="00 : 00 ETH" min={0.01} step={0.01} value={yourbid} onChange={bidhandler} />
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
          <p>Total Bid Amount</p>
          <span className="money">{currbid + minimumbid} ETH</span>
        </div>

        <button className="place__bid-btn" onClick={onbidhandler}>Place a Bid</button>
      </div>
    </div>
	);
};

export default Modal;
