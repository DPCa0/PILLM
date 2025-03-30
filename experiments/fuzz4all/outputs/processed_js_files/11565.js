 

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Property '${prop}' has been accessed.`);
    return Reflect.get(...arguments);
  }
};

const obj = new Proxy({ a: 10, b: 20 }, handler);

 
async function fetchData() {
   
  const fetchPromise = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data1: 'value1', data2: 'value2' });
    }, 1000);
  });
  
  const data = await fetchPromise();

   
  const { data1, data2 } = data;

   
  return { ...data, additionalData: 'extraValue' };
}

(async function main() {
   
  print(obj.a);
  print(obj.b);

   
  const data = await fetchData();
  print(data);
})();
