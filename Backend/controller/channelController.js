const db = require("../config/db");

exports.channelCTController = (req, res) => {
    const { startNode, endNode, latencyTolerance, bandwidth, isEstablish, holdingTime } = req.body;
    if (!startNode || !endNode) {
        return res.send({ code: 1, message: "startNode or endNode is null" });
    }
    if (!isEstablish) isEstablish = false;
    if (!holdingTime) holdingTime = 600;
    if (!latencyTolerance) latencyTolerance = Infinity;
    if (!bandwidth) bandwidth = 0;

    const seachNodeInfoSql = "SELECT name, adjList FROM node1";
    let graph = {};
    graph.adjList = new Map();
    graph.vertices = [];

    db.query(seachNodeInfoSql, (err, result) => {
        if (err) return res.send({ code: 1, message: err.message });

        result.map((item) => {
            let adjList = JSON.parse(item.adjList);
            graph.vertices.push(item.name);
            graph.adjList.set(item.name, new Map());

            for (const key in adjList) {
                graph.adjList.get(item.name).set(key, adjList[key]);
            }
        });

        const Colors = {
            WHITE: 0,
            GREY: 1,
            BLACK: 2,
        };
        const initializeColor = (vertices) => {
            const color = {};
            for (let i = 0; i < vertices.length; i++) {
                color[vertices[i]] = Colors.WHITE;
            }
            return color;
        };

        function BFS(startNode) {
            const adjList = graph.adjList;
            const vertices = graph.vertices;
            const color = initializeColor(vertices);
            const queue = [];
            const delay = {}; //v到u的时延delay[u]
            const hopCount = {};
            const predecessors = {}; //前溯点

            queue.push(startNode);

            //初始化delay, predecessors
            for (const vertice of vertices) {
                delay[vertice] = 0;
                hopCount[vertice] = 0;
                predecessors[vertice] = null;
            }

            while (queue.length) {
                const u = queue.shift();
                const neighbors = adjList.get(u);
                color[u] = Colors.GREY;

                for (const [neighbor, val] of neighbors) {
                    if (color[neighbor] == Colors.WHITE) {
                        color[neighbor] = Colors.GREY;

                        delay[neighbor] = delay[u] + val.delay;
                        hopCount[neighbor] = hopCount[u] + 1;
                        predecessors[neighbor] = u;

                        queue.push(neighbor);
                    }
                }

                color[u] = Colors.BLACK;
            }

            return {
                delay,
                predecessors,
                hopCount,
            };
        }

        function minPathFn(startNode, endNode) {
            const shortestPathS = BFS(startNode); //{delay, pred, hopCount}
            const fromVertex = startNode;
            const toVertex = endNode;
            const path = [];

            for (let v = toVertex; v != fromVertex; v = shortestPathS.predecessors[v]) {
                path.push(v);
            } //路径不可达?

            path.push(fromVertex);

            let s = path.pop();
            while (path.length) {
                s += " -- " + path.pop();
            }

            let delay = shortestPathS.delay[endNode];
            let hopCount = shortestPathS.hopCount[endNode];

            return {
                path: s,
                delay: delay,
                hopCount: hopCount,
            };
        }

        function deleteEdge(nodeM, nodeN) {
            const MAdjList = graph.adjList.get(nodeM);
            const NAdjList = graph.adjList.get(nodeN);

            MAdjList.get(nodeN).delay = Infinity;
            NAdjList.get(nodeM).delay = Infinity;

            return 2;
        }

        function orderAllocate(nodeM, nodeN, slotIndex) {
            let Calendar = graph.adjList.get(nodeM).get(nodeN).PHYs;
            let Bf = bandwidth;
            let allocate = new Map();
            allocate.set("PHY0", []);
            allocate.set("PHY1", []);
            allocate.set("PHY2", []);
            allocate.set("PHY3", []);

            for (let i = 0; i < Calendar.length; i++) {
                for (let j = 0; j < Calendar[0].length; j++) {
                    if (Calendar[i][j] != 5) {
                        //判断是否是10M小颗粒
                        if (Bf == 0.01) {
                            //是10M小颗粒，那么不能通过普通的时隙分片，需要进行帧结构设计
                            Calendar[i][j] += 0.2; //增加帧结构开销

                            //判断小颗粒帧结构是否超出原有5G时隙，或者将不能用于下一个小颗粒时隙的插入
                            if (Calendar[i][j] > 4.99) {
                                //小颗粒帧结构不满足要求，不能划分10M小颗粒
                                Calendar[i][j] -= 0.2; //撤销帧结构开销
                                continue; //继续顺序分配，寻找下一个可分配可插入的时隙
                            }
                        }

                        const idleCapacity = 5 - Calendar[i][j];

                        if (Bf <= idleCapacity) {
                            Calendar[i][j] += Bf;

                            for (const [key, value] of graph.adjList) {
                                JSON.stringify(value);
                                const addSlotSql = `update node1 set adjList = '${JSON.stringify(
                                    mapToObj(value)
                                )}' where name = '${key}'`;
                                db.query(addSlotSql, (err, result) => {
                                    if (err) return res.send({ code: 1, message: err.message });
                                });
                            }

                            allocate.get(`PHY${i}`).push(`${j}`);
                            slotIndex[`${nodeM} -- ${nodeN}`] = allocate;
                            return 0;
                        }

                        Bf -= idleCapacity;
                        Calendar[i][j] = 5;

                        allocate.get(`PHY${i}`).push(`${j}`);
                    }
                }
            }

            return 1;
        }

        function allocateFlow(startNode, endNode, latencyTolerance, bandwidth, slotIndex) {
            const minPath = minPathFn(startNode, endNode); //{path，delay, hopCount}
            const minPath_delay = minPath.delay;
            const flow_delay = latencyTolerance;

            if (minPath_delay > flow_delay) {
                console.log(`流通道分配失败`);
                return false;
            } //标志信号?

            const pathNodes = minPath.path.split(" -- "); //path存在问题

            for (let i = 1; i < pathNodes.length; i++) {
                const nodeM = pathNodes[i - 1];
                const nodeN = pathNodes[i];

                const edgeMN = graph.adjList.get(nodeM).get(nodeN);

                let beforeCapacity = 0; //原有

                let Calendar = edgeMN.PHYs;

                for (let i = 0; i < Calendar.length; i++) {
                    for (let j = 0; j < Calendar[0].length; j++) {
                        beforeCapacity += Calendar[i][j];
                    }
                }

                const Bf = bandwidth;

                let afterCapacity = beforeCapacity + Bf;

                if (afterCapacity > 400) {
                    deleteEdge(graph, nodeM, nodeN); //流分配完成后恢复图原始拓扑?
                    return allocateFlow(slice, flow, graph);
                }

                if (isEstablish) orderAllocate(nodeM, nodeN, slotIndex);
            }

            //obj += minPath.hopCount * flow.bandwidth;

            function mixMapToObj(mixMap) {
                for (const key in mixMap) {
                    let map = mixMap[key];
                    let obj = {};
                    for (let [key, value] of map) {
                        obj[key] = value;
                    }
                    mixMap[key] = obj;
                }
                return mixMap;
            }

            let ans = {
                path: minPath.path,
                slotIndex: mixMapToObj(slotIndex),
                pathLatency: minPath.delay,
                isEstablish: isEstablish,
                holdingTime: holdingTime,
                startTime: new Date().getTime(),
            };

            return res.send({ code: 0, message: "success", data: ans });
        }

        function mapToObj(map) {
            let obj = {};
            for (let [key, value] of map) {
                obj[key] = value;
            }
            return obj;
        }

        let slotIndex = {};
        allocateFlow(startNode, endNode, latencyTolerance, bandwidth, slotIndex);
    });
};

