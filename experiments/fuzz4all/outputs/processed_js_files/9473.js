 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ success: true, data: { id: 1, name: "John Doe", age: 30 } });
      } else {
        reject(new Error("Invalid URL"));
      }
    }, 1000);
  });
}

 
async function processUserData(url) {
  try {
    const response = await fetchData(url);
    const { success, data } = response;
    
    if (success) {
      const { id, ...rest } = data;  
      print(`User ID: ${id}`, rest);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

 
const user = { name: "Alice", age: 25 };

const userProxy = new Proxy(user, {
  get(target, property) {
    print(`Getting property ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  },
});

 
userProxy.name = "Bob";
print(userProxy.age);

 
processUserData("https://api.example.com/data");
