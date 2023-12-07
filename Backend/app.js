const express = require("express");
const app = express();

/**
 * 解析post请求的body数据
 */
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * 跨域请求配置
 */
const cors = require("cors");
app.use(cors());

/**
 * 路由配置:
 * 1.通道路由
 * 2.链路路由
 * 3.节点路由
 */
const channelRouter = require("./router/channel");
app.use("/province/channel", channelRouter);

const linkRouter = require("./router/link");
app.use("/province/link", linkRouter);

const nodeRouter = require("./router/node");
app.use("/province/node", nodeRouter);

app.listen(5052, () => console.log("Server started at port : 5052"));
