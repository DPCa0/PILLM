 
class Node {
  #value;
  #neighbors = new Set();

  constructor(value) {
    this.#value = value;
  }

  addNeighbor(node) {
    if (node instanceof Node) {
      this.#neighbors.add(node);
    }
  }

   
  *getNeighbors() {
    for (const neighbor of this.#neighbors) {
      yield neighbor;
    }
  }

  get value() {
    return this.#value;
  }
}

 
async function buildGraph() {
  const nodes = [new Node(1), new Node(2), new Node(3)];
  nodes[0].addNeighbor(nodes[1]);
  nodes[1].addNeighbor(nodes[2]);

   
  const fetchNodeData = (node) =>
    new Promise((resolve) =>
      setTimeout(() => resolve(`Data for node ${node.value}`), 1000)
    );

  const nodeData = await Promise.all(nodes.map(fetchNodeData));

  nodeData.forEach((data, index) => {
    print(`Fetched: ${data}`);
  });

  return nodes;
}

 
(async () => {
  const graph = await buildGraph();
  const [firstNode] = graph;

  print('First node value:', firstNode.value);
  print('Neighbors of the first node:');
  for (const neighbor of firstNode.getNeighbors()) {
    print('- Node value:', neighbor.value);
  }
})();
