class AdvancedFeatureDemo {
  constructor() {
    this.data = [1, 2, 3, 4, 5];
  }

  async processData() {
     
    const results = await Promise.all(
      this.data.map(async (num) => {
        return this.#complexCalculation(num);
      })
    );
    return results;
  }

  #complexCalculation(num) {
     
    const multiply = (factor) => (value) => value * factor;
    const add = (addend) => (value) => value + addend;
    const multiplyByTwo = multiply(2);
    const addThree = add(3);

    const transformed = addThree(multiplyByTwo(num));

     
    const bigIntTransform = BigInt(transformed)?.toString();
    return bigIntTransform;
  }
}

 
(async () => {
  const demo = new AdvancedFeatureDemo();
  const [first, second, ...rest] = await demo.processData();
  print(`First: ${first}, Second: ${second}, Rest: ${rest}`);

  for await (const result of rest) {
    print(`Processing result: ${result}`);
  }
})();
