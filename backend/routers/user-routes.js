const express = require("express");
const userscontrollers = require("../Controllers/user-controllers");
const router = express.Router();

router.get("/:uid", userscontrollers.getuserbyid);
router.post("/connect", userscontrollers.connect);
router.patch("/:uid/updateuser", userscontrollers.updateuser);

module.exports = router;
