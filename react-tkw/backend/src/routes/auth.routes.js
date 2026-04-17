const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const { usernameValidation, mailValidation, passwordValidation } = require("../middlewares/user.middleware");

const router = express.Router();

router.post(
    "/register",
    [usernameValidation, mailValidation, passwordValidation],
    register
);

router.post("/login", login);

module.exports = router;
