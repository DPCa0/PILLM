class AdvancedFeatureDemo {
  #privateField = 'Private Data';

  constructor() {
    this.regularField = 'Regular Data';
  }

   
  get info() {
    return `Info: ${this.#privateField} & ${this.regularField}`;
  }

  set info(value) {
    const [privatePart, regularPart] = value.split(' & ');
    this.#privateField = privatePart;
    this.regularField = regularPart;
  }

  static async *asyncGenerator(limit) {
    let i = 0;
    while (i < limit) {
      yield new Promise((resolve) => setTimeout(() => resolve(i++), 1000));
    }
  }

  *[Symbol.iterator]() {
    yield* [this.#privateField, this.regularField];
  }
}

 
function logger(target, name, descriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args) {
    print(`Calling ${name} with`, args);
    return original.apply(this, args);
  };
  return descriptor;
}

class Decorated {
  @logger
  static someMethod(value) {
    return `Processed: ${value}`;
  }
}

(async () => {
  const demo = new AdvancedFeatureDemo();
  demo.info = 'New Private Data & New Regular Data';
  
   
  const [first, ...rest] = [...demo];
  print('Destructured:', first, rest);

   
  for await (const number of AdvancedFeatureDemo.asyncGenerator(3)) {
    print('Async Generated:', number);
  }

   
  const uniqueValues = new Set([1, 2, 2, 3, 4]);
  print('Unique Values:', Array.from(uniqueValues));

   
  Reflect.set(demo, 'regularField', 'Updated Regular Data');
  print('Reflected Update:', demo.info);

   
  print(Decorated.someMethod('Test Data'));
})();
