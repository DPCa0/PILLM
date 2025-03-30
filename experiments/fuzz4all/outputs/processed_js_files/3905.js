 

async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

const handler = {
  get: (target, property) => {
    print(`Accessing property '${property}'`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property '${property}' to ${value}`);
    target[property] = value;
    return true;
  }
};

function processData(...data) {
  const [first, ...rest] = data;
  print(`First item: ${JSON.stringify(first)}`);
  print(`Rest items: ${JSON.stringify(rest)}`);
  return [...rest, first];
}

(async () => {
  const rawData = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  const proxyData = new Proxy(rawData, handler);

  proxyData.newProp = 'testValue';   
  print(proxyData.title);       

  const reorderedData = processData(proxyData, { second: 'item2' }, { third: 'item3' });
  print('Reordered Data:', reorderedData);
})();
