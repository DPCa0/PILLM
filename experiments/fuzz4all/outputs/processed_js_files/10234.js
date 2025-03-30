 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`GET: ${prop} => ${target[prop]}`);
      return Reflect.get(target, prop, receiver);
    }
    throw new ReferenceError(`Property ${prop} does not exist.`);
  },
  set(target, prop, value) {
    if (typeof value === 'number' && value >= 0) {
      print(`SET: ${prop} = ${value}`);
      return Reflect.set(target, prop, value);
    }
    throw new TypeError(`Property ${prop} must be a non-negative number.`);
  }
};

const target = { a: 1, b: 2 };
const proxy = new Proxy(target, handler);

 
function* idGenerator(start) {
  let id = start;
  while (true) {
    yield id++;
  }
}

 
const nameMap = new Map();
const ids = idGenerator(100);

function addName(name) {
  const id = ids.next().value;
  nameMap.set(id, name);
  print(`Added: ${name} with ID: ${id}`);
}

 
async function fetchData() {
  try {
    const data = await new Promise((resolve) =>
      setTimeout(() => resolve({ data: [3, 6, 9] }), 1000)
    );
    print("Data fetched:", data);
  } catch (error) {
    console.error("Fetching data failed:", error);
  }
}

 
const uniqueNumbers = new Set([1, 2, 3, 1, 2, 4]);

(async function main() {
  proxy.a = 3;
  try {
    proxy.c = 5;
  } catch (e) {
    console.warn(e.message);
  }

  addName("Alice");
  addName("Bob");

  await fetchData();

  print("Unique numbers:", Array.from(uniqueNumbers));
})();
