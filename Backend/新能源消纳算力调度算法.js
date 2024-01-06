// Mock Data

let tasks = [
    {
        task_id: 'task_1',
        priority: 5,
        resource_demand: 10,
        energy_demand: 50,
        current_location: 'dc_2',
        target_location: 'dc_1',
        transmission_cost: 12,
    },
    {
        task_id: 'task_2',
        priority: null,
        resource_demand: 15,
        energy_demand: 30,
        current_location: 'dc_2',
        target_location: null,
        transmission_cost: null,
    },
];

let dcs = [
    {
        dc_id: 'dc_1',
        energy_capacity: {
            renewable_energy: 80,
            conventional_energy: 200,
        },
        resource_capacity: 120,
    },
    {
        dc_id: 'dc_2',
        energy_capacity: {
            renewable_energy: 40,
            conventional_energy: 150,
        },
        resource_capacity: 90,
    },
    {
        dc_id: 'dc_3',
        energy_capacity: {
            renewable_energy: 90,
            conventional_energy: 180,
        },
        resource_capacity: 130,
    },
    {
        dc_id: 'dc_4',
        energy_capacity: {
            renewable_energy: 50,
            conventional_energy: 140,
        },
        resource_capacity: 80,
    },
    {
        dc_id: 'dc_5',
        energy_capacity: {
            renewable_energy: 60,
            conventional_energy: 120,
        },
        resource_capacity: 50,
    },
    {
        dc_id: 'dc_6',
        energy_capacity: {
            renewable_energy: 40,
            conventional_energy: 60,
        },
        resource_capacity: 130,
    },
];

// 算力网络拓扑

class Graph {
    constructor(isDirected = false) {
        //接收一个参数表示图是否有向，默认无向
        this.isDirected = isDirected;
        this.vertices = []; //顶点名字目录
        this.adjList = new Map(); //邻接表
    }
    addVertex(u) {
        if (!this.vertices.includes(u)) {
            this.vertices.push(u);
            this.adjList.set(u, new Map());
        }
    }
    addEdge(u, v, w) {
        if (!this.adjList.get(u)) {
            this.addVertex(u);
        }
        if (!this.adjList.get(v)) {
            this.addVertex(v);
        }

        const uAdjList = this.adjList.get(u);
        uAdjList.set(v, {
            delay: w,
            PHYs: Array.from({ length: 4 }, () => new Array(20).fill(0)),
        });

        if (!this.isDirected) {
            const uAdjList = this.adjList.get(v);
            uAdjList.set(u, {
                delay: w,
                PHYs: Array.from({ length: 4 }, () => new Array(20).fill(0)),
            });
        }
    }
    getVertices() {
        return this.vertices;
    }
    getAdjList() {
        return this.adjList;
    }
    toString() {
        let s = '';
        for (let i = 0; i < this.vertices.length; i++) {
            s += `${this.vertices[i]} 的邻居节点及时延是 `;
            const neighbors = this.adjList.get(this.vertices[i]);
            for (const [neighbor, val] of neighbors) {
                s += `${neighbor}: ${val.delay},  `;
            }
            s += '\n';
        }
        return s;
    }
}
const graph = new Graph();
const myVertices = ['dc_1', 'dc_2', 'dc_3', 'dc_4', 'dc_5', 'dc_6'];

for (let i = 0; i < myVertices.length; i++) {
    graph.addVertex(myVertices[i]);
}
graph.addEdge('dc_1', 'dc_2', 12);
graph.addEdge('dc_1', 'dc_3', 8);
graph.addEdge('dc_2', 'dc_3', 3);
graph.addEdge('dc_2', 'dc_4', 3);
graph.addEdge('dc_2', 'dc_5', 5);
graph.addEdge('dc_3', 'dc_4', 15);
graph.addEdge('dc_3', 'dc_5', 8);
graph.addEdge('dc_4', 'dc_5', 5);
graph.addEdge('dc_4', 'dc_6', 9);
graph.addEdge('dc_5', 'dc_6', 8);
// console.log(graph.toString());

