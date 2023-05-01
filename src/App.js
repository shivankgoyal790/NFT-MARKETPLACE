import "./app.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Web3Provider } from "@ethersproject/providers";
import Routers from "../src/routes/Routers";
import Footer from "../src/components/Footer/Footer";
import Header from "../src/components/Header/Header";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";

function App() {
	const [signer, setSigner] = useState(null);
	const [loading, setLoading] = useState(false);
	const [address, setAddress] = useState(null);
	useEffect(() => {
		const web3modal = new Web3Modal();
		if (web3modal.cachedProvider) connectWallet();
		window.ethereum.on("accountsChanged", connectWallet);
	}, []);
	
	const connectWallet = async () => {
		setLoading(true);
		try {
			const web3modal = new Web3Modal({ cacheProvider: true });
			const instance = await web3modal.connect();
			const provider = new Web3Provider(instance);
			const signer = provider.getSigner();	
			const address = await signer.getAddress();
			setSigner(signer);
			setAddress(address);
			console.log(address);
			console.log(signer);
		} catch (e) {
			console.log(e);
		}
		setLoading(false);
	};
	return (
		<AuthContext.Provider
			value={{
				signer: signer,
				address: address,
				loading: loading,
				connectWallet: connectWallet,
			}}
		>
			<Router>
				<Header />
				<Routers />
				<Footer />
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
