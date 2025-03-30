class FibonacciSequence {
  constructor(limit) {
    this.limit = limit;
    this.sequence = [];
  }

   
  *generate() {
    let [a, b] = [0, 1];
    for (let i = 0; i < this.limit; i++) {
      [a, b] = [b, a + b];
      yield a;
    }
  }

   
  calculate() {
    const gen = this.generate();
    for (let num of gen) {
      this.sequence.push(num);
    }
  }

   
  async doubleValues() {
    const doubled = this.sequence.map(async (num) => {
      const result = await new Promise((resolve) => {
        setTimeout(() => resolve(num * 2), 100);
      });
      return result;
    });
    this.sequence = await Promise.all(doubled);
  }

   
  logSequence() {
    print(this.sequence.join(', '));
  }
}

 
(async function executeFibonacciSequence() {
  const fibSequence = new FibonacciSequence(10);
  fibSequence.calculate();
  await fibSequence.doubleValues();
  fibSequence.logSequence();
})();
