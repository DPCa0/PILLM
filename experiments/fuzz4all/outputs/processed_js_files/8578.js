 

 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve({ data: "Fetched Data" }) : reject("Fetch Error");
    }, 1000);
  });
};

 
async function getData() {
  try {
    const result = await fetchData();
    print(result.data);
  } catch (error) {
    console.error(error);
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Property '${property}' accessed`);
    return target[property];
  }
};

 
const secretKey = Symbol('secret');
const user = {
  name: "Alice",
  [secretKey]: "mySecret"
};

 
const proxyUser = new Proxy(user, handler);

 
print(proxyUser.name);           
print(proxyUser[secretKey]);     

 
getData();
