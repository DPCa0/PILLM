class AsyncMath {
  #value;

  constructor(value = 0) {
    this.#value = value;
  }

  async #delayOperation(operation, operand, ms) {
    return new Promise(resolve => setTimeout(() => {
      this.#value = operation(this.#value, operand);
      resolve(this.#value);
    }, ms));
  }

  async addAsync(operand, ms = 1000) {
    return await this.#delayOperation((a, b) => a + b, operand, ms);
  }

  async subtractAsync(operand, ms = 1000) {
    return await this.#delayOperation((a, b) => a - b, operand, ms);
  }

  async multiplyAsync(operand, ms = 1000) {
    return await this.#delayOperation((a, b) => a * b, operand, ms);
  }

  async divideAsync(operand, ms = 1000) {
    if (operand === 0) throw new Error("Division by zero");
    return await this.#delayOperation((a, b) => a / b, operand, ms);
  }

  static async *numberStream() {
    let i = 1;
    while (i <= 5) {
      yield i++;
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  toJSON() {
    return JSON.stringify({ value: this.#value });
  }

  get value() {
    return this.#value;
  }
}

(async () => {
  try {
    const math = new AsyncMath(10);
    print(`Initial Value: ${math.value}`);

    await math.addAsync(5);
    print(`After Addition: ${math.value}`);

    await math.multiplyAsync(2);
    print(`After Multiplication: ${math.value}`);

    print(`JSON Representation: ${math.toJSON()}`);

    print('Streaming Numbers:');
    for await (let num of AsyncMath.numberStream()) {
      print(num);
    }
  } catch (error) {
    console.error(error);
  }
})();
