 
const complexObject = {
  name: "Complex Object",
  nestedArray: [1, 2, { deep: "nested" }, 4],
  compute: (a, b) => a ** b,  
  async fetchData(url) {
     
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetching error:", error);
    }
  },
  *generateSequence(start, end) {
     
    for (let i = start; i <= end; i++) {
      yield i;
    }
  },
};

 
const { name, nestedArray, compute } = complexObject;
const [first, ...rest] = nestedArray;

 
const handler = {
  get(target, property) {
    print(`Property '${property}' has been accessed`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting value ${value} to property '${property}'`);
    target[property] = value;
    return true;
  },
};

const proxiedObject = new Proxy(complexObject, handler);

 
proxiedObject.name = "Updated Complex Object";
print(proxiedObject.name);

 
const sequence = complexObject.generateSequence(1, 5);
print([...sequence]);  

 
print(compute(2, 10));  

 
(async () => {
  const apiUrl = "https://jsonplaceholder.typicode.com/todos/1";
  const result = await proxiedObject.fetchData(apiUrl);
  print(result);
})();
