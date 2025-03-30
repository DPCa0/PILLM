 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
async function fetchDataWithRetries(url, retries = 3, delayMs = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
       
      let response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
       
      let data = await response.json();
      print('Data retrieved:', data);
      return data;
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
       
      if (i < retries - 1) await delay(delayMs);
    }
  }
  throw new Error('All attempts failed');
}

 
const loggingHandler = {
  get: function(target, prop, receiver) {
    print(`Property '${prop}' accessed`);
    return Reflect.get(target, prop, receiver);
  }
};

 
const targetObject = {
  prop1: 'Hello',
  prop2: 'World'
};

 
const proxy = new Proxy(targetObject, loggingHandler);

 
print(proxy.prop1);  
print(proxy.prop2);  

 
fetchDataWithRetries('https://api.example.com/data').catch(console.error);
