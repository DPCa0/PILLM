 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
  return response.json();
}

 
function* dataPipeline(url) {
  try {
    const data = yield fetchData(url);
    yield* processPipeline(data);
  } catch (error) {
    console.error(error);
  }
}

 
function* processPipeline(data) {
  for (const item of data) {
    yield { ...item, processed: true };
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Getting property '${property}'`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  },
};

const targetObject = { a: 1, b: 2 };
const proxyObject = new Proxy(targetObject, handler);

 
proxyObject.a;  
proxyObject.b = 3;  

 
(async () => {
  const generator = dataPipeline('https://jsonplaceholder.typicode.com/posts');
  let result = generator.next();

  while (!result.done) {
    result = generator.next(await result.value);
    if (!result.done) print(result.value);
  }
})();