energy_consumption(tasks, dcs);
console.log(tasks, '\n\uD83D\uDE80\n', dcs);

// 新能源消纳算力调度算法
function energy_consumption(tasks, dcs) {
    // 1. 根据任务的优先级进行排序，优先级高的任务先执行
    let sorted_tasks = sort_tasks(tasks);

    for (let task of sorted_tasks) {
        if (task.target_location) continue;

        let available_dcs = [];
        // 2. 根据任务的能量需求和资源需求，筛选出满足条件的DC
        for (let dc of dcs) {
            if (
                dc.energy_capacity.renewable_energy +
                    dc.energy_capacity.conventional_energy >=
                    task.energy_demand &&
                dc.resource_capacity >= task.resource_demand
            ) {
                available_dcs.push(dc);
            }
        }

        let chosen_dc = sort_dcs_by_renewable_energy(available_dcs)[0];
        task.target_location = chosen_dc.dc_id;
        task.transmission_cost = calculate_transmission_cost(task, graph);
        task.priority = calculate_priority(task);
        energy_consumption(tasks, dcs);
    }
}

// 网络迁移调度算法
function network_migration_scheduling(tasks, dcs) {
    // 1. 网络调度

    // 2. 状态更新（算力 + 网络）
    for (let task of tasks) {
        if (
            dcs[task.target_location].energy_capacity.renewable_energy >=
            task.energy_demand
        ) {
            dcs[task.target_location].energy_capacity.renewable_energy -=
                task.energy_demand;
        } else {
            dcs[task.target_location].energy_capacity.conventional_energy -=
                task.energy_demand -
                dcs[task.target_location].energy_capacity.renewable_energy;
            dcs[task.target_location].energy_capacity.renewable_energy = 0;
        }
        dcs[task.target_location].resource_capacity -= task.resource_demand;
    }
}

// 排序算法
function sort_tasks(tasks) {
    for (let task of tasks) {
        if (!task.priority) {
            task.priority = calculate_priority(task);
        }
    }
    return tasks.sort((a, b) => b.priority - a.priority);
}

function sort_dcs_by_renewable_energy(dcs) {
    return dcs.sort(
        (a, b) =>
            b.energy_capacity.renewable_energy -
            a.energy_capacity.renewable_energy
    );
}

function calculate_priority(task) {
    const [a, b, c] = [1, 1, 1]; //权重因子
    if (!task.transmission_cost) {
        task.transmission_cost = calculate_transmission_cost(task, graph);
    }
    return (
        (a * task.resource_demand + b * task.energy_demand) /
        (c * task.transmission_cost)
    );
}

function calculate_transmission_cost(task, graph) {
    let transmission_cost = 0;

    if (!task.target_location) {
        let sum = 0,
            base = graph.vertices.length;
        for (let node of graph.vertices) {
            let pathn = dijkstra(graph, task.current_location, node);
            for (let i = 0; i < pathn.length - 1; i++) {
                sum += graph.adjList.get(pathn[i]).get(pathn[i + 1]).delay;
            }
        }
        transmission_cost = sum / base;
        return transmission_cost;
    }

    let path = dijkstra(graph, task.current_location, task.target_location);
    path.unshift(task.current_location);
    for (let i = 0; i < path.length - 1; i++) {
        transmission_cost += graph.adjList.get(path[i]).get(path[i + 1]).delay;
    }
    return transmission_cost;
}

function dijkstra(graph, start, end) {
    const top = 0;
    const parent = i => ((i + 1) >> 1) - 1;
    const left = i => (i << 1) + 1;
    const right = i => (i + 1) << 1;

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
            values.forEach(value => {
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
                    right(node) < this.size() &&
                    this._greater(right(node), left(node))
                        ? right(node)
                        : left(node);
                this._swap(node, maxChild);
                node = maxChild;
            }
        }
    }

    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
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
        let u = queue.dequeue().element;
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
