 

 
function fetchData(delay, data) {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

 
function* dataGenerator() {
  print('Fetching User...');
  yield fetchData(1000, { id: 1, name: 'Alice' });
  print('Fetching Posts...');
  yield fetchData(1000, [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]);
  print('Fetching Comments...');
  yield fetchData(1000, [{ id: 1, text: 'Nice!' }, { id: 2, text: 'Awesome!' }]);
}

 
async function processData(generator) {
  const iterator = generator();

  while (true) {
    const { value, done } = iterator.next();
    if (done) break;
    print('Data:', await value);
  }
}

 
const handler = {
  get(target, prop) {
    print(`Getting property '${prop}'`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Setting property '${prop}' to '${value}'`);
    return Reflect.set(target, prop, value);
  }
};

const user = new Proxy({ id: 1, name: 'Alice' }, handler);

 
user.name = 'Bob';
print('User Name:', user.name);

 
processData(dataGenerator).catch(console.error);
