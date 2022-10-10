const express = require("express");
const nftcontrollers = require("../controllers/nft-controllers");
const router = express.Router();

router.get("/", nftcontrollers.getallnft);
router.get("/:pid/item", nftcontrollers.getnftbyid);
router.get("/:uid/useritems", nftcontrollers.getnftbyuserid);
router.post("/sell", nftcontrollers.createitem);
router.patch("/:pid/edititem", nftcontrollers.updatenft);

module.exports = router;
