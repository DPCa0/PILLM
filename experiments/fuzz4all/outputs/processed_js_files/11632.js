 
async function fetchDataAndProcess(url) {
  try {
     
    let response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    
     
    let data = await response.json();

     
    const { title, description } = data;

     
    print(`Title: ${title}\nDescription: ${description}`);

     
    let dataMap = new Map();
    dataMap.set('title', title);
    dataMap.set('description', description);

     
    print('Keys:', ...dataMap.keys());

     
    const concatenated = [...dataMap.values()].reduce((acc, curr) => acc + ' ' + curr, '');
    print(`Concatenated: ${concatenated}`);

     
    const handler = {
      set(obj, prop, value) {
        if (typeof value !== 'string') {
          throw new Error('Value must be a string');
        }
        obj[prop] = value;
        return true;
      }
    };

    const validatedMap = new Proxy(dataMap, handler);
     
    validatedMap.set('author', 'John Doe');  
     

    print('Final Map:', validatedMap);

  } catch (error) {
     
    console.error('Error fetching or processing data:', error);
  }
}

 
fetchDataAndProcess('https://jsonplaceholder.typicode.com/posts/1');
