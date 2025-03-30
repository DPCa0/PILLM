 
const complexDataStructure = new Map([
  ['key1', { a: 1, b: 2 }],
  ['key2', ['array1', 'array2', { c: 3 }]],
]);

 
const handler = {
  get: (target, prop) => {
    print(`Getting ${prop}`);
    return target[prop];
  },
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

const proxiedDataStructure = new Proxy(complexDataStructure, handler);

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
const [first, second, third] = numberGenerator();
print(first, second, third);  

 
async function fetchData() {
  const fetchPromise = new Promise((resolve) => {
    setTimeout(() => resolve('Data fetched!'), 1000);
  });

  const data = await fetchPromise;
  print(data);

   
  function closureExample() {
    let count = 0;
    return function () {
      count += 1;
      return count;
    };
  }

  const increment = closureExample();
  print(increment(), increment());
}

fetchData();

 
print(proxiedDataStructure.get('key1'));  
proxiedDataStructure.set('key3', 'newData');
print(proxiedDataStructure.get('key3'));  
