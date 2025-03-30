 

 
function* fetchData() {
  yield new Promise((resolve) => setTimeout(() => resolve('Data 1'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Data 2'), 1000));
  yield new Promise((resolve) => setTimeout(() => resolve('Data 3'), 1000));
}

 
async function asyncFetcher(generator) {
  const gen = generator();
  for (let promise of gen) {
    print(await promise);
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    } else {
      return `Property "${prop}" does not exist`;
    }
  },
};

 
const dataObject = new Proxy({ name: 'John Doe', age: 30 }, handler);

 
async function process() {
  print('Fetching Data...');
  await asyncFetcher(fetchData);
  
  print('Accessing object properties through Proxy:');
  print('Name:', dataObject.name);
  print('Age:', dataObject.age);
  print('Non-Existent Property:', dataObject.address);
}

 
process().then(() => print('Process Complete'));
