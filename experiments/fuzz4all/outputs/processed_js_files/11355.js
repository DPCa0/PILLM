 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
function* dataGenerator() {
  let id = 1;
  while (true) {
    yield { id: id++, value: Math.random() * 100 };
  }
}

 
async function fetchData(gen) {
  const data = [];
  for (let i = 0; i < 5; i++) {
    await delay(500);  
    data.push(gen.next().value);
  }
  return data;
}

 
async function processData() {
  const generator = dataGenerator();
  const fetchedData = await fetchData(generator);

  fetchedData.forEach(({ id, value }) => {
    print(`Data ID: ${id}, Value: ${value.toFixed(2)}`);
  });
}

 
const handler = {
  get(target, property) {
    print(`Getting property: ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const observedData = new Proxy({ count: 0 }, handler);
observedData.count++;
print(`Count: ${observedData.count}`);

 
processData().then(() => {
  print('Data processing complete.');
});
