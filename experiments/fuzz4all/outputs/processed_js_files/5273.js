 
class QuantumComputer {
  #qubits;

  constructor(size) {
    this.#qubits = Array(size).fill(0).map(() => Math.random() >= 0.5 ? 1 : 0);
  }

  #superPosition() {
    return this.#qubits.map(q => q ? '|' + (Math.random() < 0.5 ? '0' : '1') + '⟩' : '|0⟩');
  }

  entangle() {
     
    const [head, ...tail] = this.#qubits;
    this.#qubits = [head, ...tail.map(q => q ^ head)];
  }

   
  static fromQubits(qubits) {
    const qc = new QuantumComputer(qubits.length);
    qc.#qubits = qubits;
    return qc;
  }

  measure() {
    return this.#qubits.reduce((acc, q) => (acc << 1) | q, 0);
  }

  observe() {
     
    const formatQubit = (strings, ...values) => values.map(q => `|${q}⟩`).join('');
    print(`Qubit states: ${formatQubit(...this.#superPosition())}`);
  }
}

 
const qc = new QuantumComputer(5);
qc.observe();
qc.entangle();
qc.observe();
print(`Measurement: ${qc.measure()}`);

const predefinedQC = QuantumComputer.fromQubits([1, 0, 1, 1, 0]);
predefinedQC.observe();
print(`Predefined Measurement: ${predefinedQC.measure()}`);
