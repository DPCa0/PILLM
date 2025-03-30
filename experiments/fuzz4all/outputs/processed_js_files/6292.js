class ComplexSystem {
  #privateData = new WeakMap();

  constructor(name) {
    this.name = name;
    this.init();
  }

  async init() {
    try {
      const data = await this.fetchData();
      this.#privateData.set(this, data);
      this.render();
    } catch (error) {
      console.error("Initialization error:", error);
    }
  }

  async fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve({ value: Math.random() * 100 }) : reject("Failed to fetch data");
      }, 1000);
    });
  }

  render() {
    const data = this.#privateData.get(this);
    print(`Hello, ${this.name}! Your data is: ${JSON.stringify(data)}`);
  }

  static *fibonacciSequence(limit) {
    let [prev, current] = [0, 1];
    while (current < limit) {
      yield current;
      [prev, current] = [current, prev + current];
    }
  }

  async *asyncSequence() {
    let num = 0;
    while (num < 5) {
      await new Promise(resolve => setTimeout(resolve, 500));
      yield num++;
    }
  }
}

const system = new ComplexSystem("Advanced JavaScript");

(async () => {
  print("Fibonacci Sequence:");
  for (const number of ComplexSystem.fibonacciSequence(20)) {
    print(number);
  }

  print("Async Sequence:");
  for await (const number of system.asyncSequence()) {
    print(number);
  }
})();
