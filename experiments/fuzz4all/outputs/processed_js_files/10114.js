 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

 
const handler = {
  get(target, prop, receiver) {
    print(`GET ${String(prop)}`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    print(`SET ${String(prop)}=${value}`);
    return Reflect.set(target, prop, value, receiver);
  },
};

const user = new Proxy({ name: 'Alice', age: 25 }, handler);

 
const person = { ...user, profession: 'Developer', location: { city: 'NY', country: 'USA' } };
const { name, location: { city }, ...otherDetails } = person;

 
const uniqueId = Symbol('id');

function* idGenerator(start = 0) {
  let id = start;
  while (true) {
    yield id++;
  }
}

const idGen = idGenerator();

 
function tag(strings, ...values) {
  return strings.reduce((acc, str, i) => `${acc}${str}<${values[i] ?? ''}>`, '');
}

const taggedString = tag`Hello, ${name}! You are from ${city}.`;

 
async function getMultipleData(urls) {
  try {
    const dataPromises = urls.map(url => fetchData(url));
    const data = await Promise.all(dataPromises);
    print('All data fetched:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
(async () => {
  user.name = 'Bob';
  print(`User Name: ${user.name}`);
  print(`Destructured city: ${city}, Other details:`, otherDetails);
  print(`Unique ID: ${idGen.next().value}`);
  print(taggedString);

  await getMultipleData(['https://api.github.com', 'https://jsonplaceholder.typicode.com/users']);
})();
