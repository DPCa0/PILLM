 
async function* fetchData(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    const data = await response.json();
    yield data;
  }
}

 
const transformData = (data) => {
  const { id, name, details: { age } } = data;
  return `ID: ${id}, Name: ${name}, Age: ${age}`;
};

 
const compose = (...fns) => (arg) => fns.reduce((acc, fn) => fn(acc), arg);

 
const logProxy = new Proxy(compose, {
  apply(target, thisArg, args) {
    print(`Composing ${args.length} functions`);
    return Reflect.apply(target, thisArg, args);
  }
});

 
async function processUrls(urls) {
  const processingPipeline = logProxy(
    data => data.map(transformData),  
    transformedData => transformedData.filter(d => d.includes('Age: 30'))  
  );

  for await (const dataBatch of fetchData(urls)) {
    const processedData = processingPipeline(dataBatch);
    print(processedData);
  }
}

 
const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/data3'
];

processUrls(urls).catch(console.error);
