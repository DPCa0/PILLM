 
const getUserCity = (user) => user?.address?.city ?? 'Unknown City';

 
const fetchData = async () => {
  const urls = [
    'https://api.example.com/user/1',
    'https://api.example.com/user/2',
    'https://api.example.com/user/3',
  ];

  const results = await Promise.allSettled(urls.map(url => fetch(url).then(res => res.json())));

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      print(`User ${index + 1} city: ${getUserCity(result.value)}`);
    } else {
      console.error(`Failed to fetch user ${index + 1}`);
    }
  });
};

 
const handler = {
  get(target, prop) {
    print(`Property '${prop}' has been accessed.`);
    return prop in target ? target[prop] : 'Property not found';
  },
  set(target, prop, value) {
    print(`Property '${prop}' has been set to '${value}'.`);
    target[prop] = value;
    return true;
  }
};

const reactiveObject = new Proxy({}, handler);

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield ++id;
  }
}

const gen = idGenerator();

print(`Generated IDs: ${gen.next().value}, ${gen.next().value}, ${gen.next().value}`);

 
function highlight(strings, ...values) {
  return strings.reduce((prev, current, i) => `${prev}<strong>${values[i - 1] ?? ''}</strong>${current}`);
}

const name = 'Alice';
const action = 'learning advanced JavaScript';
print(highlight`${name} is ${action}`);

 
fetchData();

 
reactiveObject.name = 'Bob';
print(reactiveObject.name);
print(reactiveObject.age);
