const express = require("express");
const router = express.Router();
const nodeController = require("../controller/nodeController");

/**
 * 节点信息查询接口
 */
router.get("/info", nodeController.getNodeInfo);

module.exports = router;
