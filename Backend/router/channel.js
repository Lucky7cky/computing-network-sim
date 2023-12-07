const express = require("express");
const router = express.Router();
const channelController = require("../controller/channelController");

/**
 * 通道CT预分配接口
 */
router.post("/ct", channelController.channelCTController);

/**
 * 通道CX路径时延计算接口
 */
router.post("/cx", channelController.channelCXController);

module.exports = router;
