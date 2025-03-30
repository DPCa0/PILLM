 
async function fetchData(url) {
   
  const fetchPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { message: "Hello from the server!" };
      Math.random() > 0.1 ? resolve(data) : reject(new Error("Network Error"));
    }, 1000);
  });

  try {
    const data = await fetchPromise;
    print("Data fetched:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

 
function* generateSequence() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

 
const targetObject = { foo: "bar" };
const handler = {
  get(target, property) {
    print(`Getting property ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};
const proxy = new Proxy(targetObject, handler);

 
async function main() {
  print("Fetching data...");
  await fetchData("https://example.com/api");

  const sequence = generateSequence();
  print("Generated IDs:", sequence.next().value, sequence.next().value);

  print("Proxy interactions:");
  proxy.foo = "baz";
  print(proxy.foo);
}

 
main();
