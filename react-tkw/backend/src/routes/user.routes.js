const express = require("express");
const { getUsers, getUserById, getMe, updateUserImage, updateUser } = require("../controllers/user.controller");
const { authUserControl } = require("../middlewares/auth.middleware");
const {
    userImageControl,
    usernameValidation,
    mailValidation,
    passwordValidation,
    descriptionValidation,
} = require("../middlewares/user.middleware");

const router = express.Router();

router.get("/", getUsers);
router.get("/me", authUserControl, getMe);
router.get("/:id", getUserById);

router.put("/update-image", authUserControl, userImageControl, updateUserImage);
router.put(
    "/update",
    authUserControl,
    [usernameValidation, mailValidation, passwordValidation, descriptionValidation],
    updateUser
);

module.exports = router;
