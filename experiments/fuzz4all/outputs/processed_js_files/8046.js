 

 
const fetchData = (delay, data) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(`Fetched data: ${data}`), delay)
  );

 
async function processAsyncData() {
  try {
    const data1 = await fetchData(1000, 'Data1');
    print(data1);
    const data2 = await fetchData(2000, 'Data2');
    print(data2);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
function* dataGenerator(dataArray) {
  for (const data of dataArray) {
    yield `Processed: ${data}`;
  }
}

 
const targetObject = {
  a: 1,
  b: 2,
  c: 3,
};

const handler = {
  get: (obj, prop) => {
    print(`Property '${prop}' has been accessed.`);
    return prop in obj ? obj[prop] : 'Property does not exist';
  },
};

const proxyObject = new Proxy(targetObject, handler);

 
processAsyncData();

 
const dataGen = dataGenerator(['Apple', 'Banana', 'Cherry']);
for (const value of dataGen) {
  print(value);
}

 
print(proxyObject.a);
print(proxyObject.b);
print(proxyObject.z);  
