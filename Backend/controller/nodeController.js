const db = require("../config/db");

exports.getNodeInfo = (req, res) => {
    const seachNodeInfoSql = "SELECT id, name, type, x, y, adjList FROM node1";

    db.query(seachNodeInfoSql, (err, result) => {
        if (err) return res.send({ code: 1, message: err.message });

        let newResult = result.map((item) => {
            let newItem = {};
            newItem.id = item.id;
            newItem.name = item.name;
            newItem.type = item.type;
            newItem.x = item.x;
            newItem.y = item.y;
            newItem.neighbors = [];

            let adjList = JSON.parse(item.adjList);
            for (const key in adjList) {
                newItem.neighbors.push(key);
            }

            return newItem;
        });

        return res.send({ code: 0, message: "success", data: newResult });
    });
};
