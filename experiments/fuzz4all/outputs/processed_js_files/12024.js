 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  return await response.json();
}

 
const handler = {
  get: function(target, prop) {
    if (prop in target) {
      print(`Getting property: ${prop}`);
      return target[prop];
    } else {
      return `Property ${prop} does not exist.`;
    }
  },
  set: function(target, prop, value) {
    print(`Setting property: ${prop} with value: ${value}`);
    target[prop] = value;
  }
};

 
let data = { name: "John", age: 30 };
let proxyData = new Proxy(data, handler);

 
const uniqueSymbol = Symbol("uniqueProperty");
proxyData[uniqueSymbol] = "Symbolic Value";

 
function createMultiplier(x) {
  return function(y) {
    return x * y;
  };
}

 
let numbers = [1, 2, 3, 4, 5];
let [first, second, ...rest] = numbers;
let squared = numbers.map(n => n ** 2);

 
(async function main() {
  try {
     
    const url = "https://jsonplaceholder.typicode.com/posts/1";
    const postData = await fetchData(url);
    print("Fetched Data:", postData);

     
    print(proxyData.name);  
    proxyData.age = 31;
    print(proxyData.age);  
    print(proxyData.nonExistentProp);  
    print(proxyData[uniqueSymbol]);  

     
    const double = createMultiplier(2);
    print(double(5));  

     
    print("Destructured:", first, second, rest);
    print("Squared numbers:", squared);
  } catch (error) {
    console.error("Error:", error);
  }
})();
