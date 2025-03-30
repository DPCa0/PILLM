 
const fetchData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: [1, 2, 3, 4, 5], message: 'Data fetched successfully' });
    }, 1000);
  });
};

 
async function* dataGenerator() {
  let dataChunk;
  for (let i = 0; i < 3; i++) {
    dataChunk = await fetchData();
    yield dataChunk;
  }
}

 
const handler = {
  get(target, property) {
    print(`Accessing property: ${property}`);
    return Reflect.get(...arguments);
  },
};

const proxyObj = new Proxy({ data: [], message: '' }, handler);

 
(async () => {
  try {
    for await (const chunk of dataGenerator()) {
      proxyObj.data.push(...chunk.data);
      proxyObj.message = chunk.message;
      print(`Current data: ${proxyObj.data}, Message: ${proxyObj.message}`);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
