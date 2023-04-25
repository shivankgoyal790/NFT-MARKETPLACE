import React from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Market from "../pages/Market";
import Create from "../pages/Create";
import Contact from "../pages/Contact";
import Owned from "../pages/owned"
import NftDetails from "../pages/NftDetails";
import Wallet from "../pages/Wallet";
const Routers = () => {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/home" />} />
			<Route path="/home" element={<Home />} />
			<Route path="/market" element={<Market />} />
			<Route path="/owned" element={<Owned />} />
			<Route path="/create" element={<Create />} />
			<Route path="/contact" element={<Contact />} />
			<Route path="/wallet" element={<Wallet />} />
			<Route path="/market/:id" element={<NftDetails />} />
		</Routes>
	);
};

export default Routers;
