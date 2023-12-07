const express = require("express");
const router = express.Router();
const linkController = require("../controller/linkController");

/**
 * 链路信息查询接口
 */
router.get("/info", linkController.getLinkInfo);

module.exports = router;
