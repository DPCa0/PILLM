 
async function fetchDataAndProcess(url) {
  try {
     
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
     
    const data = await response.json();
    
     
    const [{ id: firstId, title: firstTitle }] = data;

     
    function* dataTransformer(data) {
      for (const { id, title } of data) {
        yield { id, capitalizedTitle: title.toUpperCase() };
      }
    }

     
    const transformedData = [];
    for (const item of dataTransformer(data)) {
      transformedData.push(item);
    }

     
    const handler = {
      get(target, property) {
        print(`Accessed property "${property}"`);
        return target[property];
      }
    };

    const proxyTransformedData = new Proxy(transformedData, handler);

     
    print(proxyTransformedData[0]?.capitalizedTitle);

     
    const uniqueIds = new Set(data.map(item => item.id));

     
    const idChecks = await Promise.allSettled(
      Array.from(uniqueIds).map(id => 
        new Promise((resolve) => setTimeout(() => resolve(id % 2 === 0), 100))
      )
    );

     
    print(idChecks.map(result => result.status === 'fulfilled' && result.value));

  } catch (error) {
    console.error('Error:', error);
  }
}

 
fetchDataAndProcess('https://jsonplaceholder.typicode.com/posts');
