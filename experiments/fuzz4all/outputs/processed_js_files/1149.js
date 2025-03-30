 
async function fetchDataAndProcess() {
  try {
    const apiURL = 'https://jsonplaceholder.typicode.com/posts';
    const response = await fetch(apiURL);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    
     
    const processedData = data
      .filter(post => post.userId < 5)   
      .map(post => ({ ...post, title: post.title.toUpperCase() }))   
      .reduce((acc, post) => {
        acc.push({ id: post.id, user: post.userId, titleLength: post.title.length });
        return acc;
      }, []);
    
     
    const handler = {
      get(target, property) {
        print(`Accessing property: ${property}`);
        return Reflect.get(target, property);
      }
    };
    
    const proxyData = new Proxy(processedData, handler);
    
     
    for (const [index, item] of proxyData.entries()) {
      print(`Post ${index + 1}:`, item);
    }
    
  } catch (error) {
    console.error('Error fetching and processing data:', error);
  }
}

 
fetchDataAndProcess();
