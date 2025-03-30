 
class AsyncProcessor {
  constructor(data) {
    this.data = data;
  }
  
  async *process() {
    for (const item of this.data) {
       
      const result = await new Promise((resolve) => 
        setTimeout(() => resolve(item * 2), 100)
      );
      yield result;
    }
  }

  async execute() {
    for await (const processed of this.process()) {
      print('Processed:', processed);
    }
  }
}

 
const handler = {
  get(target, prop) {
    print(`Accessed property: ${prop}`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Set property: ${prop} with value: ${value}`);
    return Reflect.set(target, prop, value);
  }
};

 
const uniqueKey = Symbol('uniqueKey');

const dataContainer = new Proxy({
  numbers: [1, 2, 3, 4, 5],
  [uniqueKey]: 'This is a unique key'
}, handler);

 
const processor = new AsyncProcessor(dataContainer.numbers ?? [10, 20, 30]);
processor.execute();
print(dataContainer[uniqueKey] ?? 'No unique key found');
