class Observable {
  constructor() {
    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(data) {
    this.listeners.forEach(listener => listener(data));
  }
}

class Computed {
  constructor(fn, deps) {
    this.fn = fn;
    this.deps = deps;
    this.value = this.compute();
    this.deps.forEach(dep => dep.subscribe(this.update.bind(this)));
  }

  compute() {
    return this.fn(...this.deps.map(dep => dep.value));
  }

  update() {
    const newValue = this.compute();
    if (newValue !== this.value) {
      this.value = newValue;
      this.notify(this.value);
    }
  }

  notify(data) {
    this.listeners.forEach(listener => listener(data));
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

 
const observableA = new Observable();
const observableB = new Observable();

 
const computedSum = new Computed(
  (a, b) => a + b,
  [observableA, observableB]
);

 
computedSum.subscribe(newValue => {
  print(`Sum has changed: ${newValue}`);
});

 
observableA.notify(5);
observableB.notify(10);
observableA.notify(20);
