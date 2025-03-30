class DataProcessor {
  constructor(data) {
    this.data = data;
  }

   
  *processData() {
    for (let item of this.data) {
      yield this.enhanceItem(item);
    }
  }

   
  async enhanceItem(item) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...item, enhanced: true });
      }, 100);
    });
  }

   
  static createLoggerProxy(obj) {
    return new Proxy(obj, {
      get(target, prop) {
        print(`Getting ${prop}`);
        return target[prop];
      },
      set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
      },
    });
  }
}

 
const processData = async (input, processor = new DataProcessor(input)) => {
  const proxyProcessor = DataProcessor.createLoggerProxy(processor);
  const result = [];
  for await (let enhancedItem of proxyProcessor.processData()) {
    result.push(enhancedItem);
  }
  return result;
};

 
function sql(strings, ...values) {
  return strings.reduce((prev, curr, i) => `${prev}${curr}${values[i] || ''}`, '');
}

const query = sql`SELECT * FROM users WHERE id = ${42}`;

 
const inputData = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
processData(inputData).then((processed) => {
  print('Processed Data:', processed);
  print('Query:', query);
});
