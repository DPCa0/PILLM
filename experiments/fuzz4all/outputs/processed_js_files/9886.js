 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const handler = {
  get: (target, prop) => {
    print(`Accessing property '${prop}'`);
    return prop in target ? target[prop] : 'Property does not exist';
  },
  set: (target, prop, value) => {
    print(`Setting property '${prop}' to '${value}'`);
    target[prop] = value;
    return true;
  },
};

const targetObject = {};
const proxyObject = new Proxy(targetObject, handler);

 
function* valueGenerator(data) {
  for (let item of data) {
    yield item;
  }
}

 
(async () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';  
  const data = await fetchData(apiUrl);

  if (data) {
    proxyObject.data = data;

    const generator = valueGenerator(proxyObject.data);
    print('First value:', generator.next().value);
    print('Second value:', generator.next().value);
    print('Accessing non-existing property:', proxyObject.nonExistingProp);
  }
})();
