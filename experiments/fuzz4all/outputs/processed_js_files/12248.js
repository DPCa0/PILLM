 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    print(`Fetched Data: ${JSON.stringify(data)}`);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

 
const handler = {
  get: (target, prop) => {
    print(`Accessed property: ${prop}`);
    return Reflect.get(target, prop);
  },
  set: (target, prop, value) => {
    print(`Setting property: ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const obj = new Proxy({ name: 'Advanced JS' }, handler);

 
obj.name;
obj.name = 'JavaScript Pro';

 
function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
    [prev, curr] = [curr, prev + curr];
    yield curr;
  }
}

 
const fibGen = fibonacci();
print([...Array(5)].map(() => fibGen.next().value));

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const executeWithDelay = async () => {
  print('Waiting for 2 seconds...');
  await delay(2000);
  print('Done waiting!');
};

 
fetchData('https://api.example.com/data');
executeWithDelay();
