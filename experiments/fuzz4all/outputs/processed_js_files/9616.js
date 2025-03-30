 
async function* fetchData() {
  const dataChunks = [
    { id: 1, value: 'First Chunk' },
    { id: 2, value: 'Second Chunk' },
    { id: 3, value: 'Third Chunk' }
  ];

  for (const chunk of dataChunks) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield chunk;
  }
}

const handler = {
  get(target, prop, receiver) {
    const value = Reflect.get(target, prop, receiver);
    if (typeof value === 'string') {
      return `Modified: ${value}`;
    }
    return value;
  }
};

(async () => {
  const asyncIterator = fetchData();

  for await (const data of asyncIterator) {
    const proxiedData = new Proxy(data, handler);
    print(`Chunk ID: ${proxiedData.id}, Chunk Value: ${proxiedData.value}`);
  }
})();
