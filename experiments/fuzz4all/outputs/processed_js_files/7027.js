 

 
async function* fetchData(ids) {
  for (const id of ids) {
    yield new Promise((resolve) => setTimeout(() => resolve(`Data for ID: ${id}`), 1000));
  }
}

 
async function processData(ids) {
  const results = [];
  for await (const data of fetchData(ids)) {
    results.push(data);
  }
  return results;
}

 
const handler = {
  get: function (target, prop, receiver) {
    print(`Accessing property "${prop}"`);
    return Reflect.get(...arguments);
  },
};

const obj = new Proxy({ a: 1, b: 2 }, handler);

 
async function main() {
  print('Starting data processing...');
  const ids = [1, 2, 3, 4, 5];
  const data = await processData(ids);
  print('Processed Data:', data);

  print('Accessing object properties through Proxy:');
  print(obj.a);
  print(obj.b);
}

 
main();
