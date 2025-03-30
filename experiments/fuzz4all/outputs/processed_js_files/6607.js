 
const fetchData = async (url) => {
   
  try {
     
    let response = await fetch(url);
     
    let { status, statusText } = response;
    
     
    status === 200 
      ? console.log(`Success: ${status} - ${statusText}`) 
      : print(`Error: ${status} - ${statusText}`);
    
     
    let data = await response.json();
    print(`Data fetched from ${url}:\n`, JSON.stringify(data, null, 2));

     
    let ids = [...new Set(data.map(item => item.id))];
    print('Unique IDs:', ids);

     
    let processedData = data.map(({ id, title, body }) => ({ id, title, body: body.slice(0, 20) + '...' }));
    print('Processed Data:', processedData);

  } catch (error) {
     
    console.error({ message: 'Failed to fetch data', error });
  }
};

 
(async () => {
   
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const dataModule = await import('./dataProcessor.js');

  fetchData(url).then(() => {
     
    const data = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    print(dataModule.processData(...data));
  });
})();
