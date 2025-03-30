 

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const idGen = idGenerator();

function fetchData(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve({ data: `Data for ID: ${id}`, success: true });
      } else {
        reject(new Error('Failed to fetch data'));
      }
    }, 1000);
  });
}

const handler = {
  get: (target, prop, receiver) => {
    print(`Accessing property: ${prop}`);
    return Reflect.get(target, prop, receiver);
  }
};

const proxyObject = new Proxy({ name: 'Proxy Object', id: idGen.next().value }, handler);

async function processData() {
  try {
    let id = idGen.next().value;
    proxyObject.id = id;
    print(`Processing ${proxyObject.name} with ID: ${proxyObject.id}`);
    const response = await fetchData(proxyObject.id);
    print(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

(async () => {
  for (let i = 0; i < 5; i++) {
    await processData();
  }
})();
