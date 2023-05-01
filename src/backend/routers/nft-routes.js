const express = require("express");
const fileUpload = require("../api/nft-storage");
const nftcontrollers = require("../controllers/nft-controllers");
const router = express.Router();

router.get("/market", nftcontrollers.getallnft);
router.get("/:pid/item", nftcontrollers.getnftbyid);
router.get("/:uid/useritems", nftcontrollers.getnftbyuserid);
router.post("/store",nftcontrollers.savenft);
router.post("/sell", fileUpload.single("image"), nftcontrollers.createitem);
router.post("/:tid/transfer", nftcontrollers.updatenft);
router.patch("/:tid/buy",nftcontrollers.buynft);
router.post("/:tid/updatebid",nftcontrollers.updatebid)

module.exports = router;
