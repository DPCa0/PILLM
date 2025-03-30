 
class ComplexFeature {
  #privateValue;

  constructor(initialValue) {
    this.#privateValue = initialValue;
    this.data = new Proxy(
      { count: 0 },
      {
        get: (target, prop) => {
          if (prop === 'count') {
            print(`Accessing count: ${target[prop]}`);
          }
          return target[prop];
        },
        set: (target, prop, value) => {
          if (prop === 'count') {
            print(`Setting count from ${target[prop]} to ${value}`);
            this.#privateValue += value;
          }
          target[prop] = value;
          return true;
        },
      }
    );
  }

  #logPrivateValue() {
    print(`Private Value is now: ${this.#privateValue}`);
  }

  complexOperation() {
    let operations = [
      async () => {
        print('Starting async operation');
        return new Promise((resolve) => setTimeout(resolve, 1000));
      },
      () => {
        print('Sync operation in array');
        return 42;
      },
      function* () {
        print('Generator yielding 100');
        yield 100;
      },
    ];

    return async () => {
      for (let operation of operations) {
        if (typeof operation === 'function') {
          const result = await operation();
          if (result) print(`Result: ${result}`);
        } else {
          for (let value of operation()) {
            print(`Generator value: ${value}`);
          }
        }
      }
      this.#logPrivateValue();
    };
  }
}

 
const complex = new ComplexFeature(10);

 
complex.data.count = 5;  
print(complex.data.count);  
complex.complexOperation()().then(() => print('Operations Completed.'));
