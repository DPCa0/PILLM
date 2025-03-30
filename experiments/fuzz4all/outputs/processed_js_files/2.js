class NeuralNode {
    constructor(value = 0) {
        this.value = value;
        this.connections = new Map();
    }
    connect(node, weight = 1) {
        this.connections.set(node, weight);
    }
    propagate() {
        this.connections.forEach((weight, node) => {
            node.value += this.value * weight;
        });
    }
}

const createNetwork = (layers) => {
    const network = [];
    for (let i = 0; i < layers.length; i++) {
        const layer = Array(layers[i]).fill().map(() => new NeuralNode());
        network.push(layer);
        if (i > 0) {
            network[i - 1].forEach(prevNode => {
                layer.forEach(node => prevNode.connect(node, Math.random()));
            });
        }
    }
    return network;
};

const runNetwork = (network, input) => {
    network[0].forEach((node, i) => node.value = input[i]);
    for (let i = 0; i < network.length - 1; i++) {
        network[i].forEach(node => node.propagate());
    }
    return network[network.length - 1].map(node => node.value);
};

const network = createNetwork([2, 3, 1]);
const output = runNetwork(network, [1, 0]);
print('Output:', output);
