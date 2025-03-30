 

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
function* dataGenerator(dataArray) {
  for (let item of dataArray) {
    yield item;
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Getting property ${prop}`);
    return Reflect.get(...arguments);
  },
  set: function(target, prop, value, receiver) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

 
async function main() {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const data = await fetchData(url);
  if (data) {
    const proxyData = new Proxy(data, handler);
    proxyData[0].title = 'Updated Title';  

    const generator = dataGenerator(proxyData);
    let item;
    while (!(item = generator.next()).done) {
      print('Yielded item:', item.value.title);  
    }
  }
}

main();
