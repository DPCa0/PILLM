class NetworkNode {
    constructor(id) {
        this.id = id;
        this.connections = new Set();
    }

    connect(node) {
        this.connections.add(node);
        node.connections.add(this);
    }

    broadcast(message, visited = new Set()) {
        if (visited.has(this)) return;
        visited.add(this);
        print(`Node ${this.id} received: ${message}`);
        this.connections.forEach(node => node.broadcast(message, visited));
    }
}

function* nodeGenerator(num) {
    let index = 0;
    while (index < num) {
        yield new NetworkNode(index++);
    }
}

(async () => {
    const numNodes = 5;
    const nodes = Array.from(nodeGenerator(numNodes));

     
    nodes[0].connect(nodes[1]);
    nodes[1].connect(nodes[2]);
    nodes[1].connect(nodes[3]);
    nodes[3].connect(nodes[4]);

     
    const messageBroadcast = new Promise(resolve => {
        setTimeout(() => {
            nodes[0].broadcast('Hello, network!');
            resolve();
        }, 1000);
    });

    await messageBroadcast;

    print('Message broadcast completed.');
})();
