 
async function fetchDataAndProcess(url) {
   
  const response = await fetch(url);
  const data = await response.json();

   
  const uniqueItems = new Set(data.map(item => item.id));

   
  for (const id of uniqueItems) {
    print(`Processing item with id: ${id}`);
  }

   
  const sampleObject = { a: 1, b: 2 };
  const proxy = new Proxy(sampleObject, {
    get(target, prop) {
      print(`Accessed property ${prop}`);
      return target[prop];
    }
  });

  print(proxy.a);
}

 
const startProcessing = url => {
  print(`Starting processing for ${url}`);

  fetchDataAndProcess(url)
    .then(() => console.log('Processing completed'))
    .catch(error => console.error(`Error: ${error}`));
};

 
startProcessing('https://jsonplaceholder.typicode.com/todos');
