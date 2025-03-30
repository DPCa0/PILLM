 
async function* fetchData() {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  for (const url of urls) {
     
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
     
    yield { url, data: `Data from ${url}` };
  }
}

 
const handler = {
  get(target, prop) {
    print(`Getting property ${prop}`);
    return prop in target ? target[prop] : `No property ${prop}`;
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
const proxyObject = new Proxy({ name: 'JavaScript', type: 'Programming Language' }, handler);

 
proxyObject.version = 'ES2023';
print(proxyObject.name);
print(proxyObject.category);

 
const getVersion = obj => obj?.version ?? 'Unknown version';
print(`Version: ${getVersion(proxyObject)}`);

 
(async () => {
  const [{ url: url1, data: data1 }, { url: url2, data: data2 }] = await Promise.all(fetchData());
  print(`Fetched data: ${data1} and ${data2}`);
})();
