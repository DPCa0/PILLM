class NetworkNode {
  #connections = new Set();

  constructor(name) {
    this.name = name;
  }

  connect(node) {
    if (node instanceof NetworkNode) {
      this.#connections.add(node);
      node.#connections.add(this);
    }
  }

  disconnect(node) {
    if (this.#connections.has(node)) {
      this.#connections.delete(node);
      node.#connections.delete(this);
    }
  }

  async broadcast(message, visited = new Set()) {
    if (visited.has(this)) return;
    visited.add(this);
    print(`${this.name} received: ${message}`);

    const promises = [...this.#connections].map((node) =>
      new Promise((resolve) =>
        setTimeout(() => {
          node.broadcast(message, visited);
          resolve();
        }, Math.random() * 1000)
      )
    );

    await Promise.all(promises);
  }
}

 
(async () => {
  const nodeA = new NetworkNode("Node A");
  const nodeB = new NetworkNode("Node B");
  const nodeC = new NetworkNode("Node C");
  const nodeD = new NetworkNode("Node D");

  nodeA.connect(nodeB);
  nodeB.connect(nodeC);
  nodeC.connect(nodeD);
  nodeA.connect(nodeD);

  await nodeA.broadcast("Hello, Network!");
})();
