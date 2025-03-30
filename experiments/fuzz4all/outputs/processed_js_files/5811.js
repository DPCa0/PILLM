 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(['apple', 'banana', 'mango']), 1000);
  });
};

 
const arrayHandler = {
  get(target, property) {
    if (typeof target[property] === 'function') {
      return function (...args) {
        print(`Operation: ${property}, Arguments: ${args}`);
        return target[property].apply(this, args);
      };
    }
    return target[property];
  }
};

 
(async function main() {
  try {
    const data = await fetchData();  
    const [firstFruit, ...restFruits] = data;  
    
    print(`First fruit: ${firstFruit}`);  
    print(`Rest of the fruits: ${restFruits.join(', ')}`);
    
    const fruitsProxy = new Proxy(data, arrayHandler);  
    fruitsProxy.push('orange');  
    print(`Final fruits list: ${fruitsProxy.join(', ')}`);
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
