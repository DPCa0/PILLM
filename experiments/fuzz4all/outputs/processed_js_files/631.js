 
async function* fetchAndProcessData(urls) {
  for (const url of urls) {
    try {
       
      const response = await fetch(url);
      const data = await response.json();
      
       
      const proxyData = new Proxy(data, {
        get(target, prop) {
          print(`Accessing property: ${prop}`);
          return target[prop];
        }
      });

       
      yield processComplexData(proxyData);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
}

 
function processComplexData({ title, values = [] }) {
  const squaredValues = values.map(x => x ** 2);
  return { title, squaredValues };
}

 
const UNIQUE_KEY = Symbol('uniqueKey');

 
const urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2'
];

 
(async () => {
  const processedDataList = [];
  
  for await (const processedData of fetchAndProcessData(urls)) {
     
    print(taggedLogger`Processed Data: ${processedData}`);
    
     
    processedData[UNIQUE_KEY] = generateUniqueKey();

    processedDataList.push(processedData);
  }

   
  print('Final Processed Data List:', processedDataList);
})();

 
function taggedLogger(strings, ...values) {
  return strings.reduce((prev, current, i) => prev + current + (values[i] || ''), '');
}

 
function generateUniqueKey() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
