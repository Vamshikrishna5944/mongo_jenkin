const express = require("express");
const { getAllUser, signUp, signIn } = require("../controllers/user-controller.js");

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;