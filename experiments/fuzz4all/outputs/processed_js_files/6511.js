 

 
const fetchData = async (url, delay) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(`Data from ${url}`), delay);
  });
};

 
const secretMethod = Symbol('secret');

 
const handler = {
  get: (target, property) => {
    if (property === secretMethod) {
      print('Accessing secret method');
      return () => print('Secret method invoked!');
    }
    print(`Getting property ${property}`);
    return target[property];
  },
};

const dataMap = new Map();
const proxy = new Proxy(dataMap, handler);

 
const fetchAllData = async () => {
  const urls = ['https://api1.example.com', 'https://api2.example.com', 'https://api3.example.com'];
  const delays = [1000, 2000, 1500];
  
   
  const results = await Promise.all(urls.map((url, index) => fetchData(url, delays[index])));
  
  results.forEach((result, index) => {
    const key = `data${index + 1}`;
    proxy.set(key, result);
  });

   
  print(proxy.get('data1'));
  print(proxy.get('data2'));
  print(proxy.get('data3'));

   
  proxy[secretMethod]();
};

fetchAllData().catch(console.error);
