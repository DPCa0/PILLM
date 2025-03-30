 

 
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => resolve({ data: [1, 2, 3, 4, 5] }), 2000);
});

 
const arrayHandler = {
  get(target, property) {
    if (property in target) {
      print(`Accessed element ${property}`);
      return target[property];
    } else {
      print(`Attempted to access non-existent element ${property}`);
      return undefined;
    }
  },
  set(target, property, value) {
    print(`Setting element ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

async function processData() {
  try {
    print('Fetching data...');
    const response = await fetchData();
    let { data } = response;  

    const proxiedData = new Proxy(data, arrayHandler);
    
     
    proxiedData[1] = 10;  
    print('Modified data:', proxiedData);
    
    print('Accessing elements:');
    print(proxiedData[0]);  
    print(proxiedData[5]);  
  } catch (error) {
    console.error('Error processing data:', error);
  }
}

processData();
