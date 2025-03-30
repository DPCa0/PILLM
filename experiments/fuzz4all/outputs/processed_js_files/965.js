 

 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["apple", "banana", "cherry"]);
    }, 1000);
  });
};

 
async function asyncProcess() {
  const data = await fetchData();
  print("Data fetched:", data);
   
  yieldEach(data);
}

 
function* yieldEach(array) {
  for (const item of array) {
    yield item;
  }
}

 
const arrayHandler = {
  get: (target, property) => {
    if (property in target) {
      print(`Accessed element at index ${property}: ${target[property]}`);
      return target[property];
    }
    console.warn(`No element found at index ${property}`);
    return null;
  },
};

 
async function main() {
  const asyncIterable = asyncProcess();
  const iterator = asyncIterable[Symbol.iterator]();

  let result;
  while (!(result = iterator.next()).done) {
    print("Yielded value:", result.value);
  }

   
  const fruits = ["apple", "banana", "cherry"];
  const proxyFruits = new Proxy(fruits, arrayHandler);

  print(proxyFruits[1]);  
  print(proxyFruits[3]);  
}

main();
