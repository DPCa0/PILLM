 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

 
const createDataProxy = (data) => {
  return new Proxy(data, {
    get(target, prop) {
      if (prop in target) {
        print(`Accessing property "${prop}"`);
        return target[prop];
      } else {
        console.warn(`Property "${prop}" does not exist`);
        return undefined;
      }
    },
    set(target, prop, value) {
      print(`Setting property "${prop}" to "${value}"`);
      target[prop] = value;
      return true;
    }
  });
};

 
(async () => {
  print("Fetching data...");
  const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  
  if (data) {
    const proxyData = createDataProxy(data);
    
     
    print(proxyData.title);  
    print(proxyData.nonExistentProp);  

     
    proxyData.title = "New Title";

     
    await delay(1000);
    print("Updated title:", proxyData.title);
  }
})();
