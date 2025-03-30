 

 
const fetchData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: "Sample Data" }), 1000)
  );

 
function* dataGenerator() {
  yield fetchData();
  yield fetchData();
}

 
async function handleData(gen) {
  for (let promise of gen) {
    try {
      const result = await promise;
      print(result.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

 
const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property "${prop}"`);
      return target[prop];
    } else {
      console.warn(`Property "${prop}" does not exist`);
      return undefined;
    }
  },
};

const obj = { a: 1, b: 2, c: 3 };
const proxiedObj = new Proxy(obj, handler);

 
handleData(dataGenerator());

 
print(proxiedObj.a);  
print(proxiedObj.z);  
