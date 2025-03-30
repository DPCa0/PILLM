 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: "Important data", timestamp: new Date() });
    }, 2000);
  });
};

 
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

 
const createLoggingProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Accessed property: ${prop}`);
      return obj[prop];
    },
    set: (obj, prop, value) => {
      print(`Modified property: ${prop} from ${obj[prop]} to ${value}`);
      obj[prop] = value;
      return true;
    },
  });
};

 
(async function main() {
  const counter = createCounter();

  print("Initial Count:", counter.getCount());
  counter.increment();
  print("Count after increment:", counter.getCount());
  counter.decrement();
  print("Count after decrement:", counter.getCount());

  const logProxy = createLoggingProxy({ name: "Alice", age: 25 });
  print("Name:", logProxy.name);
  logProxy.age = 26;
  print("New Age:", logProxy.age);

  const data = await fetchData();
  print("Fetched Data:", data);
})();