exports.channelCXController = (req, res) => {
    const { startNode } = req.body;
    if (!startNode) {
        return res.send({ code: 1, message: "startNode is null" });
    }

    const seachNodeInfoSql = "SELECT name, adjList FROM node1";
    let graph = {};
    graph.adjList = new Map();
    graph.vertices = [];

    db.query(seachNodeInfoSql, (err, result) => {
        if (err) return res.send({ code: 1, message: err.message });

        result.map((item) => {
            let adjList = JSON.parse(item.adjList);
            graph.vertices.push(item.name);
            graph.adjList.set(item.name, new Map());

            for (const key in adjList) {
                graph.adjList.get(item.name).set(key, adjList[key]);
            }
        });

        function dijkstra(graph, start, end) {
            const top = 0;
            const parent = (i) => ((i + 1) >> 1) - 1;
            const left = (i) => (i << 1) + 1;
            const right = (i) => (i + 1) << 1;

            class PriorityQueue {
                constructor(comparator = (a, b) => a > b) {
                    this._heap = [];
                    this._comparator = comparator;
                }

                size() {
                    return this._heap.length;
                }

                isEmpty() {
                    return this.size() == 0;
                }

                peek() {
                    return this._heap[top];
                }

                enqueue(...values) {
                    values.forEach((value) => {
                        this._heap.push(value);
                        this._siftUp();
                    });
                    return this.size();
                }

                dequeue() {
                    const poppedValue = this.peek();
                    const bottom = this.size() - 1;
                    if (bottom > top) this._swap(top, bottom);
                    this._heap.pop();
                    this._siftDown;
                    return poppedValue;
                }

                replace(value) {
                    const replacedValue = this.peek();
                    this._heap[top] = value;
                    this._siftDown();
                    return replacedValue;
                }

                _greater(i, j) {
                    return this._comparator(this._heap[i], this._heap[j]);
                }

                _swap(i, j) {
                    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
                }

                _siftUp() {
                    let node = this.size() - 1;
                    while (node > top && this._greater(node, parent(node))) {
                        this._swap(node, parent(node));
                        node = parent(node);
                    }
                }

                _siftDown() {
                    let node = top;
                    while (
                        (left(node) < this.size() && this._greater(left(node), node)) ||
                        (right(node) < this.size() && this._greater(right(node), node))
                    ) {
                        let maxChild =
                            right(node) < this.size() && this._greater(right(node), left(node))
                                ? right(node)
                                : left(node);
                        this._swap(node, maxChild);
                        node = maxChild;
                    }
                }
            }

            const vertices = graph.vertices;
            const adjList = graph.adjList;
            const distances = new Map();
            const predecessors = new Map();
            const queue = new PriorityQueue();
            for (let i = 0; i < vertices.length; i++) {
                distances.set(vertices[i], Infinity);
                predecessors.set(vertices[i], null);
            }

            distances.set(start, 0);
            queue.enqueue(start, 0);
            while (!queue.isEmpty()) {
                let u = queue.dequeue();

                let neighbors = adjList.get(u);
                if (!neighbors) continue;
                for (let [neighbor, val] of neighbors) {
                    if (distances.get(neighbor) > distances.get(u) + val.delay) {
                        distances.set(neighbor, distances.get(u) + val.delay);
                        predecessors.set(neighbor, u);
                        queue.enqueue(neighbor, distances.get(neighbor));
                    }
                }
            }
            let path = [];
            let u = end;
            while (u !== null) {
                path.push(u);
                u = predecessors.get(u);
            }
            return path.reverse();
        }

        function averagePath(startNode) {
            let sum = 0,
                base = graph.vertices.length,
                transmission_cost = 0;

            for (let node of graph.vertices) {
                let pathn = dijkstra(graph, startNode, node);
                for (let i = 0; i < pathn.length - 1; i++) {
                    sum += graph.adjList.get(pathn[i]).get(pathn[i + 1]).delay;
                }
            }

            transmission_cost = sum / base;

            let ans = {
                pathLatency: transmission_cost,
            };

            return res.send({ code: 0, message: "success", data: ans });
        }

        averagePath(startNode);
    });
};
