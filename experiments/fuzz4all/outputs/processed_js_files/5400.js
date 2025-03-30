 

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      return target[property];
    } else {
      return `Property ${property} does not exist`;
    }
  }
};

const originalObject = { name: "JavaScript", type: "Language" };
const proxyObject = new Proxy(originalObject, handler);

 
const dataMap = new Map();
dataMap.set(1, "One").set(2, "Two").set(3, "Three");

const uniqueValues = new Set([1, 2, 3, 4, 5, 1, 2]);

 
const uniqueKey = Symbol('unique');

 
(async () => {
  print("Fetching Data:");
  const jsonData = await fetchData('https://api.github.com');  
  print(jsonData);

  print("\nProxy Usage:");
  print(proxyObject.name);  
  print(proxyObject.version);  

  print("\nNumber Generator:");
  const gen = numberGenerator();
  print(gen.next().value);  
  print(gen.next().value);  

  print("\nUsing Map:");
  print(dataMap.get(2));  

  print("\nUsing Set:");
  print(uniqueValues.has(3));  

  print("\nUsing Symbols:");
  const objWithSymbol = {
    [uniqueKey]: 'Symbol Key'
  };
  print(objWithSymbol[uniqueKey]);  
})();
