 
class Complex {
  #privateValue;

  constructor(value) {
    this.#privateValue = value;
  }

  #privateMethod() {
    return this.#privateValue ** 2;
  }

  get squaredValue() {
    return this.#privateMethod();
  }

  static async complexOperation(numbers) {
    const results = await Promise.all(numbers.map(async (num) => {
       
      await new Promise(resolve => setTimeout(resolve, Math.random() * 100));
      return num * num;
    }));

    return results.reduce((sum, current) => sum + current, 0);
  }
}

 
(async () => {
  const instance = new Complex(5);
  print("Squared value of the private field:", instance.squaredValue);

  const numbers = [1, 2, 3, 4, 5];
  const sumOfSquares = await Complex.complexOperation(numbers);
  print("Sum of squares:", sumOfSquares);
})();
