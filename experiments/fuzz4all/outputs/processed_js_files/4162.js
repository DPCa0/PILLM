class NeuralNetwork {
  #weights;
  constructor(layers) {
    this.#weights = layers.slice(1).map((size, i) => 
      Array.from({ length: size }, () => 
        Array.from({ length: layers[i] + 1 }, () => Math.random() - 0.5)
      )
    );
  }

  static sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }

  static sigmoidDerivative(y) {
    return y * (1 - y);
  }

  forward(input) {
    return this.#weights.reduce((activations, weight) => {
      const inputsWithBias = [...activations, 1];  
      return weight.map((node) => 
        NeuralNetwork.sigmoid(
          node.reduce((sum, weight, i) => sum + weight * inputsWithBias[i], 0)
        )
      );
    }, input);
  }

  train(data, labels, iterations, learningRate) {
    for (let iter = 0; iter < iterations; iter++) {
      data.forEach((input, idx) => {
        const activations = [input];
        this.#weights.forEach(weight => {
          const inputsWithBias = [...activations[activations.length - 1], 1];
          const newActivation = weight.map(node => 
            NeuralNetwork.sigmoid(
              node.reduce((sum, w, i) => sum + w * inputsWithBias[i], 0)
            )
          );
          activations.push(newActivation);
        });

        let deltas = activations.map((activation, layer) => {
          if (layer === activations.length - 1) {
            return activation.map((out, neuron) => 
              (labels[idx][neuron] - out) * NeuralNetwork.sigmoidDerivative(out)
            );
          } else {
            const nextLayerWeights = this.#weights[layer];
            return activation.map((_, neuron) =>
              deltas[layer + 1].reduce((sum, delta, j) =>
                sum + delta * nextLayerWeights[j][neuron], 0) * 
                NeuralNetwork.sigmoidDerivative(activation[neuron])
            );
          }
        });

        this.#weights.forEach((weight, layer) => {
          const inputsWithBias = [...activations[layer], 1];
          deltas[layer + 1].forEach((delta, j) => {
            inputsWithBias