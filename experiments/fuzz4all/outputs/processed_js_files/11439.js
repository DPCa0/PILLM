 

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
async function* fetchData() {
  const data = ['apple', 'banana', 'cherry'];
  for (let i = 0; i < data.length; i++) {
    await delay(1000);
    yield data[i];
  }
}

 
const handler = {
  get: function(target, property, receiver) {
    print(`Getting property: ${property}`);
    return Reflect.get(target, property, receiver);
  }
};

 
const target = {
  greeting: 'Hello, world!',
  number: 42
};

 
const proxy = new Proxy(target, handler);

 
print(proxy.greeting);
print(proxy.number);

 
async function main() {
  print('Starting data fetch...');
  const gen = fetchData();
  
  for await (const fruit of gen) {
    print(`Fetched: ${fruit}`);
  }
  
  print('Data fetch complete.');
}

 
main();
