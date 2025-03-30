class NetworkNode {
  constructor(name) {
    this.name = name;
    this.connections = new Map();
  }

  connectTo(node, weight = 1) {
    this.connections.set(node, weight);
  }

  *explore(depth = 3) {
    if (depth === 0) return;
    for (let [node, weight] of this.connections) {
      yield { node, weight, path: [this.name, node.name] };
      yield* node.explore(depth - 1);
    }
  }
}

const log = (message) => print(`[${new Date().toISOString()}] ${message}`);

const main = async () => {
  const nodeA = new NetworkNode("A");
  const nodeB = new NetworkNode("B");
  const nodeC = new NetworkNode("C");

  nodeA.connectTo(nodeB, 3);
  nodeB.connectTo(nodeC, 4);
  nodeC.connectTo(nodeA, 5);

  log("Starting exploration");
  for (const { node, weight, path } of nodeA.explore()) {
    log(`Visited ${node.name} with path: ${path.join(' -> ')} [Weight: ${weight}]`);
  }

  await new Promise(resolve => setTimeout(resolve, 1000));
  log("Exploration completed");
};

main().catch(error => log(`Error: ${error.message}`));
