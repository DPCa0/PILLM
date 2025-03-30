 
const handler = {
  get: (target, prop, receiver) => {
    print(`Property ${String(prop)} has been accessed`);
    return Reflect.get(target, prop, receiver);
  }
};

const originalObject = { greeting: "Hello, world!" };
const proxiedObject = new Proxy(originalObject, handler);

 
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

 
async function complexOperation() {
  const [first, second, third] = range(0, 3);
  const fetchGreeting = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(proxiedObject.greeting), 1000);
    });
  };
  const greeting = await fetchGreeting();

  print(`${greeting} [Range values: ${first}, ${second}, ${third}]`);
}

complexOperation();
