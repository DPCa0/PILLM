 

 
function* fetchDataGenerator(chunks) {
  for (const chunk of chunks) {
    yield new Promise((resolve) => setTimeout(() => resolve(chunk), 1000));
  }
}

 
async function processChunks(generator) {
  for (let chunkPromise of generator) {
    const chunk = await chunkPromise;
    print(`Processing chunk: ${chunk}`);
  }
}

 
const data = { a: 1, b: 2, c: 3 };
const handler = {
  get(target, property) {
    print(`Accessing property '${property}'`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  },
};

const proxyData = new Proxy(data, handler);

 
proxyData.a;  
proxyData.b = 42;  

 
const chunks = ['Chunk1', 'Chunk2', 'Chunk3'];
const generator = fetchDataGenerator(chunks);

processChunks(generator).then(() => print("All chunks processed."));
