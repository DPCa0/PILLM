 

 
async function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ name: 'Alice', age: 30, location: 'Wonderland' });
    }, 1000);
  });
}

 
function* processData(data) {
  yield `Name: ${data.name}`;
  yield `Age: ${data.age}`;
  yield `Location: ${data.location}`;
}

 
const handler = {
  get: (target, prop) => (prop in target ? target[prop] : 'Property not found'),
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
(async function main() {
  try {
    const data = await fetchData();
    const processedData = processData(data);

    let result;
    while (!(result = processedData.next()).done) {
      print(result.value);
    }

     
    const dataProxy = new Proxy(data, handler);

    print(dataProxy.name);  
    print(dataProxy.nonexistent);  
    dataProxy.age = 31;  
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
