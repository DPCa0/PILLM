 

 
const fetchData = url => fetch(url)
  .then(response => response.json())
  .catch(err => console.error('Fetching Error:', err));

 
async function processData() {
  try {
     
    const data = await fetchData('https://jsonplaceholder.typicode.com/users');

     
    const formattedData = data.map(({ id, name, email }) => ({
      id,
      name,
      email
    }));

     
    const uniqueNames = [...new Set(formattedData.map(user => user.name))];

     
    const formattedNames = formatNames`Unique Names: ${uniqueNames}`;

     
    const handler = {
      get(target, property) {
        print(`Accessing property '${property}':`, target[property]);
        return target[property];
      }
    };

    const proxyData = new Proxy(formattedData, handler);

    print(formattedNames);

     
    const idSymbol = Symbol('id');
    proxyData[idSymbol] = Date.now();

     
    for (const user of proxyData) {
      print(`User ${user?.id} has email: ${user?.email}`);
    }

  } catch (error) {
    console.error('Processing Error:', error);
  }
}

 
function formatNames(strings, ...values) {
  return strings.raw[0] + values[0].join(', ');
}

 
(async () => {
  await processData();
})();
