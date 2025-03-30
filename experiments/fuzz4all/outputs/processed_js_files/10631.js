 

 
(() => {
   
  const handler = {
    get: (target, property) => {
      print(`Getting the value of ${property}`);
      return target[property];
    },
    set: (target, property, value) => {
      print(`Setting the value of ${property} to ${value}`);
      target[property] = value;
      return true;
    }
  };

  const data = { name: 'JavaScript', type: 'Programming Language' };
  const proxyData = new Proxy(data, handler);

   
  async function fetchData() {
    print("Fetching data...");

     
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Data fetched successfully!');
      }, 2000);
    });
  }

   
  async function main() {
    try {
      print(proxyData.name);  
      proxyData.version = 'ES6';    

      const result = await fetchData();  
      print(result);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

   
  main();
})();
