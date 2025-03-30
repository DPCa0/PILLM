 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

 
const privateData = Symbol('privateData');

 
class Advanced {
  #privateVar = 'I am private';

  constructor(value) {
    this[privateData] = value;
  }

  get privateVar() {
    return this.#privateVar;
  }

  set privateVar(value) {
    if (typeof value === 'string') {
      this.#privateVar = value;
    } else {
      throw new CustomError("Value must be a string");
    }
  }

  async processData(callback) {
    await delay(1000);
    callback(this[privateData]);
  }

  static async demo() {
    try {
      const instance = new Advanced('Hello, ES6+');
      instance.privateVar = 'Updated private value';
      print(instance.privateVar);

      await instance.processData(data => {
        print(`Processed Data: ${data}`);
      });
    } catch (error) {
      console.error(error);
    }
  }
}

 
(async () => {
  print("Starting demo...");
  await Advanced.demo();
  print("Demo complete.");
})();
