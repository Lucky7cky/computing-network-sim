const db = require("../config/db");

exports.getLinkInfo = (req, res) => {
    const seachLinkInfoSql = "SELECT name, adjList FROM node1";

    db.query(seachLinkInfoSql, (err, result) => {
        if (err) return res.send({ code: 1, message: err.message });

        let linkInfo = [];

        result.map((item) => {
            let adjList = JSON.parse(item.adjList);
            for (const key in adjList) {
                let newItem = {};
                newItem.linkName = item.name + "---" + key;
                newItem.linkDelay = adjList[key].delay;
                newItem.linkOccupy = adjList[key].PHYs;
                linkInfo.push(newItem);
            }

            return true;
        });

        return res.send({ code: 0, message: "success", data: linkInfo });
    });
};
