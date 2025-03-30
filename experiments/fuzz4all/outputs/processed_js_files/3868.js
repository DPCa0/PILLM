 

 
function fetchData(value, delay) {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay));
}

 
async function getData() {
  try {
    const [data1, data2] = await Promise.all([fetchData('Data 1', 1000), fetchData('Data 2', 1500)]);
    return { data1, data2 };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const dataHandler = {
  get: (target, property) => {
    print(`Accessed property: ${property}`);
    return target[property] || 'Property not found';
  },
  set: (target, property, value) => {
    print(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
(async function main() {
  const data = await getData();
  const dataProxy = new Proxy(data, dataHandler);

  print(dataProxy.data1);  
  dataProxy.data3 = 'New Data';  
  print(dataProxy.data3);
})();

 
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

 
const generator = generateSequence();
for (const value of generator) {
  print(value);
}
