class NeuralNetwork {
    constructor(layers) {
        this.layers = layers;
        this.weights = [];
        this.biases = [];
        this.initializeWeightsAndBiases();
    }

    initializeWeightsAndBiases() {
        for (let i = 0; i < this.layers.length - 1; i++) {
            const inputSize = this.layers[i];
            const outputSize = this.layers[i + 1];
            this.weights.push(math.random([outputSize, inputSize], -1.0, 1.0));
            this.biases.push(math.random([outputSize, 1], -1.0, 1.0));
        }
    }

    forward(input) {
        return this.layers.reduce((prevOutput, layer, index) => {
            if (index === 0) return input;
            const weight = this.weights[index - 1];
            const bias = this.biases[index - 1];
            const z = math.add(math.multiply(weight, prevOutput), bias);
            return z.map(this.sigmoid);
        }, input);
    }

    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

(async () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const data = await fetchData(url);
    print('Fetched Data:', data);

    const nn = new NeuralNetwork([2, 3, 1]);
    const input = math.matrix([[0.5], [0.2]]);
    const output = nn.forward(input);
    print('Network Output:', output);
})();

const math = {
    random: (shape, min, max) => {
        return Array.from({ length: shape[0] }, () =>
            Array.from({ length: shape[1] }, () => Math.random() * (max - min) + min)
        );
    },
    multiply: (a, b) => {
        return a.map((row, i) => row.map((_, j) => row.reduce((sum, elm, k) => sum + elm * b[k][j], 0)));
    },
    add: (a, b) => {
        return a.map((row, i) => row.map((val, j) => val + b[i][j]));
    },
    matrix: (data) => data