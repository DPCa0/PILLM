 
async function fetchData(url) {
   
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

 
const targetObject = { message: "Hello, world!" };
const handler = {
  get(target, property, receiver) {
    print(`Getting property '${property}'`);
    return Reflect.get(target, property, receiver);
  }
};

const proxyObject = new Proxy(targetObject, handler);

 
const callbacks = new Set();

function registerCallback(callback) {
  if (typeof callback === 'function') {
    callbacks.add(callback);
    print('Callback registered');
  } else {
    print('Not a function');
  }
}

function triggerCallbacks() {
  callbacks.forEach(callback => callback());
}

 
const originalArray = [1, 2, 3, 4];
const [first, ...rest] = originalArray;
const newArray = [...rest, 5];

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const generateId = idGenerator();

(async () => {
  print(proxyObject.message);
  registerCallback(() => print("Callback 1 executed"));
  registerCallback(() => print("Callback 2 executed"));
  triggerCallbacks();

  print('Generated ID:', generateId.next().value);
  print('Generated ID:', generateId.next().value);

  print('New Array:', newArray);

  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
})();
