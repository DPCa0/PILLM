const data = [
  { id: 1, name: 'Alice', age: 28 },
  { id: 2, name: 'Bob', age: 34 },
  { id: 3, name: 'Charlie', age: 23 }
];

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Getting ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const proxyData = new Proxy(data, handler);

 
const processData = data => {
  return data.map(({ name, ...rest }) => ({
    name: name.toUpperCase(),
    ...rest
  }));
};

 
function* idGenerator(start = 0) {
  let id = start;
  while (true) yield id++;
}

const idGen = idGenerator();

 
(async () => {
  print('Original data:', proxyData);

  const newData = processData(proxyData);
  print('Processed data:', newData);

  print('Generated ID:', idGen.next().value);
  print('Generated ID:', idGen.next().value);

   
   
   
})();
