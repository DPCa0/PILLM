 
const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Getting value of ${prop}`);
      return target[prop];
    } else {
      throw new ReferenceError(`Property ${prop} not found.`);
    }
  },
  set(target, prop, value) {
    print(`Setting value of ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const data = new Proxy({ name: "Alice", age: 30 }, handler);

 
const updateData = ({ name, age, ...rest }) => ({
  name,
  age: age + 1,
  ...rest
});

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const gen = idGenerator();

 
async function fetchData() {
  const id = gen.next().value;
  print(`Fetching data for ID: ${id}`);
   
  return new Promise((resolve) =>
    setTimeout(() => resolve({ id, data: "Sample data" }), 1000)
  );
}

async function main() {
  try {
    print('Initial Data:', data.name, data.age);
    data.name = "Bob";
    data.age = 35;
    
    const newData = updateData(data);
    print('Updated Data:', newData);

    const fetchedData = await fetchData();
    print('Fetched Data:', fetchedData);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
