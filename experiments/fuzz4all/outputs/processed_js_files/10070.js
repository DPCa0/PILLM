 

 
class ComplexCalculator {
  #logHistory = [];

  constructor(initialValue = 0) {
    this.value = initialValue;
  }

   
  add(...numbers) {
    numbers.forEach((num) => this.#addOperation(num));
    return this;
  }

  multiply(...numbers) {
    numbers.forEach((num) => this.#multiplyOperation(num));
    return this;
  }

  async fetchAndSubtract(url) {
    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      this.subtract(jsonData.value);
      return this;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

   
  #addOperation(number) {
    this.#log(`Adding ${number}`);
    this.value += number;
  }

  #multiplyOperation(number) {
    this.#log(`Multiplying by ${number}`);
    this.value *= number;
  }

  subtract(number) {
    this.#log(`Subtracting ${number}`);
    this.value -= number;
    return this;
  }

   
  #log(message) {
    this.#logHistory.push(message);
    console.debug(message);
  }

  printHistory() {
    print("Operation History:", this.#logHistory.join(", "));
  }

  printValue() {
    print(`Current Value: ${this.value}`);
  }
}

 
const config = { initialValue: 10, url: "https://api.example.com/value" };
const { initialValue, url } = config;

 
const calculator = new ComplexCalculator(initialValue);
calculator.add(5, 3).multiply(2).subtract(4).printValue();
calculator.fetchAndSubtract(url).then(() => calculator.printValue());
calculator.printHistory();

 
const asyncOperations = [
  calculator.fetchAndSubtract(url),
  new Promise((resolve) => setTimeout(() => resolve("Done"), 1000)),
];

Promise.all(asyncOperations).then(([calcResult, otherResult]) => {
  print(otherResult);
  calculator.printValue();
  calculator.printHistory();
});
