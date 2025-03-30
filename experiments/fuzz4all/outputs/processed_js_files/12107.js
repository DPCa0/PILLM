class QuantumBit {
  constructor(state = [1, 0]) {
     
    this.state = state;
    this.normalize();
  }

   
  normalize() {
    const norm = Math.sqrt(this.state.reduce((sum, x) => sum + x * x, 0));
    this.state = this.state.map(x => x / norm);
  }

   
  hadamard() {
    const H = [
      [1 / Math.sqrt(2), 1 / Math.sqrt(2)],
      [1 / Math.sqrt(2), -1 / Math.sqrt(2)]
    ];
    const [a, b] = this.state;
    this.state = [
      H[0][0] * a + H[0][1] * b,
      H[1][0] * a + H[1][1] * b
    ];
    this.normalize();
  }

   
  measure() {
    const [a, b] = this.state;
    const probabilities = [a * a, b * b];
    return Math.random() < probabilities[0] ? 0 : 1;
  }

  toString() {
    return `|ψ⟩ = ${this.state.map(x => x.toFixed(2)).join(' | ')}⟩`;
  }
}

const simulate = async (iterations) => {
  let qbit = new QuantumBit();
  let count = { '0': 0, '1': 0 };
  
  for (let i = 0; i < iterations; i++) {
    qbit.hadamard();
    const result = qbit.measure();
    count[result]++;
    await new Promise(resolve => setTimeout(resolve, 100));  
  }
  
  print(`After ${iterations} iterations:`, count);
};

simulate(100).then(() => print('Simulation complete.'));
