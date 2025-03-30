 
const advancedArrayHandler = {
  get(target, prop, receiver) {
    if (prop === 'push') {
      return function (...args) {
        print(`Adding ${args.length} element(s): ${args}`);
        return Reflect.apply(target[prop], target, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

const proxiedArray = new Proxy([], advancedArrayHandler);

 
function* idGenerator() {
  let id = 0;
  while (true) {
    yield `id-${id++}`;
  }
}

const gen = idGenerator();

 
async function fetchData(id) {
  print(`Fetching data for ${id}...`);
  return new Promise(resolve => setTimeout(() => resolve(`Data for ${id}`), 1000));
}

async function processIds() {
  for (let i = 0; i < 5; i++) {
    const id = gen.next().value;
    proxiedArray.push(id);
    const data = await fetchData(id);
    print(data);
  }
}

processIds();
