 

function* generateSequence() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const idGenerator = generateSequence();

const apiSimulation = () => new Promise((resolve) => {
  setTimeout(() => resolve({ data: `Item ${idGenerator.next().value}` }), 500);
});

const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Getting property ${prop}`);
      return Reflect.get(target, prop, receiver);
    }
    return `Property ${prop} not found.`;
  },
  set(target, prop, value, receiver) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const dataHandler = new Proxy({}, handler);

async function fetchData() {
  print("Starting data fetch...");
  const responses = await Promise.all([apiSimulation(), apiSimulation(), apiSimulation()]);
  
  responses.forEach((response, index) => {
    dataHandler[`item${index}`] = response.data;
  });

  print("Data fetch complete:", dataHandler);
}

fetchData();
