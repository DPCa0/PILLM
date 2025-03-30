 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: "Sample Data" });
      } else {
        reject(new Error("404 Not Found"));
      }
    }, 1000);
  });
}

 
async function getData(url) {
  try {
    const response = await fetchData(url);
    print("Fetched Data:", response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

 
const targetObject = {
  foo: "bar",
  count: 42
};

const handler = {
  get: (target, prop, receiver) => {
    print(`Property ${prop} accessed`);
    return Reflect.get(target, prop, receiver);
  },
  set: (target, prop, value, receiver) => {
    print(`Property ${prop} set to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const proxyObject = new Proxy(targetObject, handler);

 
proxyObject.foo;  
proxyObject.count = 100;  
getData("https://api.example.com/data");  
getData("https://api.example.com/invalid");  
