 
const randomDelay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

 
async function* fetchData(urls) {
  for (let url of urls) {
    await randomDelay();  
    const response = await fetch(url);
    const data = await response.json();
    yield data;
  }
}

 
const logHandler = {
  get(target, prop, receiver) {
    print(`GET property '${prop}'`);
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value) {
    print(`SET property '${prop}' to '${value}'`);
    return Reflect.set(target, prop, value);
  }
};

const dataProxy = new Proxy({ result: [] }, logHandler);

 
(async () => {
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3'
  ];
  
  for await (let data of fetchData(urls)) {
    dataProxy.result.push(data);
    print('Fetched data:', data);
  }
  
  print('Final result:', dataProxy.result);
})();
