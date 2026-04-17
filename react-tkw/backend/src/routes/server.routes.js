const express = require("express");
const { createServer, getMyServers } = require("../controllers/server.controller");
const { authUserControl } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/create-server", authUserControl, createServer);

router.get("/my-servers", authUserControl, getMyServers);

module.exports = router;