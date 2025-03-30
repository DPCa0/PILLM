class QuantumSimulator {
    constructor() {
        this.qbits = new Array(2).fill([1, 0]);
        this.gates = {
            H: (qbit) => [
                (qbit[0] + qbit[1]) / Math.sqrt(2),
                (qbit[0] - qbit[1]) / Math.sqrt(2)
            ],
            X: (qbit) => [qbit[1], qbit[0]]
        };
    }

    applyGate(qbitIndex, gate) {
        if (this.gates[gate]) {
            this.qbits[qbitIndex] = this.gates[gate](this.qbits[qbitIndex]);
        }
    }

    measure() {
        return this.qbits.map(qbit => Math.random() < Math.pow(qbit[0], 2) ? 0 : 1);
    }

    async simulate() {
        await Promise.all(this.qbits.map((_, i) => 
            new Promise(resolve => {
                setTimeout(() => {
                    this.applyGate(i, 'H');
                    resolve();
                }, Math.random() * 1000);
            })
        ));
        return this.measure();
    }
}

(async () => {
    const simulator = new QuantumSimulator();
    print("Starting Quantum Simulation...");
    const result = await simulator.simulate();
    print("Measurement result:", result);
})();
