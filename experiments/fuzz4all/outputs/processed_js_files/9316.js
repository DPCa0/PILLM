 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { userId: 1, id: 101, title: "Sample Data", completed: true };
      resolve(data);
    }, 1000);
  });
}

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const idGen = idGenerator();

 
const handler = {
  get(target, prop) {
    print(`Property '${prop}' has been accessed.`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    if (prop === 'completed' && typeof value !== 'boolean') {
      throw new TypeError('The "completed" property must be a boolean.');
    }
    print(`Property '${prop}' has been set to '${value}'.`);
    return Reflect.set(target, prop, value);
  }
};

async function main() {
  try {
     
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    const newData = { ...data, newId: idGen.next().value };

     
    const proxyData = new Proxy(newData, handler);

    print('Fetched Data:', proxyData);

     
    print('Title:', proxyData.title);
    proxyData.completed = false;
    print('Updated Data:', proxyData);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();
