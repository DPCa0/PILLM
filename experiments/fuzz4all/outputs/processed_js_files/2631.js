 

 
async function* fetchDataGenerator(urls) {
  for (const url of urls) {
    yield fetch(url).then(response => response.json());
  }
}

 
const dataHandler = {
  get(target, property) {
    print(`Accessing property "${property}"`);
    return Reflect.get(target, property);
  }
};

 
async function main() {
   
  const urls = [
    'https://api.example.com/data1',
    'https://api.example.com/data2',
    'https://api.example.com/data3'
  ];

   
  let dataProxy = new Proxy({}, dataHandler);

   
  for await (const data of fetchDataGenerator(urls)) {
    dataProxy = new Proxy(data, dataHandler);

     
    print('Fetched Data:', dataProxy);

     
    if (dataProxy.someProperty) {
      print('someProperty:', dataProxy.someProperty);
    }
  }
}

main().catch(error => console.error('Error:', error));
