 

 
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

 
function* dataChunks(data, chunkSize) {
  for (let i = 0; i < data.length; i += chunkSize) {
    yield data.slice(i, i + chunkSize);
  }
}

 
const handler = {
  get: (target, property, receiver) => {
    print(`Accessing property: ${property}`);
    return Reflect.get(target, property, receiver);
  },
  set: (target, property, value, receiver) => {
    print(`Setting property: ${property} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  }
};

 
(async function main() {
  try {
    const url = 'https://randomuser.me/api/?results=10';
    const rawData = await fetchData(url);

     
    const proxiedData = new Proxy(rawData, handler);

     
    const generator = dataChunks(proxiedData, 2);

    for (const chunk of generator) {
      print('Processing chunk:', chunk);
    }

     
    if (Reflect.has(proxiedData[0], 'name')) {
      print('Name property exists in data:', proxiedData[0].name);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
