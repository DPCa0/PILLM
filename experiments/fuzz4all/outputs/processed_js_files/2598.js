 

const target = {
  data: [1, 2, 3, 4, 5],
  multiplier: 2
};

 
const proxy = new Proxy(target, {
  get(target, property, receiver) {
    if (property === 'transformed') {
      return target.data.map(x => x * target.multiplier);
    }
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    if (property === 'multiplier' && value < 1) {
      throw new Error("Multiplier must be greater than or equal to 1");
    }
    return Reflect.set(target, property, value, receiver);
  }
});

 
function* generateTransformedData(proxy) {
  for (const num of proxy.transformed) {
    yield num;
  }
}

 
async function processData() {
  const gen = generateTransformedData(proxy);

  for await (const num of gen) {
    print(`Processed: ${num}`);
  }
}

 
async function runTasks() {
  const results = await Promise.all([
    processData(),
    (async () => { proxy.multiplier = 3; return 'Multiplier updated'; })(),
    (async () => { const [first, ...rest] = proxy.transformed; print(`First: ${first}, Rest: ${rest}`); })()
  ]);

  print(results);
}

runTasks().catch(err => console.error(err));
