 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: "Sample Data" });
      } else {
        reject(new Error("Invalid URL"));
      }
    }, 1000);
  });
}

 
async function getData() {
  try {
    const response = await fetchData("https://api.example.com/data");
    print("Data fetched:", response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

 
const handler = {
  get: function(target, property) {
    print(`Property '${property}' was accessed`);
    return target[property];
  },
};

const targetObject = { a: 1, b: 2, c: 3 };
const proxyObject = new Proxy(targetObject, handler);

 
print(proxyObject.a);  
print(proxyObject.b);

 
getData();
