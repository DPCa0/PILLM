 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 1, name: "Advanced JS Features" }), 1000);
  });
};

 
async function getData() {
  try {
    const data = await fetchData();
    print("Data fetched:", data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

 
const handler = {
  get(target, property) {
    return property in target ? target[property] : `Property ${property} does not exist`;
  },
  set(target, property, value) {
    if (typeof value === "string") {
      target[property] = value.trim();
      return true;
    } else {
      console.error(`Invalid type for property ${property}`);
      return false;
    }
  },
};

 
const targetObject = { title: " JavaScript Proxies " };
const proxyObject = new Proxy(targetObject, handler);

 
print(proxyObject.title);  
print(proxyObject.nonExistent);  

proxyObject.title = " Updated Title ";
print(proxyObject.title);  

 
getData();
