 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchDataWithDelay(url) {
  print(`Fetching data from ${url}...`);
  await delay(2000);  

   
  const data = { id: 1, name: "John Doe", age: 25 };
  print(`Data fetched:`, data);
  
  return data;
}

 
const dataHandler = {
  get(target, property) {
    print(`Accessed property "${property}" with value: ${target[property]}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Updated property "${property}" from ${target[property]} to ${value}`);
    target[property] = value;
    return true;
  }
};

(async () => {
  try {
    const url = "https://api.example.com/user";
    const fetchedData = await fetchDataWithDelay(url);
    
     
    const proxyData = new Proxy(fetchedData, dataHandler);
    
     
    print(proxyData.name);
    proxyData.age = 30;
    print(proxyData);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
