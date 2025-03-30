 
const processNumbers = ({ op = 'add', ...numbers }) => {
  const values = Object.values(numbers);
  
  const operations = {
    add: () => values.reduce((acc, val) => acc + val, 0),
    multiply: () => values.reduce((acc, val) => acc * val, 1),
    average: () => values.reduce((acc, val) => acc + val, 0) / values.length
  };

  return operations[op]();
};

 
const logger = {
  get(target, prop) {
    print(`Accessed property "${prop}"`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Set property "${prop}" to "${value}"`);
    return Reflect.set(target, prop, value);
  }
};

const data = new Proxy({ a: 1, b: 2, c: 3 }, logger);

 
print('Add:', processNumbers({ op: 'add', ...data }));
print('Multiply:', processNumbers({ op: 'multiply', ...data }));
print('Average:', processNumbers({ op: 'average', ...data }));

 
data.a = 10;

 
const fetchData = (url) => new Promise((resolve) =>
  setTimeout(() => resolve(`Data from ${url}`), Math.random() * 1000)
);

(async () => {
  const urls = ['url1', 'url2', 'url3'];
  const results = await Promise.all(urls.map(fetchData));
  print(results);
})();

 
function* numberGenerator() {
  for (let i = 0; i < 5; i++) {
    yield i;
  }
}

for (const num of numberGenerator()) {
  print(num);
}
