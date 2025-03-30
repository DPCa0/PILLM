 

const asyncOperation = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('Async operation complete!'), 1000);
  });
};

const fetchData = async () => {
  const data = await asyncOperation();
  return `Fetched: ${data}`;
};

const generatorFunction = function* () {
  yield 'Starting generator...';
  yield fetchData();
  yield 'Generator is about to complete!';
};

const targetObject = {
  data: 'Initial Data'
};

const handler = {
  get: (obj, prop) => {
    if (prop in obj) {
      print(`Accessing property: ${prop}`);
      return obj[prop];
    }
    return `Property ${prop} does not exist`;
  },
  set: (obj, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(targetObject, handler);

proxy.data = 'Updated Data';
print(proxy.data);

const uniqueSymbol = Symbol('unique');

const complexObject = {
  [uniqueSymbol]: 'Secret Data',
  printSecret: function() {
    return this[uniqueSymbol];
  }
};

print(complexObject.printSecret());

const runGenerator = async (genFunc) => {
  const gen = genFunc();
  for (let val of gen) {
    if (val instanceof Promise) {
      val = await val;
    }
    print(val);
  }
};

runGenerator(generatorFunction);
