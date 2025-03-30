 

 
const uniqueKey = Symbol('unique');

 
const handler = {
  get(target, property) {
    print(`Getting ${property}`);
    return property in target ? target[property] : `Property ${property} not found`;
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const data = { name: 'JavaScript', type: 'Programming Language' };

 
const proxyData = new Proxy(data, handler);

 
async function fetchData() {
  const fetchPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      proxyData[uniqueKey] = 'Unique Identifier';
      resolve('Data fetched successfully');
    }, 2000);
  });

  try {
    const result = await fetchPromise;
    print(result);
    print(`Proxy Data: ${proxyData.name}, ${proxyData.type}, ${proxyData[uniqueKey]}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
fetchData();
