 

 
function* numberGenerator() {
  let number = 0;
  while (true) {
    yield number++;
  }
}

 
const uniqueProp = Symbol("unique");

 
const handler = {
  get: (target, property, receiver) => {
    print(`Accessed property: ${String(property)}`);
    return Reflect.get(target, property, receiver);
  },
};

 
class AsyncComplex {
  constructor() {
    this[uniqueProp] = "Unique Value";
    this.proxy = new Proxy(this, handler);
  }

  async fetchNumber() {
    const response = await new Promise((resolve) =>
      setTimeout(() => resolve("42"), 1000)
    );
    return response;
  }

  async *asyncGenerator() {
    yield "Start";
    yield* numberGenerator();
  }

  async demonstrate() {
    print(`Symbol Property: ${this.proxy[uniqueProp]}`);
    print(`Fetched Number: ${await this.fetchNumber()}`);
    const asyncGen = this.asyncGenerator();
    print(`Generator Value: ${await asyncGen.next().value}`);
    print(`Generator Value: ${await asyncGen.next().value}`);
  }
}

 
const complexInstance = new AsyncComplex();
complexInstance.demonstrate();
