 
async function* fetchDataAndProcess(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();

   
  for (const { id, title } of data) {
    yield { id, title: title.toUpperCase() };
  }
}

 
const logAccessHandler = {
  get: (target, property) => {
    print(`Accessing ${property}`);
    return Reflect.get(target, property);
  }
};

 
(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    
     
    const iterator = fetchDataAndProcess(url);
    
     
    for await (const item of iterator) {
      const proxiedItem = new Proxy(item, logAccessHandler);
      
       
      print(proxiedItem?.title ?? 'No Title');
    }
  } catch (error) {
    console.error('Error:', error?.message ?? 'Unknown Error');
  }
})();
