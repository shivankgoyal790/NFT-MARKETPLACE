import { Contract } from "ethers";
import { useContext } from "react";
import NFT_MARKET from "../backend/artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { BigNumber } from "ethers";
import { ethers } from "ethers";
const useNFTMarket = () => {  
const signer = useContext(AuthContext);
  const NFT_MARKET_ADDRESS = "0x8Fc8877F65e9e861FD0A6e09FEf245762e359Eb5";
  const nftMarket = new Contract(NFT_MARKET_ADDRESS, NFT_MARKET.abi, signer.signer);
  const navigate = useNavigate();
  const createNFT = async (Newvalue) => {
    try {
        const formdata = new FormData();
        formdata.append("name", Newvalue.name);
        formdata.append("description", Newvalue.description);
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
            const savenft = await fetch("http://localhost:5000/nft/store",{
                method : "POST",
                headers : {'Content-Type': 'application/json'},
                body : JSON.stringify({
                    uri : url,
                    from : transaction.from,
                    to : transaction.to,
                    
                })
            })
            console.log(savenft);
            if(savenft.status === 201){
                console.log("stored");
            }
        }
        navigate("/owned");
    } catch (e) {
        console.log(e);
        console.log("try again");
    }
  };

  const listNFT = async (tokenID  ,price) => {
    console.log(tokenID)
    try{
        price = BigNumber.from(price).mul(BigNumber.from(10).pow(18))
        tokenID = ethers.utils.id(tokenID)
    const transaction = await nftMarket.listNFT( tokenID ,price.toString()
    );  
    await transaction.wait();
    let id = tokenID.substring(7);  
    console.log(id);
    let id1 = id.slice(0,-14);
    console.log(id1);
    await fetch(`http://localhost:5000/nft/${id1}/transfer`,{
		method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body : JSON.stringify({uri : tokenID})
	});}    
    catch(err){
        console.log(err);
        console.log("list err");
    }
  };

  const cancelListing = async (tokenID) => {
    const transaction = await nftMarket.cancelListing(
      tokenID
    );
    await transaction.wait();
  };

  const buyNFT = async (tokenID , price) => {
    try{
    const transaction = await nftMarket.buyNFT('11', {
      value: price*100000000000000,
    });
    await transaction.wait();
    let id = tokenID.substring(7);  
    console.log(id);
    let id1 = id.slice(0,-14);
    console.log(id1);
    await fetch(`http://localhost:5000/nft/${id1}/buy`,{
		method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body : JSON.stringify({userid : signer.address})
	});}    
    catch(err){
        console.log(err);
        console.log("list err");
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