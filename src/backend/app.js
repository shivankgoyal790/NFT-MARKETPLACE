const express = require("express");
const mongoose = require("mongoose");
const nftroutes = require("./routers/nft-routes");
const userroutes = require("./routers/user-routes");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin,X-Requested-With,Content-Type,Accept,Authorization"
	);
	res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
	next();
});

app.use("/users", userroutes);
app.use("/nft", nftroutes);

mongoose
	.connect(
		"mongodb+srv://shivank:shivank@cluster0.e3ldd.mongodb.net/NFTmarketplace?retryWrites=true&w=majority"
	)
	.then(() => {
		app.listen(5000, () => {
			console.log(`Server listening on 5000`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
