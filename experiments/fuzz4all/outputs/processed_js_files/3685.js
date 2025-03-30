 
async function fetchData(url) {
  try {
     
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
     
    let data = await response.json();
    
     
    const { name, ...details } = data;
    
     
    print(`Fetched Data:\nName: ${name}\nDetails: ${JSON.stringify(details, null, 2)}`);
    
     
    const handler = {
      get(target, property) {
        print(`Accessed property: ${property}`);
        return target[property];
      }
    };
    
    const proxyData = new Proxy(data, handler);
    
     
    print(proxyData.name);
    print(proxyData.age);
    
     
    await Promise.all([
      new Promise(resolve => setTimeout(resolve, 1000)),   
      new Promise((resolve, reject) => setTimeout(resolve, 500))  
    ]);
    
    print('All asynchronous tasks are complete.');
    
  } catch (error) {
     
    console.error(`Error fetching data: ${error.message}`);
  }
}

 
fetchData('https://api.example.com/data');
