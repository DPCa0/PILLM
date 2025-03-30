 
const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

 
const logHandler = {
  get: (target, property) => {
    print(`Accessing property "${property}"`);
    return target[property];
  },
};

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield `id_${++id}`;
  }
}

const idGen = idGenerator();

 
const person = new Proxy({ name: 'Alice', age: 25 }, logHandler);

 
(async () => {
  const id = idGen.next().value;
  print(`Generated ID: ${id}`);
  
  print(`Person's name: ${person.name}`);
  
  try {
    const data = await fetchData('https: 
    print('Fetched data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
