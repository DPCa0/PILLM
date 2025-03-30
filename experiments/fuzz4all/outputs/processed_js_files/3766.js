 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({ data: { id: 1, name: 'John Doe', active: true } }), 1000);
  });
}

function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const ids = idGenerator();

const handler = {
  get: (obj, prop) => prop in obj ? obj[prop] : `Property "${prop}" does not exist`,
};

(async function main() {
  const proxy = new Proxy({ id: 0, name: 'N/A', active: false }, handler);

  print(`Initial Proxy Data: ${JSON.stringify(proxy)}`);

  const data = await fetchData('https://example.com');
  const { id, name, active } = data.data;
  
   
  Object.assign(proxy, { id: ids.next().value, name, active });

  print(`Updated Proxy Data: ${JSON.stringify(proxy)}`);
  
   
  print(`Accessing non-existent property: ${proxy.status}`);
})();
