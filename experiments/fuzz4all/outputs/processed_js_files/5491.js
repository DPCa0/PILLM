 

 
const uniqueID = Symbol('id');

 
const handler = {
  get: function(target, property) {
    print(`Property '${property.toString()}' accessed.`);
    return target[property];
  }
};

 
const complexObject = new Proxy({
  [uniqueID]: 12345,
  nested: {
    items: [1, 2, 3, 4, 5]
  },
  calculate: function(a, b) {
    return a + b;
  }
}, handler);

 
async function fetchData() {
  print('Fetching data...');
  const fakeAPI = new Promise(resolve => {
    setTimeout(() => {
      resolve('Data retrieved from fake API');
    }, 2000);
  });

  const data = await fakeAPI;
  print(data);
}

 
function* numberGenerator() {
  let num = 0;
  while (num < 5) {
    yield num++;
  }
}

 
const [first, ...rest] = complexObject.nested.items;

 
const logResult = (result) => print(`The result of the calculation is: ${result}`);

 
(async function main() {
  const gen = numberGenerator();
  for (let value of gen) {
    print(`Generated number: ${value}`);
  }

  await fetchData();

  const result = complexObject.calculate(first, rest[0]);
  logResult(result);

  print(`Unique ID: ${complexObject[uniqueID]}`);
})();
