class Quantum {
  constructor(state) {
    this.state = state;
  }

  superposition(otherState) {
    return new Proxy(this, {
      get: (target, prop) => {
        if (prop === 'state') {
          return `Superposed(${target.state}, ${otherState})`;
        }
        return Reflect.get(target, prop);
      }
    });
  }

  measure() {
    return Math.random() > 0.5 ? this.state : `Not ${this.state}`;
  }
}

const quantumSystem = new Quantum('Alive')
  .superposition('Dead');

const observer = new WeakMap();
observer.set(quantumSystem, 'Observer1');

const measureState = async (system) => {
  print(`Measurement by ${observer.get(system)}`);
  for await (const state of [system.measure(), system.measure(), system.measure()]) {
    print(`Measured: ${state}`);
  }
};

(async () => {
  print(`Quantum State: ${quantumSystem.state}`);
  await measureState(quantumSystem);
})();
